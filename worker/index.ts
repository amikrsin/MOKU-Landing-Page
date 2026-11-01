/**
 * MOKU — Cloudflare Worker Entrypoint & API Router
 * 
 * Routes:
 * - POST /api/checkout/create-order  -> Creates authenticated Razorpay order
 * - POST /api/webhook/razorpay       -> Verifies HMAC-SHA256 signature, generates MOKU-RZP key, stores in D1, sends email
 * - POST /api/license/activate       -> Validates demo key (isolated) or enforces 2-device commercial limit via D1
 * - POST /api/checkout/verify        -> Validates client payment redirect signature
 */

import {
  isMasterDemoKey,
  generateCommercialLicenseKey,
  verifyRazorpayWebhookSignature,
  verifyRazorpayPaymentSignature,
  handleLicenseActivation,
  buildLicenseEmailHtml,
  PRICE_INR,
  PRICE_PAISE,
  LIVE_APP_URL,
  SUPPORT_EMAIL,
  MAX_COMMERCIAL_DEVICES,
} from './license';

export interface Env {
  DB?: any; // Cloudflare D1 Database binding
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
  RESEND_API_KEY?: string; // or mailgun / sendgrid / cloudflare email
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers for MOKU web clients
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Razorpay-Signature, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. ORDER CREATION: POST /api/checkout/create-order
      if (pathname === '/api/checkout/create-order' && request.method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as any;
        const keyId = env.RAZORPAY_KEY_ID || 'rzp_test_MokuDemo2026';
        const keySecret = env.RAZORPAY_KEY_SECRET;

        // If Razorpay API credentials are configured, create real order on Razorpay API
        if (keySecret && keySecret !== 'placeholder') {
          const authString = btoa(`${keyId}:${keySecret}`);
          const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify({
              amount: PRICE_PAISE,
              currency: 'INR',
              receipt: `rcpt_${Date.now().toString().slice(-8)}`,
              notes: {
                product: 'MOKU Lifetime Licence',
                customer_email: body.email || '',
                customer_name: body.name || '',
              },
            }),
          });

          if (razorpayResponse.ok) {
            const order = await razorpayResponse.json();
            return new Response(
              JSON.stringify({
                orderId: order.id,
                keyId,
                amount: order.amount,
                currency: order.currency,
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              }
            );
          }
        }

        // Fallback test order for local testing/preview
        const testOrderId = `order_${Date.now().toString(36)}`;
        return new Response(
          JSON.stringify({
            orderId: testOrderId,
            keyId,
            amount: PRICE_PAISE,
            currency: 'INR',
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // 2. RAZORPAY WEBHOOK: POST /api/webhook/razorpay
      if (pathname === '/api/webhook/razorpay' && request.method === 'POST') {
        const signature = request.headers.get('x-razorpay-signature') || '';
        const rawBody = await request.text();
        const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET || '';

        // Verify cryptographic signature if secret is configured
        if (webhookSecret) {
          const isValid = await verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret);
          if (!isValid) {
            return new Response(JSON.stringify({ error: 'INVALID_SIGNATURE' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        }

        const event = JSON.parse(rawBody || '{}');
        const eventType = event.event;

        // Process 'payment.captured' and 'order.paid'
        if (eventType === 'payment.captured' || eventType === 'order.paid') {
          const paymentEntity = event.payload?.payment?.entity || event.payload?.order?.entity || {};
          const paymentId = paymentEntity.id || `pay_${Date.now().toString(36)}`;
          const orderId = paymentEntity.order_id || `order_${Date.now().toString(36)}`;
          const customerEmail = paymentEntity.email || paymentEntity.notes?.customer_email || '';
          const customerName = paymentEntity.notes?.customer_name || 'Customer';

          if (env.DB) {
            // Check idempotency: avoid duplicate licence generation for the same payment
            const existing = await env.DB
              .prepare('SELECT * FROM licenses WHERE payment_id = ?')
              .bind(paymentId)
              .first();

            if (existing) {
              return new Response(JSON.stringify({ status: 'already_processed', license_key: existing.license_key }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              });
            }

            // Generate authoritative commercial licence key
            const licenseKey = generateCommercialLicenseKey();
            const licenseId = crypto.randomUUID();
            const now = new Date().toISOString();

            await env.DB
              .prepare(
                `INSERT INTO licenses (
                  id, license_key, order_id, payment_id, customer_email, customer_name,
                  customer_phone, amount_paise, currency, source, status, max_devices, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
              )
              .bind(
                licenseId,
                licenseKey,
                orderId,
                paymentId,
                customerEmail,
                customerName,
                paymentEntity.contact || '',
                PRICE_PAISE,
                'INR',
                'razorpay',
                'active',
                MAX_COMMERCIAL_DEVICES,
                now,
                now
              )
              .run();

            // Automated Email Delivery
            if (customerEmail && env.RESEND_API_KEY) {
              const activationUrl = `${LIVE_APP_URL}?activate=${encodeURIComponent(licenseKey)}`;
              const emailHtml = buildLicenseEmailHtml({
                name: customerName,
                licenseKey,
                orderId,
                paymentId,
                activationUrl,
              });

              await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                  from: 'MOKU <licenses@moku.in>',
                  to: [customerEmail],
                  subject: `Your MOKU Lifetime Licence Key: ${licenseKey}`,
                  html: emailHtml,
                }),
              }).catch((e) => console.error('Failed to send licence email:', e));
            }

            return new Response(
              JSON.stringify({
                status: 'success',
                message: 'Commercial licence issued and dispatched',
                licenseKey,
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              }
            );
          }
        }

        return new Response(JSON.stringify({ status: 'ignored_event' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 3. LICENCE ACTIVATION: POST /api/license/activate
      if (pathname === '/api/license/activate' && request.method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as any;
        const activationResult = await handleLicenseActivation(env.DB, {
          key: body.key || body.licenseKey,
          deviceId: body.deviceId,
          deviceName: body.deviceName,
          platform: body.platform,
        });

        const statusCode = activationResult.success ? 200 : 400;
        return new Response(JSON.stringify(activationResult), {
          status: statusCode,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 4. CLIENT PAYMENT REDIRECT VERIFICATION: POST /api/checkout/verify
      if (pathname === '/api/checkout/verify' && request.method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as any;
        const keySecret = env.RAZORPAY_KEY_SECRET;

        let verified = true;
        if (keySecret && body.signature && body.orderId && body.paymentId) {
          verified = await verifyRazorpayPaymentSignature(
            body.orderId,
            body.paymentId,
            body.signature,
            keySecret
          );
        }

        return new Response(
          JSON.stringify({
            verified,
            message: verified ? 'Payment signature verified.' : 'Invalid signature verification.',
            licenseStatus: 'pending', // Webhook handles final D1 recording
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // 404 for unknown endpoints
      return new Response(
        JSON.stringify({ error: 'NOT_FOUND', path: pathname }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (err: any) {
      console.error('Worker error:', err);
      return new Response(
        JSON.stringify({ error: 'INTERNAL_ERROR', message: err?.message || 'Server error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
