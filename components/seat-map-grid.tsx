"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";

export type SeatStatus = "available" | "selected" | "sold" | "accessible";

export interface Seat {
  id: string;
  number: number;
  status: SeatStatus;
  isAccessible?: boolean;
}

export interface SeatRow {
  label: string;
  seats: Seat[];
  price: number;
  tier: string;
}

interface SeatMapGridProps {
  maxSelectable?: number;
  onSelectionChange?: (seatIds: string[], totalPrice: number) => void;
}

// Generate seat map with pricing tiers similar to the reference
const generateSeatMap = (): SeatRow[] => {
  const rows: SeatRow[] = [];

  // Recliner Rows (₹630) - Row N
  rows.push({
    label: "N",
    tier: "RECLINER",
    price: 630,
    seats: [
      { id: "N-01", number: 1, status: "accessible", isAccessible: true },
      { id: "N-02", number: 2, status: "accessible", isAccessible: true },
      { id: "N-03", number: 3, status: "sold" },
      { id: "N-04", number: 4, status: "sold" },
      { id: "N-05", number: 5, status: "sold" },
      { id: "N-06", number: 6, status: "sold" },
      { id: "N-07", number: 7, status: "sold" },
      { id: "N-08", number: 8, status: "available" },
      { id: "N-09", number: 9, status: "available" },
      { id: "N-10", number: 10, status: "available" },
      { id: "N-11", number: 11, status: "sold" },
      { id: "N-12", number: 12, status: "sold" },
      { id: "N-13", number: 13, status: "sold" },
      { id: "N-14", number: 14, status: "sold" },
      { id: "N-15", number: 15, status: "accessible", isAccessible: true },
      { id: "N-16", number: 16, status: "accessible", isAccessible: true }
    ]
  });

  // Prime Rows (₹350) - Rows M, L, K, J, H
  const primeRows = ["M", "L", "K", "J", "H"];
  primeRows.forEach((label) => {
    const seats: Seat[] = [];
    for (let i = 1; i <= 21; i++) {
      let status: SeatStatus = "available";
      if (i <= 3 || i >= 17) {
        status = "available";
      } else {
        status = "sold";
      }
      seats.push({ id: `${label}-${i}`, number: i, status });
    }
    rows.push({
      label,
      tier: "PRIME",
      price: 350,
      seats
    });
  });

  // Classic Plus Rows (₹290) - Rows G, F, E, D, C
  const classicPlusRows = ["G", "F", "E", "D", "C"];
  classicPlusRows.forEach((label, index) => {
    const seats: Seat[] = [];
    for (let i = 1; i <= 17; i++) {
      let status: SeatStatus = "available";
      if (index < 2) {
        // Rows G and F
        if (i <= 7 || i >= 16) {
          status = "sold";
        } else {
          status = "sold";
        }
        if (i === 16 || i === 17) {
          status = "available";
        }
      } else {
        // Rows E, D, C
        status = "available";
      }
      seats.push({ id: `${label}-${i}`, number: i, status });
    }
    rows.push({
      label,
      tier: "CLASSIC PLUS",
      price: 290,
      seats
    });
  });

  // Classic Rows (₹250) - Rows B, A
  const classicRows = ["B", "A"];
  classicRows.forEach((label) => {
    const seats: Seat[] = [];
    for (let i = 1; i <= 20; i++) {
      seats.push({ id: `${label}-${i}`, number: i, status: "sold" });
    }
    rows.push({
      label,
      tier: "CLASSIC",
      price: 250,
      seats
    });
  });

  return rows;
};

