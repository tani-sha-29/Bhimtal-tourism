"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Compass, MapPin, Home, Ticket, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { checkBackendStatus } from "@/lib/api";

interface NavbarProps {
  onOpenInquiry: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export function Navbar({ onOpenInquiry, activeTab = "discover-home", onSelectTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<{ backendOnline: boolean; activeEndpoint: string }>({
    backendOnline: false,
    activeEndpoint: "Checking...",
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Initial check and periodic backend check
    checkBackendStatus().then(setBackendStatus);
    const interval = setInterval(() => {
      checkBackendStatus().then(setBackendStatus);
    }, 15000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: "discover-home", label: "Discover & Home", href: "/#discover-home", icon: Compass },
    { id: "explore-interactive-map", label: "Explore & Interactive Map", href: "/map", icon: MapPin },
    { id: "homestays-resorts", label: "Homestays & Resorts", href: "/#homestays-resorts", icon: Home },
    { id: "bookings-experiences", label: "Bookings & Experiences", href: "/#bookings-experiences", icon: Ticket },
  ];

  const handleNavClick = (id: string, href: string) => {
    if (onSelectTab) {
      onSelectTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e17]/90 backdrop-blur-2xl border-b border-[#262a34] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-[#0a0e17]/75 backdrop-blur-xl border-b border-[#262a34]/60"
      }`}
    >
      <div className="h-20 w-full px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Location Crest */}
        <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#10b981] via-[#4edea3] to-[#4cd7f6] p-[2px] shadow-[0_0_16px_rgba(78,222,163,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0f131c] rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#4edea3] text-[22px]">explore</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-space font-bold text-lg sm:text-xl text-[#dfe2ef] tracking-tight leading-none group-hover:text-white transition">
              Explore Bhimtal
            </span>
            <span className="font-space text-[10px] uppercase tracking-wider text-[#4edea3] mt-1 font-semibold">
              Kumaon, Uttarakhand
            </span>
          </div>
        </Link>

        {/* Central Segmented Stitch Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1 bg-[#181b25]/80 border border-[#262a34] rounded-xl shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#10b981] text-[#003824] shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                    : "text-[#bbcabf] hover:text-[#dfe2ef] hover:bg-[#262a34]/60"
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${isActive ? "text-[#003824]" : "text-[#4edea3]"}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Section: Telemetry, DB status & Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live Weather / Lake Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181b25] border border-[#262a34]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="font-space text-[11px] font-semibold text-[#dfe2ef]">
              Boating Open • Clear 21°C
            </span>
          </div>

          {/* Supabase & Backend Connection Badge */}
          <div
            title={`Backend: ${backendStatus.activeEndpoint}`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-[#181b25] border-[#262a34]"
          >
            <Database className={`w-3 h-3 ${backendStatus.backendOnline ? "text-[#4edea3]" : "text-amber-400"}`} />
            <span className={backendStatus.backendOnline ? "text-[#4edea3]" : "text-amber-300"}>
              {backendStatus.backendOnline ? "Supabase Live" : "Offline / Cache"}
            </span>
          </div>

          {/* Plan My Trip CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-space font-bold text-xs uppercase tracking-wider shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_32px_rgba(78,222,163,0.5)] transition-all transform active:scale-95 flex items-center gap-1.5"
            type="button"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan My Trip</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#bbcabf] hover:text-[#dfe2ef] hover:bg-[#181b25] border border-[#262a34] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#4edea3]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0a0e17] border-t border-[#262a34] px-4 py-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className="px-4 py-3 rounded-xl bg-[#181b25] text-[#dfe2ef] hover:bg-[#262a34] font-semibold text-sm flex items-center justify-between border border-[#262a34]"
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-[#4edea3]" />
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#86948a]">chevron_right</span>
                </a>
              ))}

              <div className="pt-2 flex items-center justify-between text-xs text-[#bbcabf] px-2">
                <span>Database Status:</span>
                <span className={backendStatus.backendOnline ? "text-[#4edea3]" : "text-amber-400"}>
                  {backendStatus.backendOnline ? "Supabase Connected" : "Local Mode"}
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
