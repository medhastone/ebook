'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Users, X, Sparkles } from 'lucide-react';

interface BuyerActivity {
  id: number;
  name: string;
  city: string;
  action: string;
  timeAgo: string;
}

const mockActivities: BuyerActivity[] = [
  { id: 1, name: 'Aarav Sharma', city: 'Bengaluru', action: 'unlocked the Salary Reset Money Kit with code MEDHASTONE', timeAgo: '2 mins ago' },
  { id: 2, name: 'Priyanka Nair', city: 'Kochi', action: 'audited ₹12,800/mo in silent UPI & food delivery leaks', timeAgo: '5 mins ago' },
  { id: 3, name: 'Kabir Mehta', city: 'Mumbai', action: 'downloaded the 12 Editable Google Sheets & Excel Dashboards', timeAgo: '8 mins ago' },
  { id: 4, name: 'Ananya Sen', city: 'Kolkata', action: 'unlocked the Hindi + English Bilingual Edition', timeAgo: '12 mins ago' },
  { id: 5, name: 'Vikramaditya Rao', city: 'Hyderabad', action: 'activated the 5-Bucket Salary Partitioning System', timeAgo: '15 mins ago' },
  { id: 6, name: 'Sneha Kulkarni', city: 'Pune', action: 'unlocked the 500GB Creator Editor Digital Bundle', timeAgo: '19 mins ago' },
  { id: 7, name: 'Devansh Joshi', city: 'Ahmedabad', action: 'started the 30-Day Salary Reset Challenge', timeAgo: '24 mins ago' },
  { id: 8, name: 'Meera Chawla', city: 'Gurgaon', action: 'applied coupon MEDHASTONE (saved ₹100)', timeAgo: '27 mins ago' },
  { id: 9, name: 'Tanmay Bhatia', city: 'Jaipur', action: 'calculated ₹6,400 monthly surplus using the ROI Simulator', timeAgo: '31 mins ago' },
  { id: 10, name: 'Rohan Verma', city: 'Chandigarh', action: 'reviewed Chapter 2: The 30-Minute Salary Autopsy', timeAgo: '35 mins ago' },
  { id: 11, name: 'Divya Sundaram', city: 'Chennai', action: 'locked emergency fund buffer in separate bank account', timeAgo: '39 mins ago' },
  { id: 12, name: 'Harshwardhan Singh', city: 'Lucknow', action: 'unlocked lifetime access pass for ₹299', timeAgo: '42 mins ago' },
  { id: 13, name: 'Aditi Patel', city: 'Surat', action: 'applied 48-Hour Cart Cool-Off rule to online shopping', timeAgo: '46 mins ago' },
  { id: 14, name: 'Nikhil Agarwal', city: 'Indore', action: 'downloaded 30 Money Decision Prompt Cards', timeAgo: '50 mins ago' },
  { id: 15, name: 'Kavya Deshmukh', city: 'Nagpur', action: 'activated Standing Orders for Salary Day transfers', timeAgo: '54 mins ago' },
  { id: 16, name: 'Arjun Iyer', city: 'Coimbatore', action: 'unlocked the Salary Raise Wealth Capture Playbook', timeAgo: '58 mins ago' },
];

export function LiveBuyerTicker() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [liveViewerCount, setLiveViewerCount] = useState<number>(44);

  // Subtle natural fluctuation in live readers counter
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setLiveViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(32, Math.min(64, prev + delta));
      });
    }, 10000);
    return () => clearInterval(viewerInterval);
  }, []);

  // Cycle notification toast every 30 seconds (30,000 ms) as requested
  useEffect(() => {
    if (isDismissed) return;

    // Initial popup delay of 2.5 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    // Exact 30-second interval between changes
    const interval = setInterval(() => {
      setIsVisible(false); // Smooth fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockActivities.length);
        setIsVisible(true); // Smooth fade in with new user
      }, 700);
    }, 30000); // 30 seconds loop

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = mockActivities[currentIndex];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-30 max-w-sm pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <div className="p-4 rounded-2xl bg-[#0B1528]/95 border border-amber-400/50 text-white shadow-2xl backdrop-blur-md flex items-start gap-3 relative overflow-hidden group">
          {/* Accent Glow */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-teal-400" />

          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            type="button"
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Verified Avatar Icon */}
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
          </div>

          {/* User Details & Action */}
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span className="text-amber-300 font-serif-title">{current.name}</span>
              <span className="text-slate-400 font-normal">from {current.city}</span>
            </div>

            <p className="text-xs text-slate-200 font-sans-body leading-snug">
              {current.action}
            </p>

            <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400 font-mono">
              <span className="text-teal-300 font-semibold">{current.timeAgo}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300 font-semibold">
                <Users className="w-2.5 h-2.5 text-teal-400" />
                {liveViewerCount} readers active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
