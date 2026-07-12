import { NextResponse } from "next/server";
import {
  saveBooking,
  validateBooking,
  isSlotAvailable,
  type BookingInput,
} from "@/lib/bookings";

export async function POST(req: Request) {
  let body: Partial<BookingInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const error = validateBooking(body);
  if (error) return NextResponse.json({ error }, { status: 422 });

  const input = body as BookingInput;
  input.guests = Number(input.guests);

  if (!(await isSlotAvailable(input.date, input.time))) {
    return NextResponse.json(
      { error: "That slot is fully reserved. Please choose another time." },
      { status: 409 },
    );
  }

  // Small delay to make the luxury loading state feel intentional.
  await new Promise((r) => setTimeout(r, 900));

  try {
    const booking = await saveBooking(input);
    return NextResponse.json({
      id: booking.id,
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      name: booking.name,
    });
  } catch (err) {
    console.error("[bookings] save failed:", err);
    return NextResponse.json(
      { error: "Could not save your reservation. Please try again." },
      { status: 500 },
    );
  }
}
