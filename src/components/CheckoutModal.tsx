import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Mail,
  Smartphone,
  CreditCard,
  Building2,
  Zap,
} from 'lucide-react';
import { APP_CONFIG } from '../data/mokuData';
import {
  loadRazorpayScript,
  createCheckoutOrder,
  verifyPaymentWithBackend,
  RazorpayPaymentSuccessResponse,
} from '../services/razorpay';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialState?: 'form' | 'successful' | 'pending' | 'failed';
}

type CheckoutStep = 'form' | 'initiating' | 'processing' | 'successful' | 'pending' | 'failed';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialState = 'form',
}) => {
  const [step, setStep] = useState<CheckoutStep>(initialState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<RazorpayPaymentSuccessResponse | null>(null);

  // Pre-load Razorpay checkout script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadRazorpayScript();
      if (initialState) setStep(initialState);
    } else {
      // Reset after closing with a slight delay
      setTimeout(() => {
        setStep('form');
        setErrorMessage('');
      }, 300);
    }
  }, [isOpen, initialState]);

  if (!isOpen) return null;

  const handleInitiateRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for licence delivery.');
      return;
    }

    setStep('initiating');

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || !window.Razorpay) {
        throw new Error('Razorpay Checkout failed to load. Please verify your internet connection.');
      }

      const orderData = await createCheckoutOrder({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // 49900 paise = ₹499
        currency: orderData.currency,
        name: APP_CONFIG.name,
        description: `${APP_CONFIG.productName} — 2 Devices Lifetime Access`,
        image: '/favicon.svg',
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim() || undefined,
        },
        notes: {
          product: APP_CONFIG.productName,
          customer_email: email.trim(),
          platform: 'MOKU Web Landing',
        },
        theme: {
          color: '#294C3A',
          backdrop_color: 'rgba(0, 0, 0, 0.75)',
        },
        modal: {
          ondismiss: () => {
            // User closed Razorpay modal without completing
            setStep('form');
          },
        },
        handler: async (response: RazorpayPaymentSuccessResponse) => {
          setPaymentDetails(response);
          setStep('processing');

          try {
            const verificationResult = await verifyPaymentWithBackend(response, {
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
            });

            if (verificationResult.verified) {
              setStep('successful');
            } else {
              setStep('pending');
            }
          } catch {
            // Webhook takes care of authoritative licence issuance
            setStep('successful');
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', (resp: any) => {
        console.error('Razorpay payment failed:', resp.error);
        setErrorMessage(
          resp.error?.description || 'Your payment could not be processed. Please try again with UPI or a different card.'
        );
        setStep('failed');
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Checkout initialization error:', err);
      setErrorMessage(
        err.message || 'Unable to connect to Razorpay Checkout. Please check your connection and try again.'
      );
      setStep('form');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="MOKU Checkout"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E1E6DD] shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFF2E9] hover:bg-[#E1E6DD] text-[#242C27] flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. INITIAL CUSTOMER DETAILS & ORDER FORM */}
        {(step === 'form' || step === 'initiating') && (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
                <ShieldCheck className="w-4 h-4" />
                <span>Razorpay Secure Checkout</span>
                <span aria-hidden="true">·</span>
                <span>Lifetime Licence</span>
              </div>
              <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                Get MOKU for ₹{APP_CONFIG.priceINR}
              </h3>
              <p className="text-xs text-[#727B73]">
                One-time payment. Lifetime access for up to {APP_CONFIG.deviceLimit} registered devices. No recurring subscription.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 bg-[#EFF2E9]/70 rounded-2xl border border-[#E1E6DD] space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-[#242C27]">
                <span>{APP_CONFIG.productName}</span>
                <span className="font-display font-extrabold tabular-nums">₹{APP_CONFIG.priceINR}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#727B73]">
                <span>Licence Scope</span>
                <span>Lifetime (2 Device Activations)</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#727B73]">
                <span>Goods & Services Tax (GST)</span>
                <span>Included</span>
              </div>
              <div className="pt-2 border-t border-[#E1E6DD] flex justify-between items-center text-sm font-bold text-[#294C3A]">
                <span>Total Payable</span>
                <span className="text-lg font-display tabular-nums">₹{APP_CONFIG.priceINR}</span>
              </div>
            </div>

            {/* Supported Payment Methods through Razorpay */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727B73] block">
                Supported Indian Payment Methods (Razorpay):
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8F8F3] border border-[#E1E6DD] text-[#242C27] font-medium">
                  <Zap className="w-3.5 h-3.5 text-[#476B57] shrink-0" />
                  <span>UPI / QR</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8F8F3] border border-[#E1E6DD] text-[#242C27] font-medium">
                  <CreditCard className="w-3.5 h-3.5 text-[#476B57] shrink-0" />
                  <span>Debit / Card</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8F8F3] border border-[#E1E6DD] text-[#242C27] font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#476B57] shrink-0" />
                  <span>Net Banking</span>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Customer Information Form */}
            <form onSubmit={handleInitiateRazorpay} className="space-y-3.5">
              <div>
                <label htmlFor="customer-name" className="block text-xs font-semibold text-[#242C27] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] placeholder:text-[#727B73]/60 focus:outline-hidden focus:border-[#294C3A]"
                />
              </div>

              <div>
                <label htmlFor="customer-email" className="block text-xs font-semibold text-[#242C27] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="customer-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] placeholder:text-[#727B73]/60 focus:outline-hidden focus:border-[#294C3A]"
                />
                <p className="text-[11px] text-[#727B73] mt-1">
                  Your licence key & one-click activation link are emailed here immediately.
                </p>
              </div>

              <div>
                <label htmlFor="customer-phone" className="block text-xs font-semibold text-[#242C27] mb-1">
                  Mobile Number (Optional, for Razorpay UPI auto-prompt)
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] placeholder:text-[#727B73]/60 focus:outline-hidden focus:border-[#294C3A]"
                />
              </div>

              <button
                type="submit"
                disabled={step === 'initiating'}
                className="w-full mt-4 py-4 text-base font-bold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {step === 'initiating' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Launching Razorpay Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Razorpay — ₹{APP_CONFIG.priceINR}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* 2. PAYMENT PROCESSING STATE */}
        {step === 'processing' && (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#EFF5EE] text-[#294C3A] mx-auto flex items-center justify-center border border-[#A8B99E]/50">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                Your payment is being verified.
              </h3>
              <p className="text-sm text-[#727B73] max-w-sm mx-auto">
                Please wait a moment while Razorpay and our Cloudflare Worker confirm your transaction signature.
              </p>
            </div>
            {paymentDetails?.razorpay_payment_id && (
              <p className="text-xs font-mono text-[#727B73] bg-[#F8F8F3] p-2 rounded-lg inline-block">
                Payment ID: {paymentDetails.razorpay_payment_id}
              </p>
            )}
          </div>
        )}

        {/* 3. PAYMENT SUCCESSFUL STATE */}
        {step === 'successful' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFF5EE] text-[#476B57] mx-auto flex items-center justify-center border-2 border-[#476B57]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#476B57]">
                  Payment Verified
                </span>
                <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                  Your MOKU lifetime licence is on its way.
                </h3>
                <p className="text-xs sm:text-sm text-[#727B73] max-w-sm mx-auto">
                  We have dispatched your cryptographically unique licence key and one-click activation link to:
                </p>
                <p className="font-semibold text-sm text-[#242C27] bg-[#EFF2E9] py-1.5 px-3 rounded-lg inline-block">
                  {email || 'your registered email'}
                </p>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="p-4 bg-[#F8F8F3] rounded-2xl border border-[#E1E6DD] text-xs text-[#727B73] space-y-2.5">
              <div className="flex items-start gap-2 text-[#242C27] font-semibold">
                <Mail className="w-4 h-4 text-[#476B57] shrink-0 mt-0.5" />
                <span>Next steps to unlock your app:</span>
              </div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Check your email inbox for your MOKU licence receipt.</li>
                <li>Tap the <strong>One-Click Activation Link</strong> inside the email, or copy the licence key.</li>
                <li>In MOKU, navigate to <strong>Space & Settings → Unlock Full App</strong> and paste your key.</li>
                <li>Your licence unlocks up to <strong>2 devices</strong> (phone & laptop).</li>
              </ol>
            </div>

            {/* Launch App Button */}
            <div className="space-y-3">
              <a
                href={APP_CONFIG.liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 text-base font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span>Open MOKU Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-[#727B73] hover:text-[#242C27] text-center cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}

        {/* 4. PAYMENT PENDING STATE */}
        {step === 'pending' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-300">
                <Clock className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Processing Queue
                </span>
                <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                  Your payment is received but confirmation is still pending.
                </h3>
                <p className="text-xs sm:text-sm text-[#727B73] max-w-sm mx-auto">
                  Your payment has been submitted successfully. We are confirming your order and will email your MOKU lifetime licence shortly.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8F8F3] rounded-2xl border border-[#E1E6DD] text-xs text-[#727B73] space-y-2">
              <p>
                Bank clearance or Razorpay webhook notifications may take 2–5 minutes during peak UPI traffic. No action is required on your part.
              </p>
              <p className="font-semibold text-[#242C27]">
                If your licence email does not arrive within 10 minutes, email us directly with your payment receipt:
              </p>
              <a
                href={`mailto:${APP_CONFIG.supportEmail}?subject=MOKU%20Payment%20Pending%20Inquiry`}
                className="text-[#294C3A] font-semibold underline block"
              >
                {APP_CONFIG.supportEmail}
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 text-xs font-semibold text-[#242C27] bg-[#EFF2E9] hover:bg-[#E1E6DD] rounded-xl text-center cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

        {/* 5. PAYMENT FAILED STATE */}
        {step === 'failed' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-700 mx-auto flex items-center justify-center border border-red-200">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Transaction Incomplete
                </span>
                <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                  Your payment could not be completed.
                </h3>
                <p className="text-xs sm:text-sm text-[#727B73] max-w-sm mx-auto">
                  {errorMessage || 'Your card or UPI bank declined the transaction or the session timed out.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8F8F3] rounded-2xl border border-[#E1E6DD] text-xs text-[#727B73] space-y-2">
              <p className="font-semibold text-[#242C27]">Recommended remedies:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Try choosing UPI QR / Google Pay / PhonePe inside Razorpay.</li>
                <li>Verify your daily bank transaction limit or active debit/credit card permissions.</li>
                <li>Contact support if your bank debited your account: <strong>{APP_CONFIG.supportEmail}</strong></li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setStep('form')}
                className="w-full py-3.5 text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again with Razorpay</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-[#727B73] hover:text-[#242C27] text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer / Contact */}
        <div className="mt-6 pt-4 border-t border-[#E1E6DD] text-[11px] text-[#727B73] flex items-center justify-between">
          <span>Support: {APP_CONFIG.supportEmail}</span>
          <span className="text-[#476B57] font-semibold">2-Device Lifetime Licence</span>
        </div>
      </div>
    </div>
  );
};
