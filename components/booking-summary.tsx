"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { formatCurrency } from "@/lib/utils";

interface BookingSummaryProps {
  movieTitle: string;
  showDate: string;
  showTime: string;
  seats: string[];
  experience: string;
  total: number;
}

export function BookingSummary({
  movieTitle,
  showDate,
  showTime,
  seats,
  experience,
  total
}: BookingSummaryProps) {
  const fees = total * 0.08;
  const finalAmount = total + fees;
  const qrValue = JSON.stringify({ movieTitle, showDate, showTime, seats, experience, finalAmount });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel grid gap-6 rounded-3xl border border-white/10 p-6 shadow-glow lg:grid-cols-[1.2fr_0.8fr]"
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Booking summary</p>
          <h2 className="text-2xl font-semibold text-white">{movieTitle}</h2>
        </div>
        <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
          <Info label="Date" value={new Date(showDate).toLocaleDateString()} />
          <Info label="Time" value={showTime} />
          <Info label="Experience" value={experience} />
          <Info label="Seats" value={seats.join(", ")} />
        </div>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <PriceRow label="Tickets" value={formatCurrency(total)} />
          <PriceRow label="Experience fee (8%)" value={formatCurrency(fees)} />
          <PriceRow label="Total" value={formatCurrency(finalAmount)} highlight />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-[#0c0b1a] p-6 text-center">
        <QRCode value={qrValue} bgColor="#0c0b1a" fgColor="#f8fafc" size={160} />
        <p className="text-sm text-white/60">Save this pass or tap to download.</p>
        <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20">
          Download Ticket
        </button>
      </div>
    </motion.div>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
    <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
    <p className="text-base text-white">{value}</p>
  </div>
);

const PriceRow = ({
  label,
  value,
  highlight
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span className={highlight ? "text-white" : "text-white/70"}>{label}</span>
    <span className={highlight ? "text-xl font-semibold text-white" : ""}>{value}</span>
  </div>
);

