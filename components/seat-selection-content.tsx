"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SeatMapGrid, type SeatRow } from "@/components/seat-map-grid";
import type { Movie } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

// This matches the seat map structure
const getSeatMapData = (): SeatRow[] => {
  const rows: SeatRow[] = [];
  
  // Recliner
  rows.push({ label: "N", tier: "RECLINER", price: 630, seats: [] });
  
  // Prime
  ["M", "L", "K", "J", "H"].forEach((label) => {
    rows.push({ label, tier: "PRIME", price: 350, seats: [] });
  });
  
  // Classic Plus
  ["G", "F", "E", "D", "C"].forEach((label) => {
    rows.push({ label, tier: "CLASSIC PLUS", price: 290, seats: [] });
  });
  
  // Classic
  ["B", "A"].forEach((label) => {
    rows.push({ label, tier: "CLASSIC", price: 250, seats: [] });
  });
  
  return rows;
};

interface SeatSelectionContentProps {
  movie: Movie;
  date?: string;
  time?: string;
  price?: number;
  screen?: string;
}

export function SeatSelectionContent({
  movie,
  date,
  time,
  price = movie.showtimes[0].times[0].price,
  screen = movie.showtimes[0].times[0].screen
}: SeatSelectionContentProps) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const seatMapData = useMemo(() => getSeatMapData(), []);
  
  const subTotal = useMemo(() => totalPrice || selectedSeats.length * price, [selectedSeats, price, totalPrice]);
  
  const priceBreakdown = useMemo(() => {
    const breakdown: Record<string, { count: number; price: number }> = {};
    selectedSeats.forEach((seatId) => {
      const rowLabel = seatId.split("-")[0];
      const row = seatMapData.find((r) => r.label === rowLabel);
      if (row) {
        const key = `${row.tier} (₹${row.price})`;
        if (!breakdown[key]) {
          breakdown[key] = { count: 0, price: row.price };
        }
        breakdown[key].count++;
      }
    });
    return breakdown;
  }, [selectedSeats, seatMapData]);

  const handleProceed = () => {
    const params = new URLSearchParams({
      movie: movie.slug,
      title: movie.title,
      date: date ?? movie.showtimes[0].date,
      time: time ?? movie.showtimes[0].times[0].label,
      screen,
      seats: selectedSeats.join(","),
      total: subTotal.toString()
    });
    router.push(`/booking/summary?${params.toString()}`);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <SeatMapGrid
        onSelectionChange={(seats, total) => {
          setSelectedSeats(seats);
          setTotalPrice(total);
        }}
        maxSelectable={8}
      />
      <div className="glass-panel flex flex-col gap-5 rounded-3xl border border-white/10 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Booking</p>
          <h2 className="text-2xl font-semibold text-white">{movie.title}</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <p>
            {date ?? movie.showtimes[0].date} · {time ?? movie.showtimes[0].times[0].label}
          </p>
          <p className="text-white/50">{screen}</p>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <div className="flex items-center justify-between text-white/70">
            <span>Seats ({selectedSeats.length})</span>
            <span className="text-white font-medium">
              {selectedSeats.length > 0
                ? selectedSeats
                    .map((id) => {
                      const parts = id.split("-");
                      return `${parts[0]}${parts[1]}`;
                    })
                    .join(", ")
                : "Pick seats"}
            </span>
          </div>
          {selectedSeats.length > 0 && Object.keys(priceBreakdown).length > 0 && (
            <div className="space-y-1 border-t border-white/10 pt-2 text-xs text-white/60">
              {Object.entries(priceBreakdown).map(([tier, data]) => (
                <div key={tier} className="flex justify-between">
                  <span>{tier} × {data.count}</span>
                  <span>₹{(data.price * data.count).toFixed(0)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base">
            <span className="font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-purple-400">
              ₹{subTotal.toFixed(0)}
            </span>
          </div>
        </div>
        <Button onClick={handleProceed} disabled={selectedSeats.length === 0}>
          Continue to summary
        </Button>
      </div>
    </section>
  );
}

