import { NextResponse } from "next/server";
import { fetchMovieBySlug } from "@/lib/data-service";
import { getSmartSuggestion } from "@/lib/suggestions";

export async function POST(request: Request) {
  const body = await request.json();
  const movie = body.movieSlug ? await fetchMovieBySlug(body.movieSlug) : null;

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const suggestion = getSmartSuggestion({
    movie,
    preferences: body.preferences ?? [],
    seatsRequested: body.seatsRequested ?? 2
  });

  return NextResponse.json(suggestion);
}

