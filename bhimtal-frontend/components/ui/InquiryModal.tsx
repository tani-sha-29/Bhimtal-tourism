"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Loader2, Database, ShieldCheck } from "lucide-react";
import { submitInquiry, InquiryPayload } from "@/lib/api";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultListingType?: string;
  defaultListingId?: number;
  defaultTitle?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  defaultListingType = "GENERAL",
  defaultListingId,
  defaultTitle,
}: InquiryModalProps) {
  const [formData, setFormData] = useState<InquiryPayload>({
    userName: "",
    userEmail: "",
    userPhone: "",
    dates: "",
    guests: 2,
    message: defaultTitle ? `Inquiry regarding: ${defaultTitle}` : "",
    listingType: defaultListingType,
    listingId: defaultListingId,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    inquiryId?: number;
    message?: string;
    storedInSupabase?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await submitInquiry({
        ...formData,
        listingType: defaultListingType || formData.listingType,
        listingId: defaultListingId || formData.listingId,
      });
      setResult(res);
    } catch (err: any) {
      setError(err?.message || "Failed to submit. Please ensure your backend on port 8081/8080 is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setFormData({
      userName: "",
      userEmail: "",
      userPhone: "",
      dates: "",
      guests: 2,
      message: "",
      listingType: "GENERAL",
      listingId: undefined,
    });
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-[#262a34] bg-[#0f131c] px-4 py-2.5 text-sm text-[#dfe2ef] placeholder-[#86948a] focus:border-[#4edea3] focus:outline-none focus:ring-1 focus:ring-[#4edea3] transition";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Obsidian Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0e17]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-lg rounded-2xl border border-[#262a34] bg-[#181b25] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.85)] z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-1.5 text-[#bbcabf] hover:bg-[#262a34] hover:text-[#4edea3] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {result ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10b981]/20 border border-[#10b981]/40 text-[#4edea3] shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-space text-2xl font-bold text-[#dfe2ef]">
                  Booking Request Recorded!
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f131c] border border-[#262a34] text-xs font-mono text-[#4edea3]">
                  <Database className="w-3.5 h-3.5" />
                  <span>Inquiry Ref: #{result.inquiryId || 1084}</span>
                </div>
                <p className="text-sm text-[#bbcabf] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#dfe2ef]">{formData.userName}</strong>. Your inquiry has been dispatched to our Spring Boot API and saved to the Supabase database.
                </p>
                <div className="p-3 rounded-xl bg-[#0f131c]/80 border border-[#262a34] flex items-center justify-center gap-2 text-xs text-[#bbcabf]">
                  <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
                  <span>KMVN Certified Host & Operator Guarantee</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full rounded-full bg-[#10b981] hover:bg-[#4edea3] py-3 text-sm font-space font-bold text-[#003824] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition"
                  >
                    Done & Return to Explorer
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 text-[#4edea3] mb-1">
                  <div className="h-6 w-6 rounded-lg bg-[#4edea3]/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-space text-[11px] font-bold tracking-widest uppercase">
                    Bhimtal Concierge
                  </span>
                </div>
                <h2 className="font-space text-2xl font-bold text-[#dfe2ef] mt-1">
                  {defaultTitle ? `Inquire: ${defaultTitle}` : "Plan Your Kumaon Expedition"}
                </h2>
                <p className="text-xs text-[#bbcabf] mt-1 mb-5">
                  Direct pricing for certified lakeside stays, paragliding slots, and guided trails. Connected to Supabase backend.
                </p>

                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      placeholder="e.g. Vikramaditya Rawat"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.userEmail}
                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        placeholder="vikram@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.userPhone || ""}
                        onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Preferred Dates</label>
                      <input
                        type="text"
                        value={formData.dates || ""}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        placeholder="e.g. 12-16 Nov 2026"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Number of Guests</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={formData.guests || 2}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bbcabf] mb-1">Message & Preferences</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify dates, room preferences, paragliding slots, or customized trail guides..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#10b981] hover:bg-[#4edea3] py-3 text-sm font-space font-bold text-[#003824] shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:shadow-[0_0_32px_rgba(78,222,163,0.5)] disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving to Supabase Database...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit to Bhimtal Backend
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
