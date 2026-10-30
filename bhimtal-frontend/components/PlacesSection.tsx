"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Place } from "@/lib/api";
import { Mountain, Waves, Landmark, Sparkles, Search, ArrowUpRight, Compass, MapPin } from "lucide-react";

interface PlacesSectionProps {
  initialPlaces: Place[];
  onInquire: (title: string, listingType: string, listingId?: number) => void;
}

const CATEGORIES = [
  { label: "All Landmarks", value: "ALL" },
  { label: "Lakes", value: "LAKE", icon: Waves },
  { label: "Treks", value: "TREK", icon: Mountain },
  { label: "Temples", value: "TEMPLE", icon: Landmark },
  { label: "Attractions", value: "ATTRACTION", icon: Sparkles },
];

export function PlacesSection({ initialPlaces, onInquire }: PlacesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = initialPlaces.filter((place) => {
    const matchesCategory = selectedCategory === "ALL" || place.category === selectedCategory;
    const matchesSearch =
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="places" className="relative py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            Sacred Hills & Lakes
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore <span className="text-gradient-emerald">Bhimtal Landmarks</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Discover pristine lakes, mountain ridges, and centuries-old hillside temples.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lakes, treks, temples..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-emerald-100 bg-white text-slate-800 placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "bg-white border border-emerald-100 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-300 transition-all duration-300"
          >
            {/* Card Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${place.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  {place.category}
                </span>
                {place.isFeatured && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                    Featured
                  </span>
                )}
              </div>

              {place.elevation && (
                <div className="absolute bottom-3 left-3 flex items-center text-xs text-white bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                  <Mountain className="w-3 h-3 mr-1 text-emerald-400" />
                  {place.elevation}
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {place.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {place.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-50 flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  {place.difficulty || "All Travelers"}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/places/${place.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium transition"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => onInquire(place.title, "PLACE", place.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1"
                  >
                    Inquire <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
