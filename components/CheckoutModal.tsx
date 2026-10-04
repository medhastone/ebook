'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Download, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Tag,
  Languages,
  FileSpreadsheet,
  FolderGit2
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price?: number;
  onPurchaseSuccess?: () => void;
  onOpenReader?: () => void;
}

export function CheckoutModal({ 
  isOpen, 
  onClose, 
  price = 399,
  onPurchaseSuccess,
  onOpenReader,
}: CheckoutModalProps) {
  const REGULAR_PRICE = 399;
  const DISCOUNT_AMOUNT = 100;
  const [couponCode, setCouponCode] = useState<string>('MEDHASTONE');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(true);
  const [couponError, setCouponError] = useState<string>('');

  const finalAmount = isCouponApplied ? REGULAR_PRICE - DISCOUNT_AMOUNT : REGULAR_PRICE;

  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [customerEmail, setCustomerEmail] = useState<string>('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MEDHASTONE') {
      setIsCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Use MEDHASTONE for ₹100 off.');
    }
  };

  const handleToggleCoupon = () => {
    if (isCouponApplied) {
      setIsCouponApplied(false);
    } else {
      setCouponCode('MEDHASTONE');
      setIsCouponApplied(true);
      setCouponError('');
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('click_buy', {
      method: selectedMethod,
      price: finalAmount,
      coupon: isCouponApplied ? 'MEDHASTONE' : 'none',
      email: customerEmail || 'reader@medhastone.com',
      orderId: 'MS-' + Math.floor(100000 + Math.random() * 900000),
      status: 'simulated_success',
    });
    setIsSuccess(true);
    if (onPurchaseSuccess) {
      onPurchaseSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#14213D] text-white p-5 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8871E] flex items-center justify-center text-[#14213D] font-bold text-sm">
              M
            </div>
            <div>
              <h3 className="font-serif-title text-base sm:text-lg font-bold leading-tight">
                Secure Checkout • Medhastone
              </h3>
              <div className="text-[10px] text-teal-300 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3 text-teal-400" />
                <span>Salary Reset Money Kit • 256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <div className="p-5 sm:p-7 space-y-5">
            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14213D]">
                    Salary Reset Money Kit (Where Did My Salary Go?)
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    English 72p Ebook + Hindi Edition + 12 Tools + 500GB Bonus
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-stone-400 text-xs line-through">
                    ₹{REGULAR_PRICE}
                  </div>
                  <div className="font-serif-title font-bold text-lg text-[#14213D]">
                    ₹{finalAmount}
                  </div>
                </div>
              </div>

              {/* Coupon Toggle Box */}
              <div className="pt-2 border-t border-stone-200/80">
                {isCouponApplied ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                    <div className="flex items-center gap-1.5 text-teal-900">
                      <Tag className="w-3.5 h-3.5 text-teal-600" />
                      <span>Code <strong className="font-mono font-bold">MEDHASTONE</strong> applied</span>
                      <span className="font-bold text-emerald-700">(−₹100)</span>
                    </div>
                    <button
                      onClick={handleToggleCoupon}
                      type="button"
                      className="text-stone-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#E8871E]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#14213D] text-white text-xs font-bold hover:bg-[#0B132B] cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <div className="text-rose-600 text-[11px] mt-1">{couponError}</div>
                )}
              </div>

              {/* Pricing Math */}
              <div className="pt-2 border-t border-stone-200/70 space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Regular Price:</span>
                  <span className="font-mono">₹{REGULAR_PRICE}</span>
                </div>
                {isCouponApplied && (
                  <div className="flex justify-between text-teal-800 font-medium">
                    <span>Coupon Discount (MEDHASTONE):</span>
                    <span className="font-mono font-bold">− ₹{DISCOUNT_AMOUNT}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-bold text-sm pt-1 border-t border-stone-200">
                  <span>Final Payable:</span>
                  <span className="font-serif-title text-base text-[#E8871E]">₹{finalAmount}</span>
                </div>
              </div>
            </div>

            {/* Email for Delivery */}
            <div className="space-y-1.5">
              <label htmlFor="customer-email" className="block text-xs font-bold text-stone-700">
                Where should we send your download links &amp; tools?
              </label>
              <input
                id="customer-email"
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E8871E]"
              />
              <p className="text-[10px] text-stone-400">
                Instant delivery. We never spam or sell your contact info.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-stone-700">
                Select Indian Payment Method:
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedMethod === 'upi'
                      ? 'border-[#E8871E] bg-amber-50/50 text-[#14213D] font-bold shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#E8871E]" />
                  <span className="text-xs block">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#E8871E] bg-amber-50/50 text-[#14213D] font-bold shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#14213D]" />
                  <span className="text-xs block">Cards / RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#E8871E] bg-amber-50/50 text-[#14213D] font-bold shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                  <span className="text-xs block">NetBanking</span>
                </button>
              </div>

              {/* Dynamic Payment Method View */}
              {selectedMethod === 'upi' ? (
                <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Scan QR Code via any UPI App:</span>
                    <span className="text-[10px] text-teal-700 font-bold bg-teal-100 px-2 py-0.5 rounded-full">
                      Zero Processing Fees
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 py-1">
                    <div className="w-28 h-28 bg-white p-2 rounded-xl border border-stone-300 shadow-xs flex items-center justify-center relative">
                      {/* Stylized QR Code SVG Representation */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#14213D]">
                        <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                        <rect x="6" y="6" width="18" height="18" fill="white" rx="2" />
                        <rect x="10" y="10" width="10" height="10" fill="#E8871E" rx="1" />
                        <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                        <rect x="76" y="6" width="18" height="18" fill="white" rx="2" />
                        <rect x="80" y="10" width="10" height="10" fill="#E8871E" rx="1" />
                        <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                        <rect x="6" y="76" width="18" height="18" fill="white" rx="2" />
                        <rect x="10" y="80" width="10" height="10" fill="#E8871E" rx="1" />
                        <rect x="40" y="10" width="8" height="12" fill="currentColor" />
                        <rect x="48" y="22" width="10" height="8" fill="currentColor" />
                        <rect x="36" y="40" width="28" height="20" fill="currentColor" rx="2" />
                        <rect x="70" y="45" width="10" height="15" fill="currentColor" />
                        <rect x="42" y="75" width="16" height="12" fill="currentColor" />
                        <rect x="70" y="75" width="20" height="15" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="space-y-1.5 text-center sm:text-left text-xs">
                      <div className="font-mono text-stone-700 bg-white px-2 py-1 rounded border border-stone-200 inline-block font-semibold">
                        medhastone@upi
                      </div>
                      <div className="text-stone-500 text-[11px]">
                        Scan with GPay, PhonePe, Paytm, or BHIM. Amount pre-filled: <strong>₹{finalAmount}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Or enter UPI ID (e.g. mobile@upi)"
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#E8871E]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-3">
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (RuPay, Visa, MasterCard)"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        className="px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Complete Purchase Button */}
            <form onSubmit={handleSimulatePayment} className="space-y-3">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#E8871E] hover:bg-[#C97112] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Complete Payment of ₹{finalAmount}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <a
                  href={SUPERPROFILE_PAYMENT_URL}
                  onClick={() => {
                    trackEvent('click_buy', { source: 'checkout_modal_superprofile_direct', price: finalAmount, destination: SUPERPROFILE_PAYMENT_URL });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14213D] hover:text-[#E8871E] underline cursor-pointer"
                >
                  <span>Or Pay directly via Superprofile Checkout &rarr;</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Instant Digital Unlock • Support: medhastone@gmail.com</span>
              </div>
            </form>
          </div>
        ) : (
          /* Payment Success Fulfillment Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E7D5B] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                Payment Confirmed • ₹{finalAmount} Paid
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                Welcome to The Salary Reset!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans-body max-w-md mx-auto">
                Your purchase was successful. We have unlocked the complete 72-page field manual and all bonuses.
              </p>
            </div>

            {/* Instant Download Links */}
            <div className="space-y-2.5 text-left max-w-md mx-auto">
              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14213D]">
                    1. Where Did My Salary Go? (English PDF)
                  </div>
                  <div className="text-[10px] text-stone-500">72 Pages • Complete Field Manual &amp; Workbook</div>
                </div>
                <a
                  href="/Where_Did_My_Salary_Go.pdf"
                  download="Where_Did_My_Salary_Go.pdf"
                  className="px-3 py-1.5 rounded-lg bg-[#14213D] text-white text-xs font-bold hover:bg-[#0B132B] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14213D]">
                    2. Complete Hindi Edition (PDF)
                  </div>
                  <div className="text-[10px] text-stone-500">मेरा वेतन कहाँ चला गया?</div>
                </div>
                <a
                  href="/Where_Did_My_Salary_Go.pdf"
                  download="Where_Did_My_Salary_Go_Hindi.pdf"
                  className="px-3 py-1.5 rounded-lg bg-[#14213D] text-white text-xs font-bold hover:bg-[#0B132B] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Hindi PDF</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14213D]">
                    3. Salary Reset Kit (12 Editable Tools)
                  </div>
                  <div className="text-[10px] text-stone-500">Google Sheets, Excel &amp; Notion</div>
                </div>
                <button
                  onClick={() => alert('Opening Google Sheets & Notion Templates')}
                  className="px-3 py-1.5 rounded-lg bg-[#2E7D5B] text-white text-xs font-bold hover:bg-[#225C43] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Open Tools</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14213D]">
                    4. 500GB Creator Editor Bundle
                  </div>
                  <div className="text-[10px] text-stone-500">Video LUTs, SFX &amp; Motion Assets</div>
                </div>
                <button
                  onClick={() => alert('Opening 500GB Creator Editor Cloud Drive Links')}
                  className="px-3 py-1.5 rounded-lg bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>500GB Link</span>
                </button>
              </div>
            </div>

            {/* Launch In-App Reader */}
            {onOpenReader && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenReader();
                  }}
                  type="button"
                  className="w-full py-3.5 rounded-xl bg-[#E8871E] hover:bg-[#C97112] text-white font-bold text-sm shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full 72 Pages in Browser</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
