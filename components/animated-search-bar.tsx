"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import type { Movie } from "@/data/movies";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AnimatedSearchBarProps {
  movies: Movie[];
}

export function AnimatedSearchBar({ movies }: AnimatedSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    return movies
      .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [movies, query]);

  return (
    <div className="relative w-full">
      <div className="glass-panel flex items-center gap-3 rounded-full border border-white/10 px-4 py-2">
        <Search className="h-5 w-5 text-white/50" />
        <Input
          placeholder="Search movies, genres, vibes..."
          className="border-none bg-transparent text-base outline-none placeholder:text-white/40"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && results[0]) {
              router.push(`/movies/${results[0].slug}`);
            }
          }}
        />
        <Badge className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider">
          <Sparkles className="h-3 w-3 text-purple-300" />
          Auto Suggest
        </Badge>
      </div>
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-3 w-full space-y-2 rounded-2xl border border-white/10 bg-[#090818] p-3 shadow-2xl"
          >
            {results.length === 0 && (
              <p className="px-3 py-2 text-sm text-white/50">No matches yet. Try another vibe.</p>
            )}
            {results.map((movie) => (
              <button
                key={movie.id}
                className="w-full rounded-xl border border-transparent px-3 py-2 text-left transition hover:border-white/20 hover:bg-white/5"
                onClick={() => router.push(`/movies/${movie.slug}`)}
              >
                <p className="text-sm font-semibold text-white">{movie.title}</p>
                <p className="text-xs text-white/50">
                  {movie.genres.join(" • ")} · {movie.rating}
                </p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

