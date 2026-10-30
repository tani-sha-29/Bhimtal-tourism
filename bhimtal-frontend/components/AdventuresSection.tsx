"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Adventure } from "@/lib/api";
import { Wind, Waves, Compass, Mountain, Clock, Phone, ArrowUpRight, Zap } from "lucide-react";

interface AdventuresSectionProps {
  initialAdventures: Adventure[];
  onInquire: (title: string, listingType: string, listingId?: number) => void;
}

const ACTIVITY_ICONS: Record<string, any> = {
  PARAGLIDING: Wind,
  KAYAKING: Waves,
  BOATING: Compass,
  TREKKING: Mountain,
};

const ACTIVITY_COLORS: Record<string, { bg: string; text: string; badge: string; badgeText: string }> = {
  PARAGLIDING: { bg: "bg-sky-50", text: "text-sky-600", badge: "bg-sky-100 border-sky-200 text-sky-700", badgeText: "text-sky-700" },
  KAYAKING: { bg: "bg-teal-50", text: "text-teal-600", badge: "bg-teal-100 border-teal-200 text-teal-700", badgeText: "text-teal-700" },
  BOATING: { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-100 border-emerald-200 text-emerald-700", badgeText: "text-emerald-700" },
  TREKKING: { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-100 border-amber-200 text-amber-700", badgeText: "text-amber-700" },
};

export function AdventuresSection({ initialAdventures, onInquire }: AdventuresSectionProps) {
  const [selectedType, setSelectedType] = useState("ALL");

  const filteredAdventures = initialAdventures.filter(
    (adv) => selectedType === "ALL" || adv.activityType === selectedType
  );

  return (
    <section id="adventures" className="relative py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            Thrill & Silence
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Outdoor <span className="text-gradient-amber">Adventures</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Soar above emerald lakes or paddle through peaceful seven-lake forest sanctuaries.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["ALL", "PARAGLIDING", "KAYAKING", "BOATING", "TREKKING"].map((type) => {
            const isActive = selectedType === type;
            const colors = ACTIVITY_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                    : "bg-white border border-emerald-100 text-slate-600 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {type === "ALL" ? "All Sports" : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdventures.map((adv, i) => {
          const IconComponent = ACTIVITY_ICONS[adv.activityType] || Compass;
          const colors = ACTIVITY_COLORS[adv.activityType] || ACTIVITY_COLORS.TREKKING;
          return (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-300 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-11 w-11 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} group-hover:scale-110 transition`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors.badge}`}>
                    {adv.activityType}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {adv.title}
                </h3>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                    {adv.duration || "Standard slot"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-300" />
                    Certified Operator
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Ticket Price</span>
                  <span className="text-xl font-extrabold text-emerald-600">
                    ₹{adv.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onInquire(`Adventure: ${adv.title}`, "ADVENTURE", adv.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-200 hover:shadow-md transition flex items-center gap-1"
                >
                  Book Slot <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
