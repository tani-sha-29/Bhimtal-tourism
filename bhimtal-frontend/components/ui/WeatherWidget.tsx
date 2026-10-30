"use client";

import React, { useEffect, useState } from "react";
import { CloudRain, Wind, Mountain, Sun, Droplets, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  lakeStatus: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 19,
    condition: "Crisp Himalayan Breeze",
    humidity: 58,
    windSpeed: 11,
    lakeStatus: "Ideal for Boating & Kayaking",
  });

  useEffect(() => {
    async function fetchLiveWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=29.3499&longitude=79.5544&current_weather=true&hourly=relativehumidity_2m"
        );
        if (res.ok) {
          const data = await res.json();
          const cur = data.current_weather;
          if (cur) {
            setWeather({
              temp: Math.round(cur.temperature),
              condition: cur.temperature > 22 ? "Sunny Mountain Sky" : "Crisp Himalayan Breeze",
              humidity: data.hourly?.relativehumidity_2m?.[0] || 60,
              windSpeed: Math.round(cur.windspeed),
              lakeStatus: cur.windspeed < 20 ? "Ideal for Boating & Paragliding" : "Breezy Mountain Wind",
            });
          }
        }
      } catch (err) {
        console.warn("Using offline weather stats:", err);
      }
    }
    fetchLiveWeather();
  }, []);

  const isGood = weather.lakeStatus.includes("Ideal");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-md shadow-emerald-900/5 p-5 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
            Live Bhimtal Weather
          </span>
        </div>
        <div className="flex items-center text-xs text-slate-400">
          <Mountain className="w-3.5 h-3.5 mr-1 text-emerald-400" />
          1,370 m altitude
        </div>
      </div>

      {/* Main weather row */}
      <div className="pt-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">{weather.temp}°</span>
            <span className="text-base font-medium text-slate-400">C</span>
          </div>
          <p className="text-xs text-slate-500 font-medium flex items-center mt-1 gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            {weather.condition}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <Wind className="w-3.5 h-3.5 text-blue-500" />
            </div>
            {weather.windSpeed} km/h
          </span>
          <span className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-lg bg-cyan-50 flex items-center justify-center">
              <Droplets className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            {weather.humidity}% humidity
          </span>
        </div>
      </div>

      {/* Lake status */}
      <div className="mt-4 pt-3 border-t border-emerald-50 flex items-center justify-between text-[11px]">
        <span className="text-slate-400 font-medium">Lake Status</span>
        <span
          className={`font-semibold px-2.5 py-1 rounded-full border text-[11px] ${
            isGood
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : "text-amber-700 bg-amber-50 border-amber-200"
          }`}
        >
          ✦ {weather.lakeStatus}
        </span>
      </div>
    </motion.div>
  );
}
