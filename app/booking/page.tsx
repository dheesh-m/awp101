"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Ticket, User, Mail, Phone, Calendar, Clock, Film, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookingSeatMap } from "@/components/booking-seat-map";
import { fetchMovies } from "@/lib/data-service";
import { formatCurrency } from "@/lib/utils";
import type { Movie } from "@/data/movies";

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [formData, setFormData] = useState({
    movieTitle: "",
    showDate: "",
    showTime: "",
    screen: "",
    seats: [] as string[],
    totalPrice: 0,
    customerName: "",
    customerEmail: "",
    customerPhone: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const screenOptions = ["Dolby Atmos", "Inox", "IMAX", "IMAX 4D"];

  useEffect(() => {
    const loadMovies = async () => {
      const movieList = await fetchMovies();
      setMovies(movieList);
      if (movieList.length > 0 && !formData.movieTitle) {
        setFormData((prev) => ({ ...prev, movieTitle: movieList[0].title }));
      }
    };
    loadMovies();
  }, []);

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setShowSuccess(true);
        setTimeout(() => {
          router.push(`/booking/summary?bookingId=${data.booking.id}`);
        }, 2000);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel rounded-2xl border border-green-400/50 bg-green-500/20 p-6"
          >
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Booking Successful!</h3>
                <p className="text-sm text-white/70">
                  Your tickets have been booked successfully. Redirecting to summary...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Book Your Tickets</h1>
          <p className="mt-2 text-white/70">Complete your booking in a few simple steps</p>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                step >= s
                  ? "border-purple-400 bg-purple-500/20 text-white"
                  : "border-white/20 text-white/40"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 w-16 transition-all duration-300 ${
                  step > s ? "bg-purple-400" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="glass-panel border-white/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Movie Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Select Movie & Showtime</h2>
                <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Film className="h-4 w-4 text-purple-400" />
                    Select Movie
                  </label>
                  <div className="relative">
                    <select
                      value={formData.movieTitle}
                      onChange={(e) => handleInputChange("movieTitle", e.target.value)}
                      required
                      className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 pr-10 text-sm text-white transition-all duration-300 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 hover:bg-white/10"
                    >
                      <option value="" className="bg-[#05030a] text-white">
                        Choose a movie...
                      </option>
                      {movies.map((movie) => (
                        <option
                          key={movie.id}
                          value={movie.title}
                          className="bg-[#05030a] text-white"
                        >
                          {movie.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  </div>
                  {formData.movieTitle && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xs text-white/60"
                    >
                      {movies.find((m) => m.title === formData.movieTitle)?.tagline}
                    </motion.p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">Date</label>
                    <Input
                      type="date"
                      value={formData.showDate}
                      onChange={(e) => handleInputChange("showDate", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">Time</label>
                    <Input
                      type="time"
                      value={formData.showTime}
                      onChange={(e) => handleInputChange("showTime", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Film className="h-4 w-4 text-purple-400" />
                    Screen
                  </label>
                  <div className="relative">
                    <select
                      value={formData.screen}
                      onChange={(e) => handleInputChange("screen", e.target.value)}
                      required
                      className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 pr-10 text-sm text-white transition-all duration-300 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 hover:bg-white/10"
                    >
                      <option value="" className="bg-[#05030a] text-white">
                        Select screen type...
                      </option>
                      {screenOptions.map((screen) => (
                        <option key={screen} value={screen} className="bg-[#05030a] text-white">
                          {screen}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Select Seats</label>
                  <BookingSeatMap
                    onSeatsChange={(seats, totalPrice) => {
                      handleInputChange("seats", seats);
                      handleInputChange("totalPrice", totalPrice);
                    }}
                    maxSeats={10}
                  />
                </div>
              </div>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={formData.seats.length === 0 || !formData.screen}
                  className="w-full shadow-glow-blue"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Customer Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Your Details</h2>
                <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 shadow-glow-blue"
                  >
                    Review & Confirm
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Review Your Booking</h2>
              <div className="space-y-4 rounded-2xl bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <Film className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Movie</p>
                    <p className="font-semibold text-white">{formData.movieTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Date & Time</p>
                    <p className="font-semibold text-white">
                      {formData.showDate} at {formData.showTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Film className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Screen</p>
                    <p className="font-semibold text-white">{formData.screen || "Not selected"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Seats</p>
                    <p className="font-semibold text-white">
                      {formData.seats.length > 0 ? formData.seats.sort().join(", ") : "No seats selected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Customer</p>
                    <p className="font-semibold text-white">{formData.customerName}</p>
                    <p className="text-xs text-white/50">{formData.customerEmail}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-white/60">
                    <span>Price Breakdown</span>
                    <span>₹280 × {formData.seats.length} seat{formData.seats.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-purple-400">
                      ₹{formData.totalPrice > 0 ? formData.totalPrice.toLocaleString() : "0"}
                    </span>
                  </div>
                </div>
              </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 shadow-glow-blue"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </Card>
    </div>
  );
}

