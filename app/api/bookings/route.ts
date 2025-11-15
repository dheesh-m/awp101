import { NextRequest, NextResponse } from "next/server";

// In-memory storage (for runtime only, resets on server restart)
// In production, replace with database (Supabase, MongoDB, etc.)
let bookings: Array<{
  id: string;
  movieTitle: string;
  showDate: string;
  showTime: string;
  screen: string;
  seats: string[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      movieTitle,
      showDate,
      showTime,
      screen,
      seats,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone
    } = body;

    // Validation
    if (
      !movieTitle ||
      !showDate ||
      !showTime ||
      !screen ||
      !seats ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      !totalPrice ||
      !customerName ||
      !customerEmail ||
      !customerPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      movieTitle,
      showDate,
      showTime,
      screen,
      seats,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone,
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);

    return NextResponse.json(
      { success: true, booking },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (email) {
    const userBookings = bookings.filter((b) => b.customerEmail === email);
    return NextResponse.json({ bookings: userBookings });
  }

  return NextResponse.json({ bookings });
}

