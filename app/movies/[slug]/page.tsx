import { notFound } from "next/navigation";
import { fetchMovieBySlug, fetchMovies } from "@/lib/data-service";
import { MovieDetailsContent } from "@/components/movie-details-content";

interface MovieDetailsPageProps {
  params: { slug: string };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movie = await fetchMovieBySlug(params.slug);

  if (!movie) {
    notFound();
  }

  return <MovieDetailsContent movie={movie} />;
}

export async function generateStaticParams() {
  const movies = await fetchMovies();
  return movies.map((movie) => ({ slug: movie.slug }));
}

