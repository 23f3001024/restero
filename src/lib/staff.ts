/**
 * Staff-area gate (kitchen display + table QR tools).
 *
 * A single shared PIN, set via the STAFF_PIN env var. The PIN is validated on
 * the server and stored in an httpOnly cookie, so it also protects the order
 * API — not just the page UI. Set STAFF_PIN in .env.local before going live.
 */
import { cookies } from "next/headers";

export const STAFF_COOKIE = "hcc_staff";

export const getStaffPin = () => process.env.STAFF_PIN ?? "4288";

/** True when the current request carries a valid staff cookie. */
export function isStaffAuthed() {
  return cookies().get(STAFF_COOKIE)?.value === getStaffPin();
}
