/**
 * Booking store + notification hooks.
 *
 * Persists to Supabase when configured (see src/lib/supabase.ts), otherwise
 * falls back to an in-memory store so the reservation flow works with zero
 * setup. Fill in `sendEmail` / `sendSms` using the keys in .env.local.example.
 */
import { supabase } from "./supabase";

export type BookingInput = {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  requests?: string;
};

export type Booking = BookingInput & {
  id: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
};

// Simple in-memory store. Swap for a real DB in production.
const store = new Map<string, Booking>();

function makeReservationId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `HCC-${stamp}${rand}`;
}

export function validateBooking(input: Partial<BookingInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your full name.";
  if (!input.phone || !/^[+\d][\d\s-]{7,}$/.test(input.phone)) return "Please enter a valid phone number.";
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return "Please enter a valid email address.";
  if (!input.guests || input.guests < 1 || input.guests > 20) return "Guests must be between 1 and 20.";
  if (!input.date) return "Please choose a date.";
  if (!input.time) return "Please choose a time.";

  const chosen = new Date(`${input.date}T${input.time}`);
  if (Number.isNaN(chosen.getTime())) return "Invalid date or time.";
  if (chosen.getTime() < Date.now()) return "Please choose a future date and time.";

  const hour = Number(input.time.split(":")[0]);
  if (hour < 11 || hour > 23) return "Reservations are available between 11:00 and 23:30.";
  return null;
}

const MAX_PARTIES_PER_SLOT = 8;

type BookingRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  requests: string | null;
  status: "confirmed" | "cancelled";
  created_at: string;
};

const rowToBooking = (r: BookingRow): Booking => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  email: r.email,
  guests: r.guests,
  date: r.date,
  time: r.time,
  requests: r.requests ?? undefined,
  createdAt: r.created_at,
  status: r.status,
});

/** Naive availability: cap concurrent covers per 30-min slot. */
export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  if (supabase) {
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed")
      .eq("date", date)
      .eq("time", time);
    return (count ?? 0) < MAX_PARTIES_PER_SLOT;
  }
  const count = Array.from(store.values()).filter(
    (b) => b.status === "confirmed" && b.date === date && b.time === time,
  ).length;
  return count < MAX_PARTIES_PER_SLOT;
}

export async function saveBooking(input: BookingInput): Promise<Booking> {
  const booking: Booking = {
    ...input,
    id: makeReservationId(),
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  if (supabase) {
    const { error } = await supabase.from("bookings").insert({
      id: booking.id,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      guests: booking.guests,
      date: booking.date,
      time: booking.time,
      requests: booking.requests ?? null,
      status: booking.status,
      created_at: booking.createdAt,
    });
    if (error) throw new Error(error.message);
  } else {
    store.set(booking.id, booking);
  }

  await Promise.all([sendEmail(booking), sendSms(booking)]);
  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  if (supabase) {
    const { data } = await supabase.from("bookings").select("*").eq("id", id).maybeSingle();
    return data ? rowToBooking(data as BookingRow) : null;
  }
  return store.get(id) ?? null;
}

export async function cancelBooking(id: string): Promise<Booking | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? rowToBooking(data as BookingRow) : null;
  }
  const b = store.get(id);
  if (!b) return null;
  b.status = "cancelled";
  store.set(id, b);
  return b;
}

// ---- Notification stubs (no-ops until keys are provided) ----
async function sendEmail(booking: Booking) {
  if (!process.env.RESEND_API_KEY) return;
  // TODO: integrate Resend / SendGrid here.
  console.info(`[email] confirmation ${booking.id} → ${booking.email}`);
}

async function sendSms(booking: Booking) {
  if (!process.env.TWILIO_ACCOUNT_SID) return;
  // TODO: integrate Twilio here.
  console.info(`[sms] confirmation ${booking.id} → ${booking.phone}`);
}
