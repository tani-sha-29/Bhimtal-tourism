"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stay } from "@/lib/api";
import { Home, Hotel, BedDouble, MapPin, Phone, Check, ArrowUpRight } from "lucide-react";

interface StaysSectionProps {
  initialStays: Stay[];
  onInquire: (title: string, listingType: string, listingId?: number) => void;
}

const STAY_TYPES = [
  { label: "All Accommodations", value: "ALL" },
  { label: "Homestays", value: "HOMESTAY", icon: Home },
  { label: "Hotels", value: "HOTEL", icon: Hotel },
  { label: "Resorts", value: "RESORT", icon: BedDouble },
];

export function StaysSection({ initialStays, onInquire }: StaysSectionProps) {
  const [selectedType, setSelectedType] = useState("ALL");

  const filteredStays = initialStays.filter(
    (stay) => selectedType === "ALL" || stay.type === selectedType
  );

  return (
    <section id="stays" className="relative py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-3">
            <Home className="w-3.5 h-3.5" />
            Kumaoni Hospitality
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Handpicked{" "}
            <span className="text-gradient-emerald">Homestays & Resorts</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Stay with local host families or unwind at serene boutique forest retreats.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {STAY_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = selectedType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                    : "bg-white border border-emerald-100 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStays.map((stay, i) => (
          <motion.div
            key={stay.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-300 transition-all duration-300"
          >
            {/* Stay Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${stay.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                {stay.type}
              </span>

              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl border border-emerald-100 text-slate-800 font-extrabold text-xs">
                <span className="text-emerald-600">₹{stay.pricePerNight.toLocaleString()}</span>
                <span className="text-slate-400 font-normal text-[10px]"> / night</span>
              </div>
            </div>

            {/* Stay Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {stay.name}
                </h3>
                <div className="flex items-center text-xs text-slate-400 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-500 shrink-0" />
                  <span className="line-clamp-1">{stay.location}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {stay.amenities.slice(0, 4).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      <Check className="w-2.5 h-2.5 mr-1 text-emerald-500" />
                      {amenity}
                    </span>
                  ))}
                  {stay.amenities.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{stay.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-emerald-50 flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  <span className="text-[11px]">{stay.contactPhone}</span>
                </div>
                <button
                  onClick={() => onInquire(`Stay: ${stay.name}`, "STAY", stay.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-sm shadow-emerald-200"
                >
                  Book Stay <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
