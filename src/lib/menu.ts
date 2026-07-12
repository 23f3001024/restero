/**
 * Client-safe menu helpers (no server/DB imports). Shared by the order page and
 * the server-side order handler so prices come from one source of truth.
 */
import { menu, type MenuItem } from "./data";

// Uses the first (base) price so multi-price strings like "₹299 / 349 / 399"
// don't collapse into a single concatenated number.
export const priceToNumber = (price: string) =>
  Number(price.match(/[\d.]+/)?.[0]) || 0;

// Cart-line label for a chosen variant, e.g. "Chilly Prawn" or "Coffee (Latte)".
export function variantName(item: MenuItem, label: string) {
  const name = item.name;
  if (name.includes("(")) return `${name.slice(0, name.indexOf("(")).trim()} (${label})`;
  const first = name.split(" / ")[0].trim(); // "Chilly Chicken"
  const base = first.split(" ").slice(0, -1).join(" ") || first; // "Chilly"
  return `${base} ${label}`;
}

// Key used in the cart for an item (+ chosen variant, when it has one).
export function cartKey(item: MenuItem, label?: string) {
  return item.variants?.length && label ? variantName(item, label) : item.name;
}

/** Map of every orderable line name -> unit price (variants expanded). */
export function priceCatalog(): Map<string, number> {
  const m = new Map<string, number>();
  for (const item of menu) {
    if (item.variants?.length) {
      for (const v of item.variants) m.set(variantName(item, v.label), v.price);
    } else {
      m.set(item.name, priceToNumber(item.price));
    }
  }
  return m;
}
