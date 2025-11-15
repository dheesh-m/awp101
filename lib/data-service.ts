import { cache } from "react";
import { movies, movieMap, type Movie } from "@/data/movies";
import { supabase } from "./supabaseClient";

export const fetchMovies = cache(async (): Promise<Movie[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("releaseDate", { ascending: false });

    if (!error && data) {
      return data as Movie[];
    }
  }

  return movies;
});

export const fetchMovieBySlug = cache(async (slug: string): Promise<Movie | undefined> => {
  if (supabase) {
    const { data } = await supabase.from("movies").select("*").eq("slug", slug).single();
    if (data) {
      return data as Movie;
    }
  }

  return movieMap[slug];
});