export function SeatMapGrid({ maxSelectable = 8, onSelectionChange }: SeatMapGridProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [seatMap] = useState<SeatRow[]>(generateSeatMap());
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const targetRow = seatMap.find((row) => row.seats.some((seat) => seat.status === "available"));
    const node = targetRow ? rowRefs.current.get(targetRow.label) : null;
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [seatMap]);

  useEffect(() => {
    const totalPrice = selected.reduce((sum, seatId) => {
      const row = seatMap.find((r) => r.seats.some((s) => s.id === seatId));
      return sum + (row?.price || 0);
    }, 0);
    onSelectionChange?.(selected, totalPrice);
  }, [selected, seatMap, onSelectionChange]);

  const toggleSeat = (seatId: string, status: SeatStatus) => {
    if (status === "sold") return;

    setSelected((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= maxSelectable) return prev;
      return [...prev, seatId];
    });
  };

  const getSeatStatus = (seat: Seat): SeatStatus => {
    if (selected.includes(seat.id)) return "selected";
    return seat.status;
  };

  const legend = useMemo(
    () => [
      { label: "Available", className: "border-green-400/60 bg-transparent" },
      { label: "Selected", className: "bg-green-500 border-green-400" },
      { label: "Sold", className: "bg-white/20 border-white/10" }
    ],
    []
  );

  const tierGroups = useMemo(() => {
    const groups: Record<string, SeatRow[]> = {};
    seatMap.forEach((row) => {
      if (!groups[row.tier]) {
        groups[row.tier] = [];
      }
      groups[row.tier].push(row);
    });
    return groups;
  }, [seatMap]);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={cn("h-5 w-5 rounded border-2", item.className)}></span>
            <span className="text-white/70">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Screen */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40"></div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Screen</p>
        </div>

        {/* Seat Map */}
        <div className="max-h-[600px] space-y-6 overflow-y-auto pr-2 no-scrollbar">
          {Object.entries(tierGroups).map(([tier, rows]) => {
            const price = rows[0]?.price || 0;
            return (
              <div key={tier} className="space-y-3">
                {/* Tier Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <p className="text-sm font-bold text-white">
                    ₹{price} {tier} ROWS
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Rows */}
                <div className="space-y-2">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      ref={(node) => {
                        if (node) {
                          rowRefs.current.set(row.label, node);
                        }
                      }}
                      className="flex items-center gap-3"
                    >
                      {/* Row Label */}
                      <span className="w-8 text-center text-sm font-semibold text-white/60">
                        {row.label}
                      </span>

                      {/* Seats */}
                      <div className="flex flex-1 flex-wrap gap-1.5">
                        {row.seats.map((seat) => {
                          const status = getSeatStatus(seat);
                          const isSelected = status === "selected";
                          const isSold = status === "sold";
                          const isAvailable = status === "available";
                          const isAccessible = seat.isAccessible;

                          return (
                            <motion.button
                              key={seat.id}
                              whileHover={!isSold ? { scale: 1.1 } : {}}
                              whileTap={!isSold ? { scale: 0.95 } : {}}
                              disabled={isSold}
                              onClick={() => toggleSeat(seat.id, seat.status)}
                              className={cn(
                                "relative flex h-8 w-8 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all duration-200",
                                isSold &&
                                  "cursor-not-allowed border-white/10 bg-white/10 text-white/30",
                                isAvailable &&
                                  !isAccessible &&
                                  "border-green-400/60 bg-transparent text-white/80 hover:border-green-400 hover:bg-green-400/20",
                                isAccessible &&
                                  isAvailable &&
                                  "border-cyan-400/60 bg-cyan-400/10 text-cyan-300",
                                isSelected &&
                                  "border-green-400 bg-green-500 text-white shadow-lg shadow-green-500/50"
                              )}
                            >
                              {isAccessible ? (
                                <Accessibility className="h-4 w-4" />
                              ) : (
                                seat.number
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl border border-green-400/30 bg-green-500/10 p-4"
        >
          <p className="text-sm font-semibold text-white">
            {selected.length} seat{selected.length > 1 ? "s" : ""} selected
          </p>
          <p className="mt-1 text-xs text-white/70">
            {selected
              .map((id) => {
                const row = seatMap.find((r) => r.seats.some((s) => s.id === id));
                const seat = row?.seats.find((s) => s.id === id);
                return `${row?.label}${seat?.number}`;
              })
              .join(", ")}
          </p>
        </motion.div>
      )}
    </div>
  );
}
