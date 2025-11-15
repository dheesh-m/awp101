export type SeatStatus = "available" | "reserved" | "vip" | "accessible";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

export interface SeatRow {
  label: string;
  seats: Seat[];
}

export interface Showtime {
  date: string;
  times: {
    label: string;
    price: number;
    screen: string;
    isPremium?: boolean;
  }[];
}

export interface CastMember {
  name: string;
  character: string;
  avatar: string;
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  rating: string;
  runtime: number;
  releaseDate: string;
  genres: string[];
  voteAverage: number;
  trendScore: number;
  synopsis: string;
  poster: string;
  backdrop: string;
  trailerUrl: string;
  cast: CastMember[];
  showtimes: Showtime[];
  tags: string[];
  seatMap: SeatRow[];
}

const generateSeatRow = (row: string, reserved: number[] = [], vip = false): SeatRow => ({
  label: row,
  seats: Array.from({ length: 12 }, (_, idx) => ({
    id: `${row}${idx + 1}`,
    row,
    number: idx + 1,
    status: reserved.includes(idx + 1) ? "reserved" : vip ? "vip" : "available"
  }))
});

const sharedSeatMap = [
  generateSeatRow("A", [3, 4, 5]),
  generateSeatRow("B", [1, 8]),
  generateSeatRow("C"),
  generateSeatRow("D", [10, 11, 12], true),
  generateSeatRow("E", [2, 3], true),
  generateSeatRow("F"),
  generateSeatRow("G", [6, 7]),
  generateSeatRow("H")
];

