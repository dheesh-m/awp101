// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React from "react";
import { Star, Clock } from "lucide-react";
import type { Movie } from "@/data/movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MotionDiv: React.FC<HTMLMotionProps<"div">> = motion.div;

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 shadow-glow transition-all duration-500"
    >
      <div
        className="relative h-64 overflow-hidden rounded-3xl border border-white/5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(3,3,10,0) 30%, rgba(3,3,10,0.92) 100%), url(${movie.backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <MotionDiv
          whileHover={{ scale: 1.15, y: -15, rotate: 2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-6 right-6 z-10"
        >
          <div className="relative h-52 w-36 overflow-hidden rounded-2xl border-2 border-white/30 shadow-2xl shadow-black/70 ring-2 ring-white/10">
            <Image
              src={movie.poster}
              alt={`${movie.title} poster`}
              fill
              className="object-cover"
              sizes="144px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <MotionDiv
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button asChild size="lg" className="shadow-glow-blue">
              <Link href={`/movies/${movie.slug}`}>View Details</Link>
            </Button>
          </MotionDiv>
        </MotionDiv>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <Badge variant="default">#{movie.trendScore} Trend</Badge>
          <Badge variant="sky" className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-300" />
            {movie.voteAverage}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-purple-300">
            {movie.title}
          </h3>
          <p className="mt-1 text-sm font-medium italic text-white/70 leading-relaxed">
            {movie.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/60">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
            <Clock className="h-3 w-3" />
            {movie.runtime}m
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">{movie.rating}</span>
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="rounded-full bg-white/5 px-3 py-1">
              {genre}
            </span>
          ))}
        </div>
        <p className="line-clamp-3 text-sm text-white/70">{movie.synopsis}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-xs text-white/50">
            Next show · {movie.showtimes[0]?.times[0]?.label ?? "TBA"}
          </div>
          <Button asChild size="sm">
            <Link href={`/movies/${movie.slug}`}>Details</Link>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
}

