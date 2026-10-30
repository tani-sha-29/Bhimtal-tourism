"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapWrapper } from "@/components/map/MapWrapper";
import { InquiryModal } from "@/components/ui/InquiryModal";
import { getPlaces, Place, FALLBACK_PLACES } from "@/lib/api";
import { MapPin, Navigation, Mountain, Waves, Landmark, Sparkles, ArrowLeft, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

export default function MapPage() {
  const [places, setPlaces] = useState<Place[]>(FALLBACK_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place>(FALLBACK_PLACES[0]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await getPlaces();
        if (data && data.length > 0) {
          setPlaces(data);
          setSelectedPlace(data[0]);
        }
      } catch (err) {
        console.warn("Using fallback places on map:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, []);

  const filteredPlaces = places.filter(
    (p) => filterCategory === "ALL" || p.category === filterCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0f131c] text-[#dfe2ef]">
      <Navbar
        activeTab="explore-interactive-map"
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      <main className="flex-1 w-full pt-24 pb-6 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col">
        {/* Top Header & Category Filter Bar */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="inline-flex items-center text-xs font-semibold text-[#4edea3] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Home Explorer</span>
              </Link>
              <span className="text-[#3c4a42]">•</span>
              <span className="text-xs text-[#bbcabf] font-mono">Bhimtal Valley Geo-Deck</span>
            </div>
            <h1 className="font-space text-2xl sm:text-3xl font-bold text-[#dfe2ef] tracking-tight">
              Interactive <span className="text-gradient-emerald">Highland Map & Trails</span>
            </h1>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "ALL", label: "All Waypoints" },
              { id: "LAKE", label: "Lakes & Basins" },
              { id: "TREK", label: "Mountain Treks" },
              { id: "TEMPLE", label: "Temples" },
              { id: "ATTRACTION", label: "Heritage" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-space text-xs font-semibold transition-all shrink-0 ${
                  filterCategory === cat.id
                    ? "bg-[#10b981] text-[#003824] shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                    : "bg-[#181b25] text-[#bbcabf] hover:text-[#dfe2ef] border border-[#262a34]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Unified 2-Column Responsive Viewport (Immediate, No Blank Space) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-[480px]">
          {/* Left: Waypoint Card Deck (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col max-h-[500px] lg:max-h-[calc(100vh-190px)] min-h-[380px] bg-[#181b25] border border-[#262a34] rounded-2xl p-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#262a34] px-1">
              <span className="font-space text-xs font-bold uppercase tracking-wider text-[#bbcabf] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#4edea3]" />
                Trails & Locations ({filteredPlaces.length})
              </span>
              <span className="text-[11px] text-[#4edea3] font-mono">1,370m - 1,850m</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {filteredPlaces.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#4edea3] bg-[#1c1f29] shadow-[0_0_20px_rgba(78,222,163,0.15)] ring-1 ring-[#4edea3]"
                        : "border-[#262a34] bg-[#0f131c]/60 hover:bg-[#1c1f29] hover:border-[#3c4a42]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded">
                            {place.category}
                          </span>
                          {place.elevation && (
                            <span className="text-[11px] text-[#bbcabf] font-mono">
                              {place.elevation}
                            </span>
                          )}
                        </div>
                        <h4 className="font-space font-semibold text-sm text-[#dfe2ef] leading-snug">
                          {place.title}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono text-[#4cd7f6] block">
                          {place.distance || "Near center"}
                        </span>
                        <span className="text-[10px] text-[#bbcabf]">
                          {place.duration || "1-2 hrs"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#bbcabf] line-clamp-2 mt-1.5 leading-relaxed">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#262a34] text-[11px]">
                      <span className="text-[#4edea3] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Route</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlace(place);
                          setInquiryModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#10b981]/20 hover:bg-[#10b981] text-[#4edea3] hover:text-[#003824] font-semibold text-[11px] transition"
                      >
                        Inquire Spot
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Dark Canvas Map (7 Cols on Desktop) */}
          <div className="lg:col-span-7 h-[460px] lg:h-[calc(100vh-190px)] min-h-[440px] rounded-2xl overflow-hidden border border-[#262a34] relative shadow-2xl bg-[#0a0e17]">
            <MapWrapper
              places={filteredPlaces}
              onSelectPlace={(p) => setSelectedPlace(p)}
              selectedPlaceId={selectedPlace?.id}
              onInquire={(title, listingType, listingId) => {
                setInquiryModalOpen(true);
              }}
            />

            {/* Floating Quick Landmark Card on Map */}
            {selectedPlace && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[500] p-4 rounded-xl bg-[#0f131c]/90 backdrop-blur-xl border border-[#4edea3]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-space font-bold tracking-wider text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/20">
                      Active Pin: {selectedPlace.category}
                    </span>
                    <h3 className="font-space font-bold text-base text-[#dfe2ef] mt-1">
                      {selectedPlace.title}
                    </h3>
                    <p className="text-xs text-[#bbcabf] line-clamp-2 mt-0.5">
                      {selectedPlace.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-[#10b981] text-[#003824] font-space font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:bg-[#4edea3] transition"
                  >
                    Book Guide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultListingType="PLACE"
        defaultListingId={selectedPlace?.id}
        defaultTitle={selectedPlace?.title}
      />
    </div>
  );
}
