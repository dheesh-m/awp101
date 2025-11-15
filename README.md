# NeonFlix – Futuristic Movie Ticket Booking

Modern Next.js 14 (App Router) experience with neon-dark visuals, Framer Motion transitions, Tailwind CSS styling, ShadCN-inspired components, and a Supabase-ready data layer. Includes an interactive seat picker, booking flow, and the Smart Ticket Timing Suggestion System.

## ✨ Highlights

- Cinematic, neon-dark UI with blur glassmorphism, sticky navbar, and responsive layout.
- Featured hero carousel, animated search with auto-suggest, rating/trend badges, and skeleton loaders.
- Movie details page with trailer embed, animated showtime selector, cast grid, and smart call-to-actions.
- Seat selection page featuring hover/selection glow, auto-scroll to available rows, and guided summary.
- Booking summary page with QR code download, price breakdown, and smooth fade-ins.
- Smart Ticket Timing Suggestion System: interprets viewer preferences (cheap tickets, low crowd, morning slots, weekends, group bookings, etc.) and predicts best day/time, crowd levels, price bands, and fast-fill probability.
- Supabase client + API route ready for persistence; currently uses rich mock data that can be swapped for real collections.

## 🛠️ Stack

- Next.js 14 App Router, TypeScript, ESLint
- Tailwind CSS + `tailwindcss-animate`, ShadCN-flavored primitives
- Framer Motion for route/page/section transitions
- Supabase client (`@supabase/supabase-js`) with graceful fallback to local mock data
- React QR Code, Lucide icons, clsx/tailwind-merge utilities

## 🚀 Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Environment (Supabase)

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

If provided, the data service/API route will use Supabase tables; otherwise, it falls back to the curated dataset in `data/movies.ts`.

## 🧠 Smart Suggestion Logic

Located in `lib/suggestions.ts`. It inspects user preferences + movie metadata (trend score, release recency, seat availability, time of day, weekday/weekend) to output:

- Best day and showtime
- Seat availability probability
- Crowd score
- Expected price range
- Fast-fill chance
- Reasoning trail displayed inside an animated `SmartSuggestionCard`

You can also hit `/api/suggestions` with `{ movieSlug, preferences, seatsRequested }` to retrieve predictions programmatically.

## 📂 Key directories

- `app/` – App Router pages, API route, global layout, loading skeleton
- `components/` – UI primitives, navigation/footer, smart suggestion/seat/booking widgets
- `data/movies.ts` – Mock dataset + preference metadata
- `lib/` – Supabase client, data services, utilities, suggestion engine

## ✅ Next steps

- Wire Supabase tables for movies, showtimes, and bookings
- Persist seat selections + orders
- Add authentication and payment flows
- Expand Smart Suggestion heuristics with live pricing/occupancy signals

