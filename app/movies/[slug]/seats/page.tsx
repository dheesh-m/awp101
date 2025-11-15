import { notFound } from "next/navigation";
import { fetchMovieBySlug } from "@/lib/data-service";
import { SeatSelectionContent } from "@/components/seat-selection-content";

interface SeatSelectionPageProps {
  params: { slug: string };
  searchParams: { date?: string; time?: string; price?: string; screen?: string };
}

export default async function SeatSelectionPage({ params, searchParams }: SeatSelectionPageProps) {
  const movie = await fetchMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <SeatSelectionContent
      movie={movie}
      date={searchParams.date}
      time={searchParams.time}
      price={searchParams.price ? Number(searchParams.price) : undefined}
      screen={searchParams.screen}
    />
  );
}

