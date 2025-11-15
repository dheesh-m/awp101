import { NextRequest, NextResponse } from "next/server";

// Mock genre-based movie suggestions
// In production, integrate with TMDB API or similar
const genreMovies: Record<string, Array<{ title: string; poster: string; rating: number }>> = {
  "Sci-Fi": [
    {
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      rating: 8.6
    },
    {
      title: "The Matrix",
      poster: "/mat.jpeg",
      rating: 8.7
    },
    {
      title: "Blade Runner 2049",
      poster: "https://image.tmdb.org/t/p/w1280/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg",
      rating: 8.0
    }
  ],
  "Action": [
    { title: "Mad Max: Fury Road", poster: "https://image.tmdb.org/t/p/w1280/hA2ple9q4qnwxp3hKVNhroipsaEQ.jpg", rating: 8.1 },
    { title: "John Wick", poster: "https://image.tmdb.org/t/p/w1280/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg", rating: 7.4 },
    { title: "Dune", poster: "https://image.tmdb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", rating: 8.0 }
  ],
  "Drama": [
    { title: "The Shawshank Redemption", poster: "https://image.tmdb.org/t/p/w1280/9cqN61F9bK5x8RZc3qX9Ht8xJ5p.jpg", rating: 9.3 },
    { title: "Inception", poster: "https://image.tmdb.org/t/p/w1280/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", rating: 8.8 },
    { title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0 }
  ],
  "Romance": [
    { title: "La La Land", poster: "https://image.tmdb.org/t/p/w1280/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", rating: 8.0 },
    { title: "The Notebook", poster: "https://image.tmdb.org/t/p/w1280/rNzQyW4f8B8cQeg7Dg3h6TfxDmh.jpg", rating: 7.8 },
    { title: "Eternal Sunshine", poster: "https://image.tmdb.org/t/p/w1280/5MwkWH9tYHv3m2jE3L5vYgP8xK9.jpg", rating: 8.3 }
  ],
  "Thriller": [
    { title: "Se7en", poster: "https://image.tmdb.org/t/p/w1280/69Sns8WoET6CfaYlIkHbla4l7nC.jpg", rating: 8.6 },
    { title: "Shutter Island", poster: "https://image.tmdb.org/t/p/w1280/4GDy0PHYX3VRXUtwU5EM86yzqY7.jpg", rating: 8.2 },
    { title: "Gone Girl", poster: "https://image.tmdb.org/t/p/w1280/gdiLTof3rbPDAmPaCf4g6op46bj.jpg", rating: 8.1 }
  ],
  "Cyberpunk": [
    { title: "Ghost in the Shell", poster: "https://image.tmdb.org/t/p/w1280/myR2g0adQpF8Y4p3gZ8qJvK5v5L.jpg", rating: 7.5 },
    { title: "Akira", poster: "https://image.tmdb.org/t/p/w1280/5KlRFKKSbyCiyYpZSS3A6G5zW27.jpg", rating: 8.0 },
    { title: "Alita: Battle Angel", poster: "https://image.tmdb.org/t/p/w1280/xRWht48C2V8XNfzvPehyClOvDni.jpg", rating: 7.3 }
  ]
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "Sci-Fi";

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const movies = genreMovies[genre] || genreMovies["Sci-Fi"];
  const shuffled = [...movies].sort(() => Math.random() - 0.5);

  return NextResponse.json({
    genre,
    movies: shuffled.slice(0, 3),
    message: `Top ${genre} recommendations for you`
  });
}

