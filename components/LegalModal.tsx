'use client';

import React from 'react';
import { X, Shield, FileText, RefreshCw, Mail } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'refund' | 'contact' | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      updated: 'October 2026',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-body">
          <p>
            At <strong>Where Did My Salary Go?</strong> (salaryreset.in / Medhastone), we respect your digital privacy. This policy outlines how we handle the information you provide when using our calculators, downloading free resources, or purchasing the ebook.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">1. Data Collected in Calculators</h4>
          <p>
            All calculations performed in the Leak Score Calculator, EMI Burden Slider, and 5-Bucket Splitter run entirely client-side in your web browser. We do not store your exact rupee inputs on remote database servers unless you explicitly submit your email or WhatsApp number to request the audit spreadsheet.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">2. Contact Information</h4>
          <p>
            If you provide your email address or WhatsApp number, we use it strictly to deliver your digital purchases, free spreadsheet templates, and occasional educational newsletters. We never sell, rent, or trade your data to third-party financial institutions, banks, or telemarketers.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">3. Payment Processing</h4>
          <p>
            Payments are processed securely via PCI-DSS compliant Indian payment gateways (such as Superprofile / Razorpay / Cashfree). We never store or handle your credit card numbers, CVVs, or UPI PINs on our servers.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">4. Contact &amp; Inquiries</h4>
          <p>
            For any privacy inquiries or to request data removal, reach out directly to our official team at <a href="mailto:medhastone@gmail.com" className="font-bold text-[#14213D] underline">medhastone@gmail.com</a>.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      updated: 'October 2026',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-body">
          <p>
            By purchasing, accessing, or downloading &quot;Where Did My Salary Go?&quot; or using our interactive tools, you agree to the following terms:
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">1. Non-Advisory Nature (Educational Only)</h4>
          <p>
            The content provided in this ebook, spreadsheets, checklists, and calculators is created exclusively for informational, educational, and self-organization purposes. Neither the author nor the publisher is a SEBI-registered Investment Advisor (RIA), Research Analyst (RA), or Chartered Accountant.
          </p>
          <p>
            Nothing in this material constitutes personal investment, tax, legal, or insurance advice. Financial decisions must be made in consultation with a qualified professional.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">2. Intellectual Property &amp; License</h4>
          <p>
            All text, illustrations, frameworks (including Salary Half-Life, Raise Capture Rate, and the 5-Bucket Blueprint), and spreadsheet models are the exclusive intellectual property of Medhastone. Your purchase grants you a single-user personal license. Redistribution, reselling, or public file-sharing is strictly prohibited.
          </p>
          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">3. Limitation of Liability</h4>
          <p>
            All financial figures and case studies are illustrative. Individual financial results will vary based on income level, discipline, and macroeconomic conditions.
          </p>
          <p>
            For support inquiries regarding terms or licensing, contact <a href="mailto:medhastone@gmail.com" className="font-bold text-[#14213D] underline">medhastone@gmail.com</a>.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Refund Policy (Digital Products)',
      icon: RefreshCw,
      updated: 'October 2026',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-body">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm leading-relaxed">
            <strong className="block text-[#14213D] font-bold mb-1 text-sm sm:text-base">
              No Refund Policy for Digital Products
            </strong>
            Because &quot;Where Did My Salary Go?&quot; and the Salary Reset Money Kit are instantly downloadable digital goods (including PDF books, Hindi editions, editable Excel/Google Sheets spreadsheets, Notion systems, and 500GB creator assets), <strong>all sales are final and non-refundable once payment is completed</strong>.
          </div>

          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">Why We Do Not Offer Refunds</h4>
          <p>
            Unlike physical goods that can be returned in original condition, digital products and downloadable templates are delivered immediately upon checkout and cannot be revoked or returned. Once you complete your purchase, you receive immediate, lifetime access to all files, guides, and tools.
          </p>

          <h4 className="font-bold text-[#14213D] text-sm sm:text-base">Dedicated Customer &amp; Technical Support</h4>
          <p>
            While purchases are non-refundable, our team is committed to ensuring you receive everything you purchased. If you encounter any of the following:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-800">
            <li>Trouble downloading the PDF, EPUB, or spreadsheet files</li>
            <li>File access or extraction issues with the bonus 500GB creator assets</li>
            <li>Notion template duplication assistance</li>
            <li>Payment confirmation or invoice receipt questions</li>
          </ul>

          <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 space-y-1.5 mt-2">
            <span className="text-xs uppercase font-bold text-stone-600 block">Official Support Contact:</span>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E8871E]" />
              <a href="mailto:medhastone@gmail.com" className="text-sm sm:text-base font-bold text-[#14213D] hover:text-[#E8871E] underline">
                medhastone@gmail.com
              </a>
            </div>
            <p className="text-xs text-stone-600 pt-1">
              Please include your order ID and the email address used at checkout. We respond within 4–12 business hours.
            </p>
          </div>
        </div>
      ),
    },
    contact: {
      title: 'Contact & Support',
      icon: Mail,
      updated: 'Support Hours: 9 AM - 7 PM IST',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-body">
          <p>
            Have a question about your order, need assistance downloading your digital kit, or want to share your Salary Reset feedback? We are here to assist you!
          </p>
          <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 space-y-3">
            <div>
              <span className="text-xs uppercase font-bold text-stone-500 block">Official Support &amp; Customer Inquiries:</span>
              <a href="mailto:medhastone@gmail.com" className="text-base sm:text-lg font-bold text-[#14213D] hover:text-[#E8871E] underline block mt-0.5">
                medhastone@gmail.com
              </a>
            </div>
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs uppercase font-bold text-stone-500 block">Brand &amp; Publisher:</span>
              <span className="text-sm font-bold text-[#14213D]">Medhastone Digital Publications</span>
            </div>
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs uppercase font-bold text-stone-500 block">Response Time:</span>
              <span className="text-xs sm:text-sm text-stone-700">Usually within 4–12 business hours (Monday to Saturday)</span>
            </div>
          </div>
        </div>
      ),
    },
  };

  const doc = contentMap[type];
  const Icon = doc.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14213D] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E8871E]">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-title text-base sm:text-lg font-bold">
                {doc.title}
              </h3>
              <div className="text-[10px] text-white/60">
                {doc.updated}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {doc.body}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg bg-[#14213D] text-white text-xs font-semibold hover:bg-[#0B132B] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
