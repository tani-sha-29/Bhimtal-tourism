"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Place } from "@/lib/api";
import { MapPin, Navigation, Mountain, Waves, ArrowRight } from "lucide-react";

// Fix standard Leaflet default icon path issues in Next.js
const createCustomIcon = (category: string) => {
  let color = "#10b981"; // emerald default
  if (category === "TREK") color = "#f59e0b"; // amber
  if (category === "LAKE") color = "#06b6d4"; // cyan
  if (category === "TEMPLE") color = "#ec4899"; // pink
  if (category === "ATTRACTION") color = "#8b5cf6"; // purple

  return L.divIcon({
    className: "custom-glowing-marker",
    html: `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: rgba(10, 15, 29, 0.85);
        border: 2px solid ${color};
        border-radius: 50%;
        box-shadow: 0 0 16px ${color};
        cursor: pointer;
      ">
        <div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%; animation: pulse 2s infinite;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

interface BhimtalMapProps {
  places: Place[];
  onSelectPlace?: (place: Place) => void;
  onInquire?: (title: string, listingType: string, listingId?: number) => void;
  selectedPlaceId?: number | null;
}

export default function BhimtalMap({
  places,
  onSelectPlace,
  onInquire,
  selectedPlaceId,
}: BhimtalMapProps) {
  const center: [number, number] = [29.3499, 79.5544]; // Bhimtal Lake center

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        {/* CartoDB Dark Matter basemap */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={createCustomIcon(place.category)}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place),
            }}
          >
            <Popup className="bhimtal-popup">
              <div className="p-2 max-w-[220px]">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {place.category}
                  </span>
                  {place.elevation && (
                    <span className="text-[10px] text-slate-300">
                      {place.elevation}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{place.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">
                  {place.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-cyan-400 font-medium hover:underline flex items-center"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Navigate
                  </a>
                  {onInquire && (
                    <button
                      onClick={() => onInquire(place.title, "PLACE", place.id)}
                      className="px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400 transition"
                    >
                      Inquire
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
