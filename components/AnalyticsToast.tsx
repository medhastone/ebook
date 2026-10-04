'use client';

import React, { useState, useEffect } from 'react';
import { subscribeAnalytics, AnalyticsPayload } from '@/lib/analytics';
import { Activity, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export function AnalyticsToast() {
  const [events, setEvents] = useState<AnalyticsPayload[]>([]);
  const [latestEvent, setLatestEvent] = useState<AnalyticsPayload | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeAnalytics((payload) => {
      setEvents((prev) => [payload, ...prev.slice(0, 9)]);
      setLatestEvent(payload);
      setShowToast(true);

      const t = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(t);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 text-xs font-mono hidden md:block">
      {/* Toast Notification on new event */}
      {showToast && latestEvent && !isOpen && (
        <div className="mb-2 p-2.5 px-3 rounded-xl bg-[#14213D] text-white shadow-xl border border-white/20 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E8871E] animate-ping" />
          <span className="text-[11px] text-amber-300 font-bold">dataLayer:</span>
          <span className="text-[11px] text-white font-medium">{latestEvent.event}</span>
        </div>
      )}

      {/* Mini Debug Indicator Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white/70 hover:text-white backdrop-blur-sm border border-white/10 flex items-center gap-1.5 shadow-md cursor-pointer text-[10px]"
        title="View Analytics Event Feed"
      >
        <Activity className="w-3 h-3 text-[#E8871E]" />
        <span>Analytics Events ({events.length})</span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>

      {/* Detailed Log Drawer */}
      {isOpen && (
        <div className="mt-2 w-80 p-3 rounded-2xl bg-[#0F172A] text-white/90 border border-white/15 shadow-2xl space-y-2 max-h-60 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] text-white/60">
            <span>Live dataLayer Event Stream</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {events.length === 0 ? (
            <div className="text-[11px] text-white/40 py-2">
              No events fired yet. Scroll or interact with calculators to see events.
            </div>
          ) : (
            <div className="space-y-1.5">
              {events.map((evt, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/5 text-[10px] border border-white/5 space-y-0.5">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>{evt.event}</span>
                    <span className="text-[9px] text-white/40">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  {evt.data && Object.keys(evt.data).length > 0 && (
                    <div className="text-white/60 truncate font-mono text-[9px]">
                      {JSON.stringify(evt.data)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
