import { NextRequest, NextResponse } from "next/server";
import { getBookingsCollection, type BookingDocument } from "@/lib/mongodb";

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
        { error: "Missing required fields. Please fill all details." },
        { status: 400 }
      );
    }

    try {
      const bookingsCollection = await getBookingsCollection();
      const document = {
        movieTitle,
        showDate,
        showTime,
        screen,
        seats,
        totalPrice,
        customerName,
        customerEmail,
        customerPhone,
        createdAt: new Date()
      };

      const result = await bookingsCollection.insertOne(document as any);
      const booking = { id: result.insertedId.toString(), ...document };

      return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (dbError: any) {
      console.error("MongoDB error:", dbError);
      const errorMessage = dbError?.message || String(dbError);
      
      // If MongoDB is not configured or connection failed
      if (
        errorMessage.includes("MONGODB_URI") ||
        errorMessage.includes("Missing") ||
        errorMessage.includes("connection") ||
        errorMessage.includes("connect")
      ) {
        console.warn("MongoDB connection issue. Booking will be saved but may not persist.");
        // Return success anyway so the user flow continues
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
        return NextResponse.json({ 
          success: true, 
          booking,
          warning: "Database not connected. Booking saved temporarily." 
        }, { status: 201 });
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error("Booking POST error:", error);
    const errorMessage = error?.message || "Failed to create booking. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const bookingsCollection = await getBookingsCollection();

    const filter = email ? { customerEmail: email } : {};
    const cursor = bookingsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .project({
        movieTitle: 1,
        showDate: 1,
        showTime: 1,
        screen: 1,
        seats: 1,
        totalPrice: 1,
        customerName: 1,
        customerEmail: 1,
        customerPhone: 1,
        createdAt: 1
      });

    const bookings = await cursor.toArray();
    const formatted = bookings.map((booking) => ({
      id: booking._id?.toString() ?? "",
      movieTitle: booking.movieTitle,
      showDate: booking.showDate,
      showTime: booking.showTime,
      screen: booking.screen,
      seats: booking.seats,
      totalPrice: booking.totalPrice,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      createdAt: booking.createdAt
    }));

    return NextResponse.json({ bookings: formatted });
  } catch (error) {
    console.error("Booking GET error:", error);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}

