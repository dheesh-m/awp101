"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { Movie } from "@/data/movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMovie = movies[activeIndex];

  const handleNavigate = (direction: "prev" | "next") => {
    setActiveIndex((prev) => {
      const nextIndex = direction === "next" ? prev + 1 : prev - 1;
      if (nextIndex >= movies.length) return 0;
      if (nextIndex < 0) return movies.length - 1;
      return nextIndex;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#120623] via-[#08040f] to-[#05030a] p-8 shadow-2xl">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-5">
          <Badge variant="sky" className="text-xs uppercase tracking-[0.25em] text-white">
            Featured
          </Badge>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMovie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                {activeMovie.title}
              </h1>
              <p className="text-white/70">{activeMovie.tagline}</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <span>{activeMovie.rating}</span>
                <span>•</span>
                <span>{activeMovie.runtime} min</span>
                <span>•</span>
                <span>{activeMovie.genres.join(" / ")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeMovie.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link href={`/movies/${activeMovie.slug}`} className="flex items-center gap-2">
                    Book Tickets
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <a href={activeMovie.trailerUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <Play className="h-4 w-4" /> Watch Trailer
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="hidden justify-between text-sm text-white/60 lg:flex">
            <p>Fast-fill chance · {activeMovie.trendScore > 85 ? "High" : "Stable"}</p>
            <p>Critic score · {activeMovie.voteAverage}/10</p>
          </div>
        </div>
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMovie.poster}
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative h-[420px] overflow-hidden rounded-3xl"
            >
              <Image
                src={activeMovie.backdrop}
                alt={activeMovie.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#05030af5] via-transparent to-[#05030af5]" />
              <Image
                src={activeMovie.poster}
                alt={`${activeMovie.title} poster`}
                width={320}
                height={420}
                className="absolute bottom-8 right-6 rounded-3xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-4">
            <button
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/10"
              onClick={() => handleNavigate("prev")}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/10"
              onClick={() => handleNavigate("next")}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

