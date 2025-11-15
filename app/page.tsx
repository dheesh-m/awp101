import { fetchMovies } from "@/lib/data-service";
import { AnimatedSearchBar } from "@/components/animated-search-bar";
import { MovieCarousel } from "@/components/movie-carousel";
import { MovieGrid } from "@/components/movie-grid";
import { SmartSuggestionPanel } from "@/components/smart-suggestion-panel";
import { getGenreSpotlights } from "@/data/genreSpotlights";

export default async function HomePage() {
  const movies = await fetchMovies();
  const genreHighlights = getGenreSpotlights();

  return (
    <div className="space-y-14">
      <section className="space-y-6">
        <AnimatedSearchBar movies={movies} />
        <MovieCarousel movies={movies.slice(0, 3)} />
      </section>

      <section id="trend" className="space-y-6">
        <MovieGrid initialMovies={movies.slice(0, 6)} allMovies={movies} />
      </section>

      <SmartSuggestionPanel movies={movies} genreHighlights={genreHighlights} />
    </div>
  );
}

