"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { submitInquiry, InquiryPayload } from "@/lib/api";
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Phone, Mail, Sparkles, Loader2 } from "lucide-react";

export default function InquirePage() {
  const [formData, setFormData] = useState<InquiryPayload>({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
    listingType: "GENERAL",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitInquiry(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit inquiry. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      <Navbar onOpenInquiry={() => {}} />

      <main className="flex-1 pt-32 pb-20 px-4 max-w-4xl mx-auto w-full relative">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Local Concierge Desk</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Plan Your <span className="text-emerald-700">Bhimtal Trip</span>
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Tell us about your travel dates, preferred homestays, or adventure activities. We will organize your itinerary with zero middleman markups.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 md:p-12 shadow-xl shadow-emerald-950/5">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="text-emerald-700 font-bold">{formData.userName}</span>. A confirmation notification has been dispatched to your email, and our local team will reach out promptly.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-sm transition shadow-md shadow-emerald-600/20"
                >
                  Return to Portal Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center space-x-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.userEmail}
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    value={formData.userPhone || ""}
                    onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Trip Category</label>
                  <select
                    value={formData.listingType || "GENERAL"}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  >
                    <option value="GENERAL">General Holiday / Family Tour</option>
                    <option value="TREK">Guided Treks (Hidimba / Sattal)</option>
                    <option value="ADVENTURE">Adventure (Paragliding / Kayaking)</option>
                    <option value="STAY">Homestay / Resort Booking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Trip Details & Requirements</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details like tentative dates, group size, preferences for lake view, meals, or paragliding slots..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting to Bhimtal Team...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Travel Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
