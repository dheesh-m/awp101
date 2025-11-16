import Link from "next/link";
import { getBookingsCollection } from "@/lib/mongodb";

async function getBookingsSnapshot() {
  try {
    const collection = await getBookingsCollection();
    const [total, recent] = await Promise.all([
      collection.countDocuments(),
      collection
        .find({}, { projection: { customerName: 1, customerEmail: 1, customerPhone: 1, createdAt: 1 } })
        .sort({ createdAt: -1 })
        .limit(12)
        .toArray()
    ]);

    return {
      total,
      recent: recent.map((booking) => ({
        id: booking._id?.toString() ?? "",
        name: booking.customerName,
        email: booking.customerEmail,
        phone: booking.customerPhone,
        createdAt: booking.createdAt
      })),
      error: null
    };
  } catch (error: any) {
    console.error("Booking success snapshot error:", error);
    const errorMessage = error?.message || String(error);
    
    let userMessage = "Unable to connect to the booking database.";
    if (errorMessage.includes("MONGODB_URI") || errorMessage.includes("Missing")) {
      userMessage = "MongoDB connection string not configured. Please add MONGODB_URI to your .env.local file.";
    } else if (errorMessage.includes("connection") || errorMessage.includes("connect")) {
      userMessage = "Database connection failed. Please check your MongoDB connection string and network.";
    }
    
    return {
      total: 0,
      recent: [],
      error: userMessage
    };
  }
}

type BookingSuccessPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BookingSuccessPage({ searchParams }: BookingSuccessPageProps) {
  const snapshot = await getBookingsSnapshot();
  const summaryParams = new URLSearchParams();
  const summaryKeys = ["movie", "title", "date", "time", "screen", "seats", "total"];
  summaryKeys.forEach((key) => {
    const value = searchParams[key];
    if (typeof value === "string" && value) {
      summaryParams.set(key, value);
    }
  });
  const summaryHref = summaryParams.toString() ? `/booking/summary?${summaryParams.toString()}` : null;

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div className="glass-panel rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-green-200/70">Booking Confirmed</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Thanks for booking with TicketLoJao!</h1>
        <p className="mt-2 text-white/70">
          You&apos;re part of a community of movie lovers. Here&apos;s a snapshot of everyone who booked with you.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
            <p className="text-sm text-white/60">Total successful bookings</p>
            <p className="text-4xl font-black text-green-400">
              {snapshot.error ? "--" : snapshot.total.toLocaleString("en-IN")}
            </p>
          </div>
          {summaryHref && (
            <Link
              href={summaryHref}
              className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              View Booking Summary
            </Link>
          )}
          <Link
            href="/booking"
            className="rounded-full border border-white/10 bg-purple-500/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500/30"
          >
            Book Another Show
          </Link>
        </div>
      </div>

      {snapshot.error ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
          <p>{snapshot.error}</p>
        </div>
      ) : (
        <div className="glass-panel space-y-4 rounded-3xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Recent moviegoers</h2>
              <p className="text-sm text-white/60">Name, email, and phone numbers from the latest bookings.</p>
            </div>
          </div>
          {snapshot.recent.length === 0 ? (
            <p className="text-sm text-white/60">No bookings recorded yet. Be the first to book a show!</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {snapshot.recent.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
                >
                  <p className="text-base font-semibold text-white">{booking.name}</p>
                  <p className="mt-1 text-white/60">{booking.email}</p>
                  <p className="text-white/60">{booking.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

