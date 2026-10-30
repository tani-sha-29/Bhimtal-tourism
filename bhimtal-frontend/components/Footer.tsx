import React from "react";
import Link from "next/link";
import { Heart, MapPin, Phone, Mail, ShieldCheck, Database, Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[#262a34] bg-[#0a0e17] pt-14 pb-10 px-4 sm:px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1c1f29]">
        {/* Brand & Ecosystem */}
        <div className="space-y-3.5 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#10b981] via-[#4edea3] to-[#4cd7f6] p-[2px]">
              <div className="w-full h-full bg-[#0f131c] rounded-[10px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#4edea3]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-space font-bold text-base text-[#dfe2ef] tracking-tight">
                Explore Bhimtal
              </span>
              <span className="font-space text-[10px] text-[#4edea3] uppercase tracking-wider font-semibold">
                Kumaon, Uttarakhand
              </span>
            </div>
          </div>
          <p className="text-xs text-[#bbcabf] leading-relaxed">
            The hyper-local portal for the Seven Lakes of Kumaon. Direct integration with KMVN-certified homestays, licensed paragliding operators, and forest trekking naturalists.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#4edea3] bg-[#181b25] border border-[#262a34] rounded-lg px-3 py-1.5 w-fit">
            <Database className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Supabase Database & Spring Boot Backend</span>
          </div>
        </div>

        {/* Waypoints */}
        <div>
          <h4 className="font-space text-xs font-bold text-[#dfe2ef] uppercase tracking-wider mb-3">
            Lakes & Trails
          </h4>
          <ul className="space-y-2 text-xs text-[#bbcabf]">
            {[
              { href: "/map", label: "Bhimtal Lake & Central Island" },
              { href: "/map", label: "Hidimba Parvat Pine Ridge (1,850m)" },
              { href: "/map", label: "Sattal Seven Lakes Cascade" },
              { href: "/map", label: "Naukuchiatal 9-Corner Lake" },
              { href: "/map", label: "Victoria Dam (Masonry 1883)" },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-[#4edea3] transition flex items-center gap-1.5 group">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3c4a42] group-hover:bg-[#4edea3] transition" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stays & Adventures */}
        <div>
          <h4 className="font-space text-xs font-bold text-[#dfe2ef] uppercase tracking-wider mb-3">
            Stays & Activities
          </h4>
          <ul className="space-y-2 text-xs text-[#bbcabf]">
            {[
              { href: "/#homestays-resorts", label: "Kumaoni Heritage Homestays" },
              { href: "/#homestays-resorts", label: "Lakeside Boutique Cottages" },
              { href: "/#bookings-experiences", label: "Tandem Paragliding at Naukuchiatal" },
              { href: "/#bookings-experiences", label: "Silent Water Kayaking at Sattal" },
              { href: "/map", label: "Interactive GIS Map" },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-[#4edea3] transition flex items-center gap-1.5 group">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3c4a42] group-hover:bg-[#4cd7f6] transition" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Operations Desk */}
        <div className="space-y-3">
          <h4 className="font-space text-xs font-bold text-[#dfe2ef] uppercase tracking-wider mb-3">
            Kumaon Operations Desk
          </h4>
          <div className="space-y-2.5 text-xs text-[#bbcabf]">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#4edea3] shrink-0 mt-0.5" />
              <span>Lake Promenade, Bhimtal, Nainital, Uttarakhand 263136</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
              <span>+91 94120 12345 (Concierge Desk)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
              <span>concierge@bhimtaltravel.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86948a] gap-2">
        <p>© 2026 Explore Bhimtal Tourism App. Connected to Supabase Database.</p>
        <span className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-[#4edea3] mx-0.5" /> for Uttarakhand Highlands
        </span>
      </div>
    </footer>
  );
}
