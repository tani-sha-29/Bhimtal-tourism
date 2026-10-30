"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Wind, Mountain, Home, Waves, ArrowUpRight, Map, ShieldCheck, CloudSun, TreePine } from "lucide-react";

interface BentoGridProps {
  onInquire: (title: string, listingType: string, listingId?: number) => void;
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
  }),
};

export function BentoGrid({ onInquire }: BentoGridProps) {
  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4"
        >
          <TreePine className="w-3.5 h-3.5" />
          Curated Himalayan Experiences
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
        >
          Discover the Magic of{" "}
          <span className="text-gradient-emerald">Bhimtal</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-sm md:text-base text-slate-500"
        >
          From tranquil emerald waters to rugged pine ridge treks and cliff-side paragliding takeoffs.
        </motion.p>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">

        {/* Card 1: Bhimtal Lake — Large (2 cols × 2 rows) */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 relative group flex flex-col justify-end p-8 overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => onInquire("Bhimtal Lake Shikara Ride", "PLACE", 1)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-white pulse-dot" />
            Boating & Promenade Open
          </div>

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold flex items-center mb-1">
              <Waves className="w-3.5 h-3.5 mr-1" /> The Jewel of Kumaon
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Bhimtal Lake & Island Aquarium
            </h3>
            <p className="text-xs md:text-sm text-slate-200 max-w-md line-clamp-2">
              The largest natural lake in Nainital district, centered with a legendary island aquarium and serene shikara boat excursions.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition flex items-center gap-1">
                Book Boating <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a href="#places" className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition">
                Explore Details
              </a>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Hidimba Parvat Trek — Tall */}
        <motion.div
          custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="md:col-span-1 md:row-span-2 relative group flex flex-col justify-end p-6 overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => onInquire("Hidimba Parvat Guided Trek", "TREK", 2)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent" />

          <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
            <Mountain className="w-3 h-3" /> 1,850 m Altitude
          </div>

          <div className="relative z-10">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1 block">High-Ridge Trail</span>
            <h3 className="text-xl font-bold text-white mb-1">Hidimba Parvat Trek</h3>
            <p className="text-xs text-slate-200 mb-4 line-clamp-3">
              5 km forested pine trail leading to the sacred Vankhandi hermitage with 360° views of the Himalayan divide.
            </p>
            <button className="w-full py-2 rounded-xl bg-white/15 hover:bg-emerald-500/80 border border-white/20 text-white text-xs font-semibold transition flex items-center justify-center gap-1">
              Book Guided Trek <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Card 3: Paragliding */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative group flex flex-col justify-between p-6 overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => onInquire("Tandem Paragliding", "ADVENTURE", 1)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-1 bg-sky-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              <Wind className="w-3 h-3" /> Optimal Wind
            </span>
            <span className="text-sm font-extrabold text-amber-300">₹2,500</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white">Tandem Paragliding</h3>
            <p className="text-[11px] text-slate-200 mt-0.5 mb-2">Bhimtal / Naukuchiatal ridge takeoff with licensed pilot.</p>
            <button className="text-xs text-amber-300 font-semibold hover:underline flex items-center">
              Reserve Slot <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </motion.div>

        {/* Card 4: Local Homestays */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative group flex flex-col justify-between p-6 overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => onInquire("Bhimtal Homestay Booking", "STAY", 3)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-1 bg-emerald-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              <Home className="w-3 h-3" /> Verified
            </span>
            <span className="text-xs font-bold text-white">from ₹2,400/nt</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white">Lakeside & Pine Stays</h3>
            <p className="text-[11px] text-slate-200 mt-0.5 mb-2">Authentic Kumaoni hospitality with mountain valley decks.</p>
            <button className="text-xs text-emerald-300 font-semibold hover:underline flex items-center">
              Find Homestays <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </motion.div>

        {/* Card 5: Sattal Lakes — Wide */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="md:col-span-3 lg:col-span-2 relative group flex flex-col justify-between p-6 overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => onInquire("Sattal Kayaking & Tour", "PLACE", 3)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent" />

          <div className="relative z-10">
            <span className="bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
              🦅 Birdwatching Sanctuary
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Sattal Interconnected Lakes</h3>
              <p className="text-xs text-slate-200 mt-1 max-w-sm">
                Silent water kayaking, 500+ bird species, and tranquil untouched oak forest trails.
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-emerald-500/80 border border-white/20 text-white text-xs font-medium transition shrink-0">
              Inquire
            </button>
          </div>
        </motion.div>

      </div>

      {/* Feature badges row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Map, label: "Interactive Map", desc: "All sites geo-tagged", color: "emerald" },
          { icon: ShieldCheck, label: "Verified Guides", desc: "100% certified locals", color: "emerald" },
          { icon: Home, label: "Homestays", desc: "Zero-commission stays", color: "amber" },
          { icon: CloudSun, label: "Live Weather", desc: "Real-time conditions", color: "amber" },
        ].map(({ icon: Icon, label, desc, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-900/5 p-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${color === "amber" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
