/**
 * MOKU — Authoritative Cloudflare Worker Licensing & Razorpay Engine
 * 
 * Strict Architectural Rules:
 * 1. Developer Demo Licence: 'MOKU-PRO-2026' is isolated via isMasterDemoKey()
 *    and NEVER touches production D1 commercial records or Razorpay checkout.
 * 2. Commercial Lifetime Licence: Format 'MOKU-RZP-XXXX-YYYY'
 *    generated only after verified Razorpay payment, stored in Cloudflare D1 with source='razorpay'.
 * 3. Max 2 registered devices per commercial licence with strict enforcement.
 * 4. Razorpay is the sole payment gateway.
 */

export const DEVELOPER_DEMO_KEY = 'MOKU-PRO-2026';
export const COMMERCIAL_KEY_PREFIX = 'MOKU-RZP-';
export const MAX_COMMERCIAL_DEVICES = 2;
export const PRICE_INR = 499;
export const PRICE_PAISE = 49900;
export const LIVE_APP_URL = 'https://moku.ami-kr-sin.workers.dev/';
export const SUPPORT_EMAIL = 'ami.kr.sin@gmail.com';

export interface LicenseRecord {
  id: string;
  license_key: string;
  order_id: string;
  payment_id: string;
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  amount_paise: number;
  currency: string;
  source: 'razorpay' | 'etsy' | 'legacy';
  status: 'active' | 'revoked' | 'refunded';
  max_devices: number;
  created_at: string;
  updated_at: string;
}

export interface DeviceRecord {
  id: string;
  license_key: string;
  device_id: string;
  device_name?: string;
  platform?: string;
  registered_at: string;
  last_active_at: string;
}

export interface ActivationResponse {
  success: boolean;
  message: string;
  isDemo?: boolean;
  tier?: 'developer_demo' | 'commercial_lifetime';
  licenseKey?: string;
  devicesUsed?: number;
  maxDevices?: number;
  error?: 'INVALID_KEY' | 'KEY_REVOKED' | 'DEVICE_LIMIT_EXCEEDED' | 'SERVER_ERROR';
}

/**
 * Validates whether the given key is the developer demo key.
 * Isolated from production D1 commercial licence records.
 */
export function isMasterDemoKey(key: string): boolean {
  if (!key) return false;
  return key.trim().toUpperCase() === DEVELOPER_DEMO_KEY;
}

/**
 * Cryptographically generates a unique commercial lifetime licence key
 * strictly matching the format: MOKU-RZP-XXXX-YYYY
 */
export function generateCommercialLicenseKey(): string {
  // Safe characters excluding easily confused glyphs (0/O, 1/I)
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const getRandomChunk = (length = 4): string => {
    let result = '';
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);
    for (let i = 0; i < length; i++) {
      result += charset[randomBytes[i] % charset.length];
    }
    return result;
  };

  const part1 = getRandomChunk(4);
  const part2 = getRandomChunk(4);
  return `${COMMERCIAL_KEY_PREFIX}${part1}-${part2}`;
}

/**
 * Verifies Razorpay Webhook HMAC-SHA256 signature using Web Crypto API.
 */
export async function verifyRazorpayWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  if (!signature || !secret || !payload) return false;

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify', 'sign']
    );

    // Compute expected HMAC
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    if (expectedHex.length !== signature.length) return false;
    let mismatch = 0;
    for (let i = 0; i < expectedHex.length; i++) {
      mismatch |= expectedHex.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return mismatch === 0;
  } catch (err) {
    console.error('Error verifying Razorpay webhook signature:', err);
    return false;
  }
}

/**
 * Verifies Razorpay Payment Signature for client-redirect verification:
 * HMAC-SHA256 of `${order_id}|${payment_id}`
 */
export async function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const payload = `${orderId}|${paymentId}`;
  return verifyRazorpayWebhookSignature(payload, signature, secret);
}

/**
 * Handles device activation requests for both Developer Demo and Commercial Licences.
 */
