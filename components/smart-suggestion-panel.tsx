"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { preferenceOptions, type Movie, type PreferenceKey } from "@/data/movies";
import { getSmartSuggestion, type SmartSuggestion } from "@/lib/suggestions";
import { SmartSuggestionCard } from "@/components/smart-suggestion-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw, Brain, Sparkles } from "lucide-react";
import type { GenreHighlight } from "@/data/genreSpotlights";

interface SmartSuggestionPanelProps {
  movies: Movie[];
  genreHighlights?: GenreHighlight[];
}

interface GenreMovie {
  title: string;
  poster: string;
  rating: number;
}

export function SmartSuggestionPanel({ movies, genreHighlights = [] }: SmartSuggestionPanelProps) {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]?.slug ?? "");
  const [preferences, setPreferences] = useState<PreferenceKey[]>(["cheap", "lessCrowd"]);
  const [suggestion, setSuggestion] = useState<SmartSuggestion | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("Sci-Fi");
  const [genreMovies, setGenreMovies] = useState<GenreMovie[]>([]);
  const [loadingGenre, setLoadingGenre] = useState(false);

  useEffect(() => {
    const movie = movies.find((item) => item.slug === selectedMovie);
    if (movie) {
      setSuggestion(
        getSmartSuggestion({
          movie,
          preferences
        })
      );
    }
  }, [movies, selectedMovie, preferences]);

  const fetchGenreMovies = async (genre: string) => {
    setLoadingGenre(true);
    try {
      const response = await fetch(`/api/suggestions/genre?genre=${encodeURIComponent(genre)}`);
      const data = await response.json();
      setGenreMovies(data.movies || []);
    } catch (error) {
      console.error("Failed to fetch genre movies:", error);
    } finally {
      setLoadingGenre(false);
    }
  };

  useEffect(() => {
    fetchGenreMovies(selectedGenre);
  }, [selectedGenre]);

  const activeMovieTitle = useMemo(
    () => movies.find((movie) => movie.slug === selectedMovie)?.title ?? "",
    [movies, selectedMovie]
  );

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const genres = ["Sci-Fi", "Action", "Drama", "Romance", "Thriller", "Cyberpunk"];

  return (
    <section id="suggestions" className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Smart Engine</p>
        <h2 className="text-3xl font-semibold text-white">Smart Ticket Timing Suggestion</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Tell us how you like to watch movies and we predict the optimal day, time, price band, and
          crowd level using cinematic heuristics + network-based genre suggestions.
        </p>
      </header>

      {/* Genre-based Movie Suggestions */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6">
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Discover Movies by Genre</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGenre(genre)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                  selectedGenre === genre
                    ? "border-purple-400 bg-purple-500/20 text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                )}
              >
                {genre}
              </motion.button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fetchGenreMovies(selectedGenre)}
              disabled={loadingGenre}
              className="ml-auto"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loadingGenre ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {loadingGenre ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {genreMovies.map((movie, index) => (
              <motion.div
                key={movie.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel group flex flex-col items-center rounded-3xl border border-white/5 px-4 py-6"
              >
                <div
                  className="relative h-72 w-48 overflow-hidden rounded-[26px] border border-white/15 shadow-2xl"
                  style={{
                    backgroundImage: `linear-gradient(200deg, rgba(5,5,15,0) 20%, rgba(5,5,15,0.95) 100%), url(${movie.poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>
                <div className="mt-4 text-center">
                  <h4 className="text-lg font-semibold text-white">{movie.title}</h4>
                  <p className="text-sm text-white/70">Rating: {movie.rating}/10</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Original Smart Suggestion */}
      <div className="glass-panel flex flex-col gap-6 rounded-3xl border border-white/10 p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Pick a movie</p>
            <select
              value={selectedMovie}
              onChange={(event) => setSelectedMovie(event.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
            >
              {movies.map((movie) => (
                <option key={movie.id} value={movie.slug} className="bg-[#05030a] text-white">
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Preferences</p>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map((option) => {
                const active = preferences.includes(option.key);
                return (
                  <motion.button
                    key={option.key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePreference(option.key)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300",
                      active
                        ? "border-sky-400 bg-sky-500/20 text-white shadow-glow-blue"
                        : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                    )}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {suggestion && (
            <SmartSuggestionCard
              suggestion={suggestion}
              movieTitle={activeMovieTitle}
              preferences={preferences.map((pref) => preferenceOptions.find((p) => p.key === pref)?.label ?? pref)}
            />
          )}
        </AnimatePresence>
        {genreHighlights.length > 0 && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-300" />
              <p className="text-sm font-semibold text-white">
                Genre Spotlights <span className="text-white/60">(Rotten Tomatoes)</span>
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {genreHighlights.map((highlight) => (
                <div
                  key={`${highlight.genre}-${highlight.title}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-purple-400/40"
                >
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    {highlight.genre}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{highlight.title}</p>
                  <p className="text-sm text-emerald-300">Rotten Tomatoes • {highlight.rating}</p>
                  <p className="mt-2 text-sm text-white/65">{highlight.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
