"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Showtime } from "@/data/movies";
import { cn, formatDateLabel } from "@/lib/utils";

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  onSlotChange?: (payload: { date: string; time: string; price: number; screen: string }) => void;
}

export function ShowtimeSelector({ showtimes, onSlotChange }: ShowtimeSelectorProps) {
  const [activeDate, setActiveDate] = useState(showtimes[0]);
  const [selectedTime, setSelectedTime] = useState(activeDate.times[0]);

  useEffect(() => {
    setSelectedTime(activeDate.times[0]);
  }, [activeDate]);

  const handleTimeClick = (time: typeof selectedTime) => {
    setSelectedTime(time);
    onSlotChange?.({
      date: activeDate.date,
      time: time.label,
      price: time.price,
      screen: time.screen
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {showtimes.map((slot) => {
          const isActive = slot.date === activeDate.date;
          return (
            <button
              key={slot.date}
              onClick={() => setActiveDate(slot)}
              className={cn(
                "relative min-w-[160px] rounded-2xl border border-white/10 px-4 py-3 text-left transition",
                isActive ? "bg-white/10 text-white" : "bg-white/5 text-white/60 hover:text-white"
              )}
            >
              <p className="text-xs uppercase tracking-wider text-white/50">Select date</p>
              <p className="text-sm font-semibold text-white">{formatDateLabel(slot.date)}</p>
              {isActive && (
                <motion.span
                  layoutId="activeDate"
                  className="absolute inset-0 -z-10 rounded-2xl border border-purple-400/40 shadow-glow"
                />
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDate.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeDate.times.map((time) => {
            const active = selectedTime.label === time.label;
            return (
              <button
                key={time.label}
                onClick={() => handleTimeClick(time)}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/30",
                  active && "border-sky-400 bg-sky-400/20 shadow-glow-blue"
                )}
              >
                <p className="text-lg font-semibold text-white">{time.label}</p>
                <p className="text-sm text-white/60">{time.screen}</p>
                <p className="text-sm text-white/80">${time.price.toFixed(2)}</p>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

