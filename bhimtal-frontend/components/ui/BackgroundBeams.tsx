"use client";

import { motion } from "framer-motion";
import React from "react";

export function BackgroundBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* Top glowing radial orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-cyan-500/15 blur-[140px] rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-emerald-500/15 blur-[140px] rounded-full" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated floating particles with deterministic sizes to prevent SSR hydration errors */}
      {[...Array(12)].map((_, i) => {
        const size = ((i * 7) % 4) + 3;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 8.5) % 100}%`,
              top: `${(i * 12.3) % 90}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
