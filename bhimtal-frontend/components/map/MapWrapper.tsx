"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Place } from "@/lib/api";
import { Loader2 } from "lucide-react";

const BhimtalMap = dynamic(() => import("./BhimtalMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-3xl bg-slate-900/60 border border-emerald-500/20 flex flex-col items-center justify-center space-y-3 backdrop-blur-xl">
      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      <span className="text-xs text-slate-400 font-medium tracking-wider">
        Loading Interactive Himalayan Satellite Map...
      </span>
    </div>
  ),
});

interface MapWrapperProps {
  places: Place[];
  onSelectPlace?: (place: Place) => void;
  onInquire?: (title: string, listingType: string, listingId?: number) => void;
  selectedPlaceId?: number | null;
}

export function MapWrapper(props: MapWrapperProps) {
  return <BhimtalMap {...props} />;
}
