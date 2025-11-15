import { BookingSummary } from "@/components/booking-summary";
import { fetchMovieBySlug } from "@/lib/data-service";
import type { Movie } from "@/data/movies";

interface BookingSummaryPageProps {
  searchParams: {
    bookingId?: string;
    movie?: string;
    title?: string;
    date?: string;
    time?: string;
    seats?: string;
    screen?: string;
    total?: string;
  };
}

export default async function BookingSummaryPage({ searchParams }: BookingSummaryPageProps) {
  const movieSlug = searchParams.movie?.trim();
  const requestedMovie = movieSlug ? await fetchMovieBySlug(movieSlug) : undefined;
  const movie: Movie | undefined = requestedMovie ?? (await fetchMovieBySlug("spectrum-eclipse"));

  const seats = searchParams.seats?.split(",").filter(Boolean) ?? ["A1", "A2"];
  const defaultPrice = movie?.showtimes?.[0]?.times?.[0]?.price ?? 15;
  const total = Number(searchParams.total ?? defaultPrice) * (seats.length || 1);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Booking Summary</p>
        <h1 className="text-3xl font-semibold text-white">Ready to roll the credits</h1>
      </div>
      <BookingSummary
        movieTitle={searchParams.title ?? movie?.title ?? "Neon Feature"}
        showDate={searchParams.date ?? movie?.showtimes?.[0]?.date ?? new Date().toISOString()}
        showTime={searchParams.time ?? movie?.showtimes?.[0]?.times?.[0]?.label ?? "07:30 PM"}
        seats={seats}
        experience={searchParams.screen ?? movie?.showtimes?.[0]?.times?.[0]?.screen ?? "Dolby Atmos"}
        total={total}
      />
    </section>
  );
}

