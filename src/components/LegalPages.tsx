import React, { useState } from 'react';
import { PageRoute } from '../types';
import { validateContactForm } from '../utils/kakeibo';
import { APP_CONFIG, KAKEIBO_PILLARS } from '../data/mokuData';
import { ArrowLeft, Shield, FileText, RefreshCw, Mail, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

interface LegalPagesProps {
  currentRoute: PageRoute;
  onNavigateHome: () => void;
  onOpenCheckout: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  currentRoute,
  onNavigateHome,
  onOpenCheckout,
}) => {
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });

    if (!result.isValid) {
      setFormErrors(result.errors);
      return;
    }

    setFormErrors({});
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#F8F8F3] min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] mb-8 px-3.5 py-2 rounded-xl bg-[#EFF2E9] border border-[#E1E6DD] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to MOKU Homepage</span>
        </button>

        {/* 1. Privacy Policy */}
        {currentRoute === 'privacy-policy' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
              <span aria-hidden="true">·</span>
              <span>Last Updated: October 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              MOKU Privacy Policy
            </h1>

            <div className="prose text-sm text-[#727B73] leading-relaxed space-y-4">
              <p>
                At MOKU (operating via <strong>{APP_CONFIG.domain}</strong> and <strong>{APP_CONFIG.liveAppUrl}</strong>), we treat your personal financial ledger as strictly sacred and confidential. This Privacy Policy outlines our transparent approach to data handling.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                1. Local-First Offline Storage Architecture
              </h2>
              <p>
                Unlike traditional fintech apps that harvest banking passwords, SMS inboxes, and financial account numbers, MOKU operates primarily on a <strong>local-first offline model</strong>. Your transaction entries, monthly plans, salary allocations, and category logs reside locally within your device browser storage (IndexedDB / LocalStorage).
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Purchase Information:</strong> When you purchase a lifetime licence for ₹499, our payment processor (Razorpay) collects necessary transaction details (such as your email address, phone number for receipts, and payment method) to issue your invoice and cryptographically signed licence key. MOKU never stores your credit card numbers or banking passwords.
                </li>
                <li>
                  <strong>Support Communication:</strong> If you contact us via email at <code>{APP_CONFIG.supportEmail}</code>, we retain your email and query history solely to provide assistance.
                </li>
                <li>
                  <strong>Financial Data:</strong> MOKU does <em>not</em> transmit, read, sell, or monetize your individual financial expenses or net-worth calculations.
                </li>
              </ul>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                3. Device PIN Security
              </h2>
              <p>
                MOKU includes a client-side PIN authentication barrier. When enabled, this feature prevents casual physical access to your ledger on your device. The PIN is hashed locally and is never sent to our servers.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                4. Data Export & User Control
              </h2>
              <p>
                You retain complete ownership of your ledger. You can export all your recorded transactions and monthly allocations in standardized format (CSV/JSON) or purge your local ledger at any moment through the Settings view.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                5. Contacting the Privacy Officer
              </h2>
              <p>
                For questions regarding this policy or data practices, contact us directly at:{' '}
                <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-[#294C3A] font-semibold underline">
                  {APP_CONFIG.supportEmail}
                </a>
              </p>
            </div>
          </article>
        )}

        {/* 2. Terms & Conditions */}
        {currentRoute === 'terms' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
              <span aria-hidden="true">·</span>
              <span>Commercial License</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              Terms and Conditions
            </h1>

            <div className="prose text-sm text-[#727B73] leading-relaxed space-y-4">
              <p>
                Welcome to MOKU. By purchasing, accessing, or using the MOKU software application or visiting <strong>{APP_CONFIG.domain}</strong>, you agree to be bound by the following terms.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                1. Lifetime License Grant & Scope
              </h2>
              <p>
                Upon payment of the ₹499 one-time fee, MOKU grants you a non-exclusive, non-transferable, revocable lifetime license to use the defined core features of the MOKU application for personal, non-commercial money management.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                2. No Recurring Subscription
              </h2>
              <p>
                The purchase price of ₹499 is a one-time fee. No recurring monthly or annual subscription fees will be charged for access to the licensed core software features. Future major cloud-hosted services, if separately developed, may be offered independently.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                3. Financial Advice Disclaimer
              </h2>
              <p>
                MOKU is a personal organization and budgeting utility inspired by Japanese Kakeibo. MOKU does <strong>not</strong> provide certified financial advisory, taxation, investment, legal, or accounting advice. You remain solely responsible for your financial decisions.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                4. Device Responsibility & Backups
              </h2>
              <p>
                Because MOKU respects user privacy by storing data locally on your device, you are responsible for maintaining backups of your records using the in-app export tools prior to clearing your browser cache or switching devices.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                5. Governing Jurisdiction
              </h2>
              <p>
                These terms are governed by the laws of India. For inquiries, contact:{' '}
                <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-[#294C3A] font-semibold underline">
                  {APP_CONFIG.supportEmail}
                </a>
              </p>
            </div>
          </article>
        )}

        {/* 3. Refund Policy */}
        {currentRoute === 'refund-policy' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <RefreshCw className="w-4 h-4" />
              <span>Customer Care</span>
              <span aria-hidden="true">·</span>
              <span>Refund Policy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              Refund & Cancellation Policy
            </h1>

            <div className="prose text-sm text-[#727B73] leading-relaxed space-y-4">
              <p>
                At MOKU, our goal is to deliver genuine peace of mind and intentional financial clarity. We want every customer to be completely satisfied with their one-time ₹499 purchase.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                1. 7-Day Fair Evaluation Period
              </h2>
              <p>
                If MOKU does not function on your supported device or if you experience technical issues that our support team cannot resolve within 7 calendar days of your purchase, you are eligible for a full refund of your ₹499 payment.
              </p>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                2. How to Request a Refund
              </h2>
              <p>
                To initiate a refund request, send an email to <strong>{APP_CONFIG.supportEmail}</strong> with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your purchase email address</li>
                <li>Your order ID or payment receipt from Razorpay</li>
                <li>A brief description of the issue encountered</li>
              </ul>

              <h2 className="text-lg font-display font-bold text-[#242C27] pt-2">
                3. Refund Processing
              </h2>
              <p>
                Approved refunds are processed back to your original payment source (UPI account, debit/credit card, or net banking) within 5–7 business days, in accordance with standard Indian banking clearance timelines.
              </p>
            </div>
          </article>
        )}

        {/* 4. Contact & Support */}
        {currentRoute === 'contact' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <Mail className="w-4 h-4" />
              <span>Direct Support</span>
              <span aria-hidden="true">·</span>
              <span>Founder Desk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              Contact MOKU Support
            </h1>

            <p className="text-sm text-[#727B73] leading-relaxed">
              Have questions about MOKU, the Kakeibo method, license restoration, or corporate bulk licensing? Reach out directly. We respond to every inquiry within 24–48 business hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Form */}
              <div>
                {submitted ? (
                  <div className="p-6 bg-[#EFF5EE] border border-[#A8B99E]/50 rounded-2xl space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#294C3A] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#294C3A]">
                      Message Received
                    </h3>
                    <p className="text-xs text-[#727B73]">
                      Thank you, <strong>{contactName}</strong>. Your inquiry has been dispatched to <code>{APP_CONFIG.supportEmail}</code>. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setContactMessage('');
                      }}
                      className="text-xs font-semibold text-[#294C3A] underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-semibold text-[#242C27] mb-1">
                        Your Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder="e.g. Rohan Verma"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block text-xs font-semibold text-[#242C27] mb-1">
                        Your Email
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="rohan@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message-input" className="block text-xs font-semibold text-[#242C27] mb-1">
                        Message / Question
                      </label>
                      <textarea
                        id="message-input"
                        rows={4}
                        placeholder="How can we assist you with MOKU?"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
                      />
                      {formErrors.message && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.message}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Info */}
              <div className="bg-[#EFF2E9]/60 rounded-2xl p-6 border border-[#E1E6DD] space-y-4 text-xs text-[#727B73]">
                <div>
                  <span className="font-bold text-[#242C27] block text-sm">Direct Founder Email:</span>
                  <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-[#294C3A] font-semibold text-sm underline">
                    {APP_CONFIG.supportEmail}
                  </a>
                </div>

                <div>
                  <span className="font-bold text-[#242C27] block text-sm">Operating Region:</span>
                  <p>Bangalore & Delhi NCR, India</p>
                </div>

                <div>
                  <span className="font-bold text-[#242C27] block text-sm">Application URL:</span>
                  <a
                    href={APP_CONFIG.liveAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#294C3A] underline block"
                  >
                    {APP_CONFIG.liveAppUrl}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#E1E6DD]">
                  <p>
                    <em>Note: We respect your time and do not send marketing spam or unsolicited promotional newsletters.</em>
                  </p>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* 5. Kakeibo Educational Guide */}
        {currentRoute === 'kakeibo' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <BookOpen className="w-4 h-4" />
              <span>Kakeibo Master Guide</span>
              <span aria-hidden="true">·</span>
              <span>Japanese Mindful Budgeting</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              The Japanese Philosophy of Kakeibo: How to Master Mindful Budgeting in India
            </h1>

            <div className="prose text-sm text-[#727B73] leading-relaxed space-y-4">
              <p>
                In 1904, <strong>Hani Motoko</strong>, recognized as Japan’s first female journalist, introduced a simple ledger system named <strong>Kakeibo</strong> (家計簿), which literally translates to "household finance ledger". Her goal was revolutionary for its era: empower individuals, especially homemakers and wage earners, to achieve financial independence through mindful awareness.
              </p>

              <h2 className="text-xl font-display font-bold text-[#242C27] pt-2">
                Why Automated Bank Scrapers Fail Us
              </h2>
              <p>
                Most modern personal finance apps connect to your bank accounts via automated scrapers. They generate colorful pie charts showing that you spent ₹28,000 on food delivery last month. But passive tracking creates guilt without habit change. By the time you see the chart, the money is already gone.
              </p>
              <p>
                Kakeibo succeeds because it reintroduces <em>intentionality</em>. You physically plan your month before it starts, and you mindfully log transactions as they happen.
              </p>

              <h2 className="text-xl font-display font-bold text-[#242C27] pt-2">
                The Four Pillars of Kakeibo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
                {KAKEIBO_PILLARS.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] space-y-1">
                    <span className="text-sm font-bold text-[#242C27] block">{p.title}</span>
                    <span className="text-xs text-[#476B57] font-semibold block">{p.role} (~{p.percentage})</span>
                    <p className="text-xs text-[#727B73] mt-1">{p.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-display font-bold text-[#242C27] pt-2">
                Adapting Kakeibo for the Indian Salary Earner
              </h2>
              <p>
                In India, salaried professionals face unique challenges: high urban rent, frequent UPI micro-transactions, instant grocery deliveries, and societal expectations (wedding shagun, festive spending, family responsibilities).
              </p>
              <p>
                MOKU customizes the Kakeibo method for India by incorporating:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Native INR (₹) formatting and Indian denomination chips (+₹50, +₹100, +₹500, +₹1k, +₹2k).</li>
                <li>Payment accounts adapted for Indian rails: UPI, Cards, Cash, and NetBanking.</li>
                <li>Joy tags (Essential, Joyful, or Could Skip) to identify instant UPI leaks.</li>
                <li>Dedicated Unexpected pillar for Indian household fluctuations.</li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#E1E6DD] flex items-center justify-between">
              <span className="text-xs text-[#727B73]">Ready to begin your mindful budgeting journey?</span>
              <button
                onClick={onOpenCheckout}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-colors cursor-pointer"
              >
                Get MOKU Lifetime Access — ₹499
              </button>
            </div>
          </article>
        )}

        {/* 6. Dedicated Payment Status Page (Section 7) */}
        {currentRoute === 'payment-status' && (
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <Shield className="w-4 h-4" />
              <span>Razorpay Order Status</span>
              <span aria-hidden="true">·</span>
              <span>Licence Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#242C27]">
              Payment Verification & Delivery
            </h1>

            <div className="p-6 bg-[#EFF2E9]/60 rounded-2xl border border-[#E1E6DD] space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#476B57] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#242C27]">
                    Automated Cloudflare Worker Delivery Active
                  </h3>
                  <p className="text-sm text-[#727B73] leading-relaxed">
                    All MOKU lifetime licences are issued server-side through cryptographically verified Razorpay webhook events (<code>payment.captured</code> and <code>order.paid</code>).
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E1E6DD] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#727B73]">
                <div>
                  <span className="font-semibold text-[#242C27] block">Authoritative Webhook:</span>
                  <code className="text-[11px] bg-white px-2 py-0.5 rounded border border-[#E1E6DD] mt-0.5 block break-all">
                    POST /api/webhook/razorpay
                  </code>
                </div>
                <div>
                  <span className="font-semibold text-[#242C27] block">Licence Activation Endpoint:</span>
                  <code className="text-[11px] bg-white px-2 py-0.5 rounded border border-[#E1E6DD] mt-0.5 block break-all">
                    POST /api/license/activate
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#727B73] leading-relaxed">
              <h2 className="text-base font-display font-bold text-[#242C27]">
                Payment Status Guidelines
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#476B57] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#242C27]">Payment Successful:</strong> Your cryptographically unique licence key and one-click activation link are delivered to your registered email address within 60 seconds.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#242C27]">Payment Pending:</strong> If webhook delivery is delayed due to high bank network traffic, your order is safely queued and your licence will be emailed immediately upon confirmation.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#242C27]">Payment Failed:</strong> If your card or UPI declined the charge, no licence is issued and no recurring deduction occurs. You can retry safely.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#E1E6DD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={APP_CONFIG.liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-colors text-center"
              >
                Open MOKU App (moku.ami-kr-sin.workers.dev)
              </a>
              <button
                onClick={onOpenCheckout}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#242C27] bg-[#EFF2E9] hover:bg-[#E1E6DD] rounded-xl transition-colors text-center cursor-pointer border border-[#E1E6DD]"
              >
                Purchase Licence — ₹499
              </button>
            </div>
          </article>
        )}

      </div>
    </div>
  );
};
