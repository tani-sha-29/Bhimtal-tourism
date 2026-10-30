"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InquiryModal } from "@/components/ui/InquiryModal";
import { getPlaceBySlug, Place, FALLBACK_PLACES } from "@/lib/api";
import { ArrowLeft, Mountain, MapPin, Compass, Navigation, Sparkles, ShieldCheck, Loader2 } from "lucide-react";

function PlaceDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [place, setPlace] = useState<Place | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getPlaceBySlug(slug);
        if (data) {
          setPlace(data);
        } else {
          const found = FALLBACK_PLACES.find((p) => p.slug === slug);
          if (found) setPlace(found);
        }
      }
    }
    load();
  }, [slug]);

  if (!place) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <span className="text-xs text-slate-400 font-medium">Loading Landmark Details...</span>
      </div>
    );
  }

  return (
    <main className="flex-1 pt-32 pb-20 px-4 max-w-5xl mx-auto w-full">
      {/* Back Link */}
      <Link
        href="/#places"
        className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        <span>Back to All Places</span>
      </Link>

      {/* Hero Image Container */}
      <div className="relative h-[360px] md:h-[480px] w-full rounded-3xl overflow-hidden border border-emerald-100 shadow-xl mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${place.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

        {/* Badges on Top */}
        <div className="absolute top-6 left-6 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-white/90 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            {place.category}
          </span>
          {place.isFeatured && (
            <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md">
              Featured Landmark
            </span>
          )}
        </div>

        {/* Title & Info on Bottom of Image */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
            {place.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
            {place.elevation && (
              <span className="flex items-center bg-black/40 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md">
                <Mountain className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                {place.elevation} Elevation
              </span>
            )}
            {place.difficulty && (
              <span className="flex items-center bg-black/40 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 mr-1 text-amber-300" />
                Difficulty: {place.difficulty}
              </span>
            )}
            <span className="flex items-center bg-black/40 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 mr-1 text-rose-300" />
              {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">About {place.title}</h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              {place.description}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
            <h3 className="text-base font-bold text-emerald-800 mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
              Local Guide Recommendations
            </h3>
            <ul className="text-xs md:text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>Best time to visit: Early mornings (07:00 - 10:00) for crystal clear water reflections and mountain bird activity.</li>
              <li>Carry light walking shoes and hydration for trail ascents.</li>
              <li>Respect sacred shrines and preserve the fragile lake ecosystem.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-950/5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block">
              Direct Inquiry & Booking
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect with local certified Bhimtal operators for guided treks, boating permits, or customized transport.
            </p>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book / Inquire Now</span>
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition flex items-center justify-center space-x-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultTitle={place.title}
        defaultListingType="PLACE"
        defaultListingId={place.id}
      />
    </main>
  );
}

export default function PlaceDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      <Navbar onOpenInquiry={() => {}} />
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="text-xs text-slate-500 font-medium">Loading Landmark...</span>
          </div>
        }
      >
        <PlaceDetailContent />
      </Suspense>
      <Footer />
    </div>
  );
}
