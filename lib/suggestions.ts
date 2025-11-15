import { differenceInCalendarDays, isWeekend, parseISO } from "date-fns";
import type { Movie, PreferenceKey } from "@/data/movies";

export interface SmartSuggestionInput {
  movie: Movie;
  preferences: PreferenceKey[];
  seatsRequested?: number;
}

export interface SmartSuggestion {
  bestDay: string;
  bestTime: string;
  probability: number;
  crowdScore: number;
  priceRange: string;
  fastFill: "low" | "medium" | "high";
  reasoning: string[];
}

const MORNING_WINDOW = ["AM", "08", "09", "10", "11"];

const getBaseAvailability = (movie: Movie) => {
  const totalSeats = movie.seatMap.reduce((acc, row) => acc + row.seats.length, 0);
  const reserved = movie.seatMap
    .map((row) => row.seats.filter((seat) => seat.status === "reserved").length)
    .reduce((a, b) => a + b, 0);

  return ((totalSeats - reserved) / totalSeats) * 100;
};

const computeFastFill = (movie: Movie, timeLabel: string) => {
  const isEvening = timeLabel.includes("PM") && !timeLabel.startsWith("12");
  const daysFromRelease = Math.abs(differenceInCalendarDays(new Date(), parseISO(movie.releaseDate)));

  if (movie.trendScore > 90 && isEvening && daysFromRelease <= 5) {
    return "high";
  }

  if (movie.trendScore > 80 && (isEvening || daysFromRelease <= 10)) {
    return "medium";
  }

  return "low";
};

const formatRange = (price: number) => {
  const lower = Math.max(price - 2, 8);
  const upper = price + (price > 15 ? 3 : 2);
  return `$${lower.toFixed(2)} - $${upper.toFixed(2)}`;
};

const isMorning = (label: string) =>
  MORNING_WINDOW.some((token) => label.toUpperCase().includes(token)) ||
  /(?:0[6-9]|1[0-1]):\d{2}/.test(label);

const preferenceWeights: Record<PreferenceKey, number> = {
  cheap: 18,
  lessCrowd: 14,
  closest: 16,
  morning: 12,
  weekend: 10,
  group: 12
};

export const getSmartSuggestion = ({
  movie,
  preferences,
  seatsRequested = 2
}: SmartSuggestionInput): SmartSuggestion => {
  const availabilityBaseline = getBaseAvailability(movie);

  let bestScore = -Infinity;
  let suggestion: SmartSuggestion | null = null;

  movie.showtimes.forEach((day) => {
    day.times.forEach((timeSlot) => {
      let score = 50;
      const reasoning: string[] = [];
      const dateObj = parseISO(day.date);

      if (preferences.includes("cheap")) {
        if (timeSlot.price <= 12) {
          score += preferenceWeights.cheap;
          reasoning.push("Morning + weekday shows have the lowest price bands.");
        } else {
          score -= 6;
        }
      }

      if (preferences.includes("lessCrowd")) {
        if (!isWeekend(dateObj) && isMorning(timeSlot.label)) {
          score += preferenceWeights.lessCrowd;
          reasoning.push("Weekday mornings statistically carry the lightest crowd.");
        } else {
          score -= 5;
        }
      }

      if (preferences.includes("closest")) {
        const diff = differenceInCalendarDays(dateObj, new Date());
        score += Math.max(0, preferenceWeights.closest - diff * 4);
        reasoning.push("Closely upcoming shows keep your plan nimble.");
      }

      if (preferences.includes("morning")) {
        if (isMorning(timeSlot.label)) {
          score += preferenceWeights.morning;
          reasoning.push("Morning windows reduce surge pricing and noise.");
        } else {
          score -= 4;
        }
      }

      if (preferences.includes("weekend")) {
        if (isWeekend(dateObj)) {
          score += preferenceWeights.weekend;
          reasoning.push("Weekend slots line up with your calendar.");
        } else {
          score -= 8;
        }
      } else if (!preferences.includes("lessCrowd") && !isWeekend(dateObj)) {
        score += 6;
      }

      if (preferences.includes("group")) {
        if (availabilityBaseline > 55 && seatsRequested >= 5) {
          score += preferenceWeights.group;
          reasoning.push("High seat pool increases the odds of finding 5 seats together.");
        } else {
          score -= 3;
        }
      }

      if (movie.trendScore > 90 && timeSlot.label.includes("PM")) {
        score -= 5; // evenings fill quicker for trending titles
      }

      if (score > bestScore) {
        bestScore = score;
        suggestion = {
          bestDay: day.date,
          bestTime: timeSlot.label,
          probability: Math.min(98, Math.round((availabilityBaseline + score) / 2)),
          crowdScore: Math.max(25, Math.min(95, 100 - score + 20)),
          priceRange: formatRange(timeSlot.price),
          fastFill: computeFastFill(movie, timeSlot.label),
          reasoning
        };
      }
    });
  });

  if (!suggestion) {
    throw new Error("No suggestions available.");
  }

  return suggestion;
};

