"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { PlacesSection } from "@/components/PlacesSection";
import { StaysSection } from "@/components/StaysSection";
import { AdventuresSection } from "@/components/AdventuresSection";
import { InquiryModal } from "@/components/ui/InquiryModal";
import {
  getPlaces, getStays, getAdventures,
  Place, Stay, Adventure,
  FALLBACK_PLACES, FALLBACK_STAYS, FALLBACK_ADVENTURES,
} from "@/lib/api";
import {
  Sparkles, MapPin, ArrowRight, Waves, ShieldCheck,
  Mountain, Wind, TreePine,
} from "lucide-react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const CATEGORY_PILLS = [
  { label: "Lakes", icon: Waves, color: "emerald" },
  { label: "Treks & Hiking", icon: Mountain, color: "amber" },
  { label: "Local Stays", icon: TreePine, color: "emerald" },
  { label: "Adventure Sports", icon: Wind, color: "amber" },
];

export default function HomePage() {
  const [places, setPlaces] = useState<Place[]>(FALLBACK_PLACES);
  const [stays, setStays] = useState<Stay[]>(FALLBACK_STAYS);
  const [adventures, setAdventures] = useState<Adventure[]>(FALLBACK_ADVENTURES);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | undefined>();
  const [selectedListingType, setSelectedListingType] = useState<string>("GENERAL");
  const [selectedListingId, setSelectedListingId] = useState<number | undefined>();

  useEffect(() => {
    async function loadData() {
      try {
        const [placesData, staysData, adventuresData] = await Promise.all([
          getPlaces(), getStays(), getAdventures(),
        ]);
        if (placesData?.length > 0) setPlaces(placesData);
        if (staysData?.length > 0) setStays(staysData);
        if (adventuresData?.length > 0) setAdventures(adventuresData);
      } catch (err) {
        console.warn("Using fallback data:", err);
      }
    }
    loadData();
  }, []);

  const handleOpenInquiry = (title?: string, listingType: string = "GENERAL", listingId?: number) => {
    setSelectedTitle(title);
    setSelectedListingType(listingType);
    setSelectedListingId(listingId);
    setInquiryModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Navbar onOpenInquiry={() => handleOpenInquiry("General Trip Inquiry", "GENERAL")} />

      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section className="hero-bg pt-28 pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <div className="space-y-7">
              {/* Live badge */}
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-dot" />
                Kumaon Lake District · 1,370 m Elevation
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]"
              >
                Breathe in the<br />
                <span className="text-gradient-emerald">Emerald Waters</span><br />
                of Bhimtal
              </motion.h1>

              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed"
              >
                A serene Himalayan sanctuary nestled between seven pristine lakes, sacred pine ridges,
                and high-altitude paragliding skies — just 2 hrs from Delhi.
              </motion.p>

              {/* Category pills */}
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-2"
              >
                {CATEGORY_PILLS.map(({ label, icon: Icon, color }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                      color === "emerald"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                        : "bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={() => handleOpenInquiry("All-Inclusive Bhimtal Holiday", "GENERAL")}
                  className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Plan Your Adventure
                </button>
                <Link
                  href="/map"
                  className="px-6 py-3.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Interactive Map
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                custom={5} variants={fadeUp} initial="hidden" animate="show"
                className="flex items-center gap-5 text-xs text-slate-500"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Local Guides</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-emerald-500" />
                  <span>Zero-Commission Homestays</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Weather + Stats */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="space-y-5"
            >
              <WeatherWidget />

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "7+", label: "Alpine Lakes", color: "emerald" },
                  { value: "1,850m", label: "Highest Peak", color: "emerald" },
                  { value: "100%", label: "Local Hosts", color: "amber" },
                ].map(({ value, label, color }) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-900/5 p-4 text-center"
                  >
                    <span className={`text-2xl font-black ${color === "amber" ? "text-amber-500" : "text-emerald-600"}`}>
                      {value}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Hero nature image strip */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="h-36 rounded-2xl bg-cover bg-center shadow-md border border-emerald-100 overflow-hidden hover-tilt"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')` }}
                />
                <div
                  className="h-36 rounded-2xl bg-cover bg-center shadow-md border border-emerald-100 overflow-hidden hover-tilt"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80')` }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── BENTO HIGHLIGHTS ─── */}
        <div id="highlights" className="section-mint">
          <BentoGrid onInquire={handleOpenInquiry} />
        </div>

        {/* ─── PLACES ─── */}
        <div className="section-white">
          <PlacesSection initialPlaces={places} onInquire={handleOpenInquiry} />
        </div>

        {/* ─── STAYS ─── */}
        <div className="section-mint">
          <StaysSection initialStays={stays} onInquire={handleOpenInquiry} />
        </div>

        {/* ─── ADVENTURES ─── */}
        <div className="section-white">
          <AdventuresSection initialAdventures={adventures} onInquire={handleOpenInquiry} />
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <section className="py-20 px-4 section-cream">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
                Direct Local Booking
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                Ready for the Tranquil Magic
                <br />
                <span className="text-gradient-emerald">of Bhimtal?</span>
              </h2>
              <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
                Connect with verified trek guides, reserve your paragliding slot, or lock in an
                authentic lakeside cottage — all zero-commission.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => handleOpenInquiry("Customized Itinerary Booking", "GENERAL")}
                  className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-300 transition-all duration-300 flex items-center gap-2"
                >
                  Connect With Local Concierge
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/map"
                  className="px-7 py-4 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 font-bold text-sm hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Explore on Map
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultTitle={selectedTitle}
        defaultListingType={selectedListingType}
        defaultListingId={selectedListingId}
      />
    </div>
  );
}
