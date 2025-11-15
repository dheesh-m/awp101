"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/data/movies";

interface MovieGridProps {
  initialMovies: Movie[];
  allMovies: Movie[];
}

export function MovieGrid({ initialMovies, allMovies }: MovieGridProps) {
  const [displayedMovies, setDisplayedMovies] = useState(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const currentCount = displayedMovies.length;
      const nextMovies = allMovies.slice(currentCount, currentCount + 3);
      if (nextMovies.length > 0) {
        setDisplayedMovies([...displayedMovies, ...nextMovies]);
      }
      setIsLoading(false);
    }, 500);
  };

  const loadNewMovies = () => {
    setIsLoading(true);
    // Shuffle and get new movies
    setTimeout(() => {
      const shuffled = [...allMovies].sort(() => Math.random() - 0.5);
      setDisplayedMovies(shuffled.slice(0, displayedMovies.length));
      setIsLoading(false);
    }, 500);
  };

  const hasMore = displayedMovies.length < allMovies.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Trending</p>
          <h2 className="text-3xl font-semibold text-white">Now Booking</h2>
          <p className="mt-2 text-white/70">
            Neon-styled cards, dynamic ratings, and trend heat per movie.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={loadNewMovies}
          disabled={isLoading}
          className="transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          New Movies
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="secondary"
            className="transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Movies"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