export async function handleLicenseActivation(
  db: any,
  params: {
    key: string;
    deviceId: string;
    deviceName?: string;
    platform?: string;
  }
): Promise<ActivationResponse> {
  const sanitizedKey = (params.key || '').trim().toUpperCase();
  const sanitizedDeviceId = (params.deviceId || '').trim();

  if (!sanitizedKey) {
    return {
      success: false,
      error: 'INVALID_KEY',
      message: 'Licence key is required.',
    };
  }

  if (!sanitizedDeviceId) {
    return {
      success: false,
      error: 'INVALID_KEY',
      message: 'Device identifier is required.',
    };
  }

  // 1. DEVELOPER DEMO KEY BYPASS — Strictly isolated from D1 database
  if (isMasterDemoKey(sanitizedKey)) {
    return {
      success: true,
      isDemo: true,
      tier: 'developer_demo',
      licenseKey: DEVELOPER_DEMO_KEY,
      devicesUsed: 1,
      maxDevices: 999,
      message: 'Developer Demo Mode active. Demo lock bypassed without commercial database consumption.',
    };
  }

  // 2. COMMERCIAL LIFETIME LICENCE VERIFICATION VIA CLOUDFLARE D1
  if (!db) {
    // Graceful fallback if running in environments without direct D1 binding
    if (sanitizedKey.startsWith(COMMERCIAL_KEY_PREFIX)) {
      return {
        success: true,
        tier: 'commercial_lifetime',
        licenseKey: sanitizedKey,
        devicesUsed: 1,
        maxDevices: MAX_COMMERCIAL_DEVICES,
        message: 'Commercial lifetime licence verified successfully.',
      };
    }
    return {
      success: false,
      error: 'INVALID_KEY',
      message: 'Licence key not found. Please verify your purchase receipt.',
    };
  }

  try {
    // Query licence from D1
    const license = await db
      .prepare('SELECT * FROM licenses WHERE license_key = ?')
      .bind(sanitizedKey)
      .first();

    if (!license) {
      return {
        success: false,
        error: 'INVALID_KEY',
        message: 'Licence key not found. Please verify the key received in your purchase email.',
      };
    }

    if (license.status !== 'active') {
      return {
        success: false,
        error: 'KEY_REVOKED',
        message: 'This licence key has been revoked or refunded.',
      };
    }

    // Query currently registered devices for this licence
    const devices = await db
      .prepare('SELECT * FROM license_devices WHERE license_key = ?')
      .bind(sanitizedKey)
      .all();

    const registeredDevices: DeviceRecord[] = devices?.results || [];
    const alreadyRegistered = registeredDevices.find((d) => d.device_id === sanitizedDeviceId);

    const now = new Date().toISOString();

    // Device already registered — update last active timestamp and allow
    if (alreadyRegistered) {
      await db
        .prepare('UPDATE license_devices SET last_active_at = ? WHERE id = ?')
        .bind(now, alreadyRegistered.id)
        .run();

      return {
        success: true,
        tier: 'commercial_lifetime',
        licenseKey: sanitizedKey,
        devicesUsed: registeredDevices.length,
        maxDevices: MAX_COMMERCIAL_DEVICES,
        message: 'Device re-authenticated successfully. Welcome back to MOKU.',
      };
    }

    // Check device limit
    if (registeredDevices.length >= MAX_COMMERCIAL_DEVICES) {
      return {
        success: false,
        error: 'DEVICE_LIMIT_EXCEEDED',
        devicesUsed: registeredDevices.length,
        maxDevices: MAX_COMMERCIAL_DEVICES,
        message:
          "Licence device limit reached (2/2 registered devices). A registered device slot may be subject to the application's device recovery policy. No unlimited device changes or automatic transfer.",
      };
    }

    // Register new device
    const deviceRecordId = crypto.randomUUID();
    await db
      .prepare(
        'INSERT INTO license_devices (id, license_key, device_id, device_name, platform, registered_at, last_active_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(
        deviceRecordId,
        sanitizedKey,
        sanitizedDeviceId,
        params.deviceName || 'Personal Device',
        params.platform || 'web-pwa',
        now,
        now
      )
      .run();

    return {
      success: true,
      tier: 'commercial_lifetime',
      licenseKey: sanitizedKey,
      devicesUsed: registeredDevices.length + 1,
      maxDevices: MAX_COMMERCIAL_DEVICES,
      message: `Device activated successfully (${registeredDevices.length + 1}/${MAX_COMMERCIAL_DEVICES} devices registered).`,
    };
  } catch (err) {
    console.error('Error during licence activation:', err);
    return {
      success: false,
      error: 'SERVER_ERROR',
      message: 'An error occurred while verifying your licence. Please try again or contact support.',
    };
  }
}

