/**
 * Booking store + notification hooks.
 *
 * Default: in-memory store (resets on server restart) so the reservation flow
 * works out of the box. To go to production, replace `saveBooking` with a
 * Firestore/Supabase write and fill in `sendEmail` / `sendSms` using the keys
 * documented in .env.local.example — the rest of the app needs no changes.
 */

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

/** Naive availability: cap concurrent covers per 30-min slot. */
export function isSlotAvailable(date: string, time: string): boolean {
  const MAX_PARTIES_PER_SLOT = 8;
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
  store.set(booking.id, booking);
  await Promise.all([sendEmail(booking), sendSms(booking)]);
  return booking;
}

export function getBooking(id: string) {
  return store.get(id) ?? null;
}

export function cancelBooking(id: string) {
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
