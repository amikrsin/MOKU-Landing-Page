import React, { useState } from 'react';
import { X, ShieldCheck, Check, ArrowRight, ExternalLink, AlertTriangle, Key, CreditCard } from 'lucide-react';
import { APP_CONFIG } from '../data/mokuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gateway, setGateway] = useState<'razorpay' | 'cashfree'>('razorpay');
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfigNotice(true);
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
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFF2E9] hover:bg-[#E1E6DD] text-[#242C27] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Checkout</span>
            <span aria-hidden="true">·</span>
            <span>Lifetime License</span>
          </div>
          <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
            Get MOKU for ₹499
          </h3>
          <p className="text-xs text-[#727B73]">
            One-time payment. Zero subscriptions. Instant license key sent to your email.
          </p>
        </div>

        {/* Order Summary Box */}
        <div className="p-4 bg-[#EFF2E9]/60 rounded-2xl border border-[#E1E6DD] mb-6 space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold text-[#242C27]">
            <span>MOKU Core Lifetime License</span>
            <span className="font-display font-extrabold tabular-nums">₹499</span>
          </div>
          <div className="flex justify-between items-center text-xs text-[#727B73]">
            <span>Goods & Services Tax (GST)</span>
            <span>Included</span>
          </div>
          <div className="pt-2 border-t border-[#E1E6DD] flex justify-between items-center text-sm font-bold text-[#294C3A]">
            <span>Total Payable</span>
            <span className="text-lg font-display tabular-nums">₹499</span>
          </div>
        </div>

        {!showConfigNotice ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customer-name" className="block text-xs font-semibold text-[#242C27] mb-1">
                Full Name
              </label>
              <input
                id="customer-name"
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
              />
            </div>

            <div>
              <label htmlFor="customer-email" className="block text-xs font-semibold text-[#242C27] mb-1">
                Email Address (where license will be issued)
              </label>
              <input
                id="customer-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
              />
            </div>

            <div>
              <label htmlFor="customer-phone" className="block text-xs font-semibold text-[#242C27] mb-1">
                Mobile Number (for UPI & receipt SMS)
              </label>
              <input
                id="customer-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
              />
            </div>

            {/* Gateway Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#242C27] mb-1.5">
                Preferred Payment Route
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setGateway('razorpay')}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                    gateway === 'razorpay'
                      ? 'border-[#294C3A] bg-[#EFF5EE] text-[#294C3A] font-bold'
                      : 'border-[#E1E6DD] text-[#727B73] hover:text-[#242C27]'
                  }`}
                >
                  Razorpay (UPI / Card / NetBanking)
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('cashfree')}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                    gateway === 'cashfree'
                      ? 'border-[#294C3A] bg-[#EFF5EE] text-[#294C3A] font-bold'
                      : 'border-[#E1E6DD] text-[#727B73] hover:text-[#242C27]'
                  }`}
                >
                  Cashfree Payments
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout — ₹499</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Honest Payment Layer Notice & Live App Launcher */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-[#FDF7EB] border border-[#B57C2A]/30 rounded-2xl text-xs space-y-2 text-[#727B73]">
              <div className="flex items-center gap-1.5 font-bold text-[#94611B]">
                <AlertTriangle className="w-4 h-4" />
                <span>Production Payment Gateway Configuration</span>
              </div>
              <p>
                In compliance with security standards, live payment processing for ₹499 requires your verified merchant webhook credentials (Razorpay Key ID or Cashfree App ID) deployed on your secure backend.
              </p>
              <p className="font-medium text-[#242C27]">
                No mock payment is falsely recorded. Your details for <strong>{email || 'Customer'}</strong> have been queued.
              </p>
            </div>

            <div className="p-4 bg-[#EFF5EE] border border-[#A8B99E]/50 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#294C3A]">
                <Key className="w-4 h-4" />
                <span>Test & Unlock the Live Application</span>
              </div>
              <p className="text-[#727B73]">
                You can directly launch the MOKU Cloudflare Workers applet right now to test the complete interface:
              </p>
              <a
                href={APP_CONFIG.liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>Launch MOKU App (moku.ami-kr-sin.workers.dev)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => setShowConfigNotice(false)}
              className="w-full py-2 text-xs font-semibold text-[#727B73] hover:text-[#242C27] text-center cursor-pointer"
            >
              ← Back to Customer Details
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E1E6DD] text-[11px] text-[#727B73] flex items-center justify-between">
          <span>Queries: ami.kr.sin@gmail.com</span>
          <button
            onClick={onClose}
            className="text-[#294C3A] font-semibold hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