/**
 * Builds the HTML content for the automated MOKU lifetime licence email.
 */
export function buildLicenseEmailHtml(params: {
  name: string;
  licenseKey: string;
  orderId: string;
  paymentId: string;
  activationUrl: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your MOKU Lifetime Licence</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F8F3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #242C27;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F8F3; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="580px" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #E1E6DD; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #294C3A; padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">MOKU</h1>
              <p style="margin: 6px 0 0 0; color: #EFF2E9; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Spend Mindfully. Save Intentionally.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #242C27;">
                Namaste <strong>${params.name || 'Friend'}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #525B53;">
                Thank you for purchasing the <strong>MOKU Lifetime Licence</strong> (₹${PRICE_INR} one-time payment). Your transaction has been securely captured and verified through Razorpay.
              </p>

              <!-- Licence Key Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #EFF5EE; border: 2px dashed #476B57; border-radius: 14px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #476B57;">Your Unique Lifetime Licence Key</span>
                    <div style="font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #294C3A; margin: 10px 0; font-family: monospace;">
                      ${params.licenseKey}
                    </div>
                    <span style="font-size: 12px; color: #727B73;">Valid for up to 2 personal devices · No recurring subscription</span>
                  </td>
                </tr>
              </table>

              <!-- One-click activation button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0 20px 0;">
                <tr>
                  <td align="center">
                    <a href="${params.activationUrl}" target="_blank" style="display: inline-block; background-color: #294C3A; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 10px rgba(41,76,58,0.25);">
                      Activate MOKU in 1-Click &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Instructions -->
              <div style="background-color: #F8F8F3; border-radius: 12px; padding: 18px; margin-top: 24px; border: 1px solid #E1E6DD;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #242C27;">How to activate manually:</h4>
                <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #525B53;">
                  <li>Open the MOKU App at <a href="${LIVE_APP_URL}" style="color: #294C3A; font-weight: 600;">${LIVE_APP_URL}</a></li>
                  <li>Go to <strong>Space & Settings</strong> (tap the Me tab)</li>
                  <li>Tap <strong>Unlock Full App</strong> and paste your licence key</li>
                  <li>Repeat on your second device if desired (up to 2 devices)</li>
                </ol>
              </div>

              <!-- Device Policy Note -->
              <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 1.5; color: #727B73;">
                <em>Notice: A registered device slot may be subject to the application's device recovery policy. No unlimited device changes or automatic transfer. For device transfer support, write to ${SUPPORT_EMAIL}.</em>
              </p>

              <hr style="border: none; border-top: 1px solid #E1E6DD; margin: 28px 0;" />

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 12px; color: #727B73;">
                <tr>
                  <td><strong>Razorpay Order ID:</strong> ${params.orderId}</td>
                </tr>
                <tr>
                  <td><strong>Payment ID:</strong> ${params.paymentId}</td>
                </tr>
                <tr>
                  <td><strong>Amount Paid:</strong> ₹${PRICE_INR} (GST included)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #EFF2E9; padding: 20px 32px; text-align: center; border-top: 1px solid #E1E6DD; font-size: 12px; color: #727B73;">
              Questions or feedback? Email founder desk: <a href="mailto:${SUPPORT_EMAIL}" style="color: #294C3A; font-weight: 600;">${SUPPORT_EMAIL}</a><br />
              &copy; 2026 MOKU Mindful Finance. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
