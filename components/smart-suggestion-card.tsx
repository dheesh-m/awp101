"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Gauge, Users, Zap } from "lucide-react";
import type { SmartSuggestion } from "@/lib/suggestions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SmartSuggestionCardProps {
  suggestion: SmartSuggestion;
  movieTitle: string;
  preferences: string[];
}

const fastFillMap = {
  low: { label: "Low", className: "text-emerald-300" },
  medium: { label: "Medium", className: "text-yellow-300" },
  high: { label: "High", className: "text-rose-300" }
};

export function SmartSuggestionCard({
  suggestion,
  movieTitle,
  preferences
}: SmartSuggestionCardProps) {
  const fastFill = fastFillMap[suggestion.fastFill];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel w-full rounded-3xl border border-white/10 p-6 shadow-glow"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Smart Timing</p>
          <h3 className="text-2xl font-semibold text-white">Best plan for {movieTitle}</h3>
        </div>
        <Badge variant="sky">{preferences.join(" · ") || "Personalized"}</Badge>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Calendar className="h-4 w-4" />
            Best Day
          </div>
          <p className="mt-1 text-xl font-semibold text-white">
            {new Date(suggestion.bestDay).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric"
            })}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock className="h-4 w-4" />
            Showtime
          </div>
          <p className="mt-1 text-xl font-semibold text-white">{suggestion.bestTime}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Seat availability" value={`${suggestion.probability}%`} icon={Users} />
        <Metric label="Crowd score" value={`${suggestion.crowdScore}%`} icon={Gauge} />
        <Metric label="Price band" value={suggestion.priceRange} icon={Zap} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-white/70">Fast-fill chance</span>
        <span className={cn("font-semibold", fastFill.className)}>{fastFill.label}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/60">
        {suggestion.reasoning.map((reason, index) => (
          <li key={`${reason}-${index}`} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400/80" />
            {reason}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/40">
        <Icon className="h-4 w-4 text-purple-300" />
        {label}
      </div>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

