"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Movie } from "@/data/movies";
import { ShowtimeSelector } from "@/components/showtime-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MovieDetailsContent({ movie }: { movie: Movie }) {
  const [slot, setSlot] = useState(() => ({
    date: movie.showtimes[0].date,
    time: movie.showtimes[0].times[0].label,
    price: movie.showtimes[0].times[0].price,
    screen: movie.showtimes[0].times[0].screen
  }));

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge variant="sky" className="text-xs uppercase tracking-[0.35em] text-white">
            {movie.rating} • {movie.runtime} mins • {movie.genres.join(" / ")}
          </Badge>
          <h1 className="text-4xl font-semibold text-white">{movie.title}</h1>
          <p className="text-lg text-white/70">{movie.synopsis}</p>
          <div className="flex flex-wrap gap-2">
            {movie.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">Release</p>
              <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">Rating</p>
              <p>{movie.voteAverage}/10</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">Trend score</p>
              <p>{movie.trendScore}% heat</p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40"
        >
          <iframe
            src={movie.trailerUrl}
            title={`${movie.title} trailer`}
            className="h-72 w-full rounded-3xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Image
            src={movie.poster}
            alt={movie.title}
            width={220}
            height={320}
            className="absolute -bottom-8 -left-8 hidden rounded-3xl border border-white/10 shadow-2xl sm:block"
          />
        </motion.div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-white">Showtimes</h3>
          <div className="text-sm text-white/60">
            Selected: {slot.date} · {slot.time} · {slot.screen}
          </div>
        </div>
        <ShowtimeSelector
          showtimes={movie.showtimes}
          onSlotChange={(payload) => setSlot(payload)}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="text-sm text-white/70">
            Price from <span className="text-white">${slot.price.toFixed(2)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" asChild>
              <a href={movie.trailerUrl} target="_blank" rel="noreferrer">
                Watch Trailer
              </a>
            </Button>
            <Button asChild>
              <Link
                href={`/movies/${movie.slug}/seats?date=${slot.date}&time=${encodeURIComponent(
                  slot.time
                )}&price=${slot.price}&screen=${encodeURIComponent(slot.screen)}`}
              >
                Pick Seats
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Cast</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movie.cast.map((actor) => (
            <motion.div
              key={actor.name}
              whileHover={{ y: -4 }}
              className="glass-panel flex items-center gap-4 rounded-3xl border border-white/10 p-4"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10">
                <Image src={actor.avatar} alt={actor.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-white">{actor.name}</p>
                <p className="text-sm text-white/60">{actor.character}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