export const movies: Movie[] = [
  {
    id: "mv-01",
    slug: "transformers-rise-of-the-beasts",
    title: "Transformers: Rise of the Beasts",
    tagline: "More than meets the eye. The ultimate battle begins.",
    rating: "PG-13",
    runtime: 127,
    releaseDate: "2023-06-09",
    genres: ["Action", "Sci-Fi", "Adventure"],
    voteAverage: 9.2,
    trendScore: 95,
    synopsis:
      "Return to the action and spectacle of Transformers with Rise of the Beasts. When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction of Transformers known as the Maximals to save Earth. An epic battle between good and evil unfolds in this explosive adventure that pushes the boundaries of visual effects and storytelling.",
    poster: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    backdrop: "/trans.jpeg",
    trailerUrl: "https://www.youtube.com/embed/itnqEauWQZM",
    cast: [
      {
        name: "Anthony Ramos",
        character: "Noah Diaz",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Dominique Fishback",
        character: "Elena Wallace",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Peter Cullen",
        character: "Optimus Prime (Voice)",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
      }
    ],
    showtimes: [
      {
        date: "2025-11-15",
        times: [
          { label: "09:30 AM", price: 12.5, screen: "IMAX Laser", isPremium: true },
          { label: "01:00 PM", price: 14.5, screen: "Dolby Atmos" },
          { label: "06:30 PM", price: 19.5, screen: "IMAX Laser", isPremium: true },
          { label: "10:15 PM", price: 17.5, screen: "Neon Club" }
        ]
      },
      {
        date: "2025-11-16",
        times: [
          { label: "10:15 AM", price: 12, screen: "IMAX Laser", isPremium: true },
          { label: "02:30 PM", price: 14, screen: "Dolby Atmos" },
          { label: "08:00 PM", price: 19.9, screen: "IMAX Laser", isPremium: true }
        ]
      },
      {
        date: "2025-11-17",
        times: [
          { label: "11:00 AM", price: 11.5, screen: "Studio 4" },
          { label: "04:15 PM", price: 14.2, screen: "Dolby Atmos" }
        ]
      }
    ],
    tags: ["Blockbuster", "IMAX", "4K Ultra HD"],
    seatMap: sharedSeatMap
  },
  {
    id: "mv-02",
    slug: "avengers-endgame",
    title: "Avengers: Endgame",
    tagline: "Whatever it takes. The epic conclusion to an era.",
    rating: "PG-13",
    runtime: 181,
    releaseDate: "2019-04-26",
    genres: ["Action", "Adventure", "Drama"],
    voteAverage: 9.5,
    trendScore: 98,
    synopsis:
      "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe. The epic conclusion to 22 interconnected films, Endgame delivers an emotional, action-packed finale that redefines what it means to be a hero. Experience the ultimate Marvel Cinematic Universe event in stunning 4K.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
    cast: [
      {
        name: "Robert Downey Jr.",
        character: "Tony Stark / Iron Man",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Chris Evans",
        character: "Steve Rogers / Captain America",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Scarlett Johansson",
        character: "Natasha Romanoff / Black Widow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
      }
    ],
    showtimes: [
      {
        date: "2025-11-15",
        times: [
          { label: "08:15 AM", price: 13.5, screen: "IMAX Laser", isPremium: true },
          { label: "12:30 PM", price: 15.5, screen: "Dolby Atmos" },
          { label: "07:45 PM", price: 20.2, screen: "IMAX Laser", isPremium: true }
        ]
      },
      {
        date: "2025-11-16",
        times: [
          { label: "09:00 AM", price: 13, screen: "IMAX Laser", isPremium: true },
          { label: "03:10 PM", price: 15.5, screen: "Dolby Atmos" },
          { label: "09:15 PM", price: 20.8, screen: "IMAX Laser", isPremium: true }
        ]
      }
    ],
    tags: ["Marvel", "IMAX", "Epic Finale"],
    seatMap: sharedSeatMap
  },
  {
    id: "mv-03",
    slug: "the-dark-knight",
    title: "The Dark Knight",
    tagline: "Why so serious? The hero Gotham deserves.",
    rating: "PG-13",
    runtime: 152,
    releaseDate: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    voteAverage: 9.8,
    trendScore: 99,
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman must set out to dismantle the remaining criminal organizations that plague the streets. A masterpiece of modern cinema, now in stunning 4K restoration.",
    poster: "/dark.jpg",
    backdrop: "/dark.jpg",
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    cast: [
      {
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Heath Ledger",
        character: "The Joker",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Aaron Eckhart",
        character: "Harvey Dent / Two-Face",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      }
    ],
    showtimes: [
      {
        date: "2025-11-15",
        times: [
          { label: "11:15 AM", price: 14.5, screen: "IMAX Laser", isPremium: true },
          { label: "04:45 PM", price: 18.5, screen: "Dolby Atmos" },
          { label: "11:30 PM", price: 17.5, screen: "Neo Midnight" }
        ]
      },
      {
        date: "2025-11-16",
        times: [
          { label: "01:00 PM", price: 15, screen: "IMAX Laser", isPremium: true },
          { label: "09:40 PM", price: 18.9, screen: "Dolby Atmos" }
        ]
      },
      {
        date: "2025-11-18",
        times: [
          { label: "06:00 PM", price: 16.2, screen: "IMAX Laser", isPremium: true },
          { label: "10:55 PM", price: 17, screen: "Neo Midnight" }
        ]
      }
    ],
    tags: ["DC", "IMAX", "Classic"],
    seatMap: sharedSeatMap
  }
];

export const movieMap = Object.fromEntries(movies.map((movie) => [movie.slug, movie]));

export const featuredMovies = movies.map((movie, index) => ({
  ...movie,
  highlightColor: ["from-purple-500", "from-sky-400", "from-pink-500"][index % 3]
}));

export const preferenceOptions = [
  { key: "cheap", label: "I want cheap tickets" },
  { key: "lessCrowd", label: "Less crowd" },
  { key: "closest", label: "Closest showtime" },
  { key: "morning", label: "Morning preferred" },
  { key: "weekend", label: "Only weekends" },
  { key: "group", label: "Go with friends (5 seats)" }
] as const;

export type PreferenceKey = (typeof preferenceOptions)[number]["key"];

