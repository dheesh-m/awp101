"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface BookingSeatMapProps {
  onSeatsChange: (seats: string[], totalPrice: number) => void;
  maxSeats?: number;
}

const BASE_PRICE = 280;
const MAX_SEATS_PER_ROW = 10;

interface SeatRowLayout {
  label: string;
  start: number;
  end: number;
  sold: number[];
}

const seatLayout: SeatRowLayout[] = [
  { label: "E", start: 1, end: 10, sold: [2, 5, 9] },
  { label: "D", start: 2, end: 9, sold: [3, 7, 8] },
  { label: "C", start: 3, end: 8, sold: [4, 6] },
  { label: "B", start: 4, end: 7, sold: [5] },
  { label: "A", start: 5, end: 6, sold: [] }
];

const buildTheater = () => {
  return seatLayout.map((row) => {
    const positions = Array.from({ length: MAX_SEATS_PER_ROW }, (_, idx) => {
      const number = idx + 1;
      if (number < row.start || number > row.end) return null;
      return {
        id: `${row.label}${number}`,
        number,
        isSold: row.sold.includes(number)
      };
    });
    return { ...row, positions };
  });
};

export function BookingSeatMap({ onSeatsChange, maxSeats = 10 }: BookingSeatMapProps) {
  const [theater] = useState(buildTheater());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const totalPrice = useMemo(() => selectedSeats.length * BASE_PRICE, [selectedSeats.length]);

  const toggleSeat = (seatId: string, isSold: boolean) => {
    if (isSold) return;

    setSelectedSeats((prev) => {
      let updated: string[];
      if (prev.includes(seatId)) {
        updated = prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= maxSeats) return prev;
        updated = [...prev, seatId];
      }

      onSeatsChange(updated, updated.length * BASE_PRICE);
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      {/* Screen */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-2 h-2 w-40 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40"></div>
        <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Screen</p>
      </div>

      {/* Seat Map */}
      <div className="glass-panel max-h-[420px] overflow-y-auto rounded-2xl border border-white/10 p-6 no-scrollbar">
        <div className="space-y-5">
          {theater.map((row) => (
            <div key={row.label} className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-white/70">{row.label}</span>
              <div className="grid w-full max-w-2xl grid-cols-10 gap-3">
                {row.positions.map((seat, idx) =>
                  seat ? (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={seat.isSold}
                      onClick={() => toggleSeat(seat.id, seat.isSold)}
                      className="focus:outline-none disabled:cursor-not-allowed"
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md border-2 text-[11px] font-semibold transition-all duration-200",
                          seat.isSold && "border-white/10 bg-white/10 text-white/30",
                          !seat.isSold &&
                            !selectedSeats.includes(seat.id) &&
                            "border-white/20 bg-white/5 text-white/80 hover:scale-110 hover:border-white/40 hover:bg-white/10",
                          selectedSeats.includes(seat.id) &&
                            "border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                        )}
                      >
                        {seat.number}
                      </div>
                    </button>
                  ) : (
                    <div key={`${row.label}-empty-${idx}`} className="h-8 w-8"></div>
                  )
                )}
              </div>
              {row.label !== "A" && <div className="h-2 w-1/2 rounded-full bg-white/5"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded border-2 border-white/20 bg-white/5"></span>
          <span className="text-white/70">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded border-2 border-blue-400 bg-blue-500"></span>
          <span className="text-white/70">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded border-2 border-white/10 bg-white/10"></span>
          <span className="text-white/70">Sold</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="glass-panel rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected
              </p>
              <p className="mt-1 text-xs text-white/70">
                {selectedSeats.sort().join(", ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-400">
                ₹{totalPrice.toLocaleString()}
              </p>
              <p className="text-xs text-white/60">₹{BASE_PRICE} per seat</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

