/**
 * Online-order store. Persists to Supabase when configured (see src/lib/supabase.ts),
 * otherwise falls back to an in-memory Map so the flow works with zero setup.
 */
import { supabase } from "./supabase";

export type OrderLine = { name: string; price: number; qty: number };

export type PaymentMethod = "upi" | "card" | "counter";
export type Payment = {
  method: PaymentMethod;
  status: "paid" | "pending";
  /** UPI transaction / UTR reference the guest pasted after paying. */
  reference?: string;
};

export type OrderInput = {
  name: string;
  phone: string;
  mode: "dine-in" | "takeaway";
  table?: string;
  items: OrderLine[];
  notes?: string;
  payment?: Payment;
};

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type Order = OrderInput & {
  id: string;
  total: number;
  createdAt: string;
  status: OrderStatus;
};

export const ORDER_STATUSES: OrderStatus[] = [
  "received",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

const store = new Map<string, Order>();

// Uses the first (base) price so multi-price items like "₹299 / 349 / 399"
// don't collapse into a single concatenated number.
export const priceToNumber = (price: string) =>
  Number(price.match(/[\d.]+/)?.[0]) || 0;

function makeOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `HCC-O${stamp}${rand}`;
}

export function validateOrder(input: Partial<OrderInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your name.";
  if (!input.phone || !/^[+\d][\d\s-]{7,}$/.test(input.phone)) return "Please enter a valid phone number.";
  if (input.mode === "dine-in" && !input.table) return "Please enter your table number.";
  if (!input.items || input.items.length === 0) return "Your cart is empty.";
  return null;
}

// ---- Supabase row <-> Order mapping ----
type OrderRow = {
  id: string;
  name: string;
  phone: string;
  mode: "dine-in" | "takeaway";
  table_no: string | null;
  items: OrderLine[];
  notes: string | null;
  payment: Payment | null;
  total: number;
  status: OrderStatus;
  created_at: string;
};

const rowToOrder = (r: OrderRow): Order => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  mode: r.mode,
  table: r.table_no ?? undefined,
  items: r.items,
  notes: r.notes ?? undefined,
  payment: r.payment ?? undefined,
  total: r.total,
  status: r.status,
  createdAt: r.created_at,
});

export async function saveOrder(input: OrderInput): Promise<Order> {
  const total = input.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const order: Order = {
    ...input,
    id: makeOrderId(),
    total,
    createdAt: new Date().toISOString(),
    status: "received",
  };

  if (supabase) {
    const { error } = await supabase.from("orders").insert({
      id: order.id,
      name: order.name,
      phone: order.phone,
      mode: order.mode,
      table_no: order.table ?? null,
      items: order.items,
      notes: order.notes ?? null,
      payment: order.payment ?? null,
      total: order.total,
      status: order.status,
      created_at: order.createdAt,
    });
    if (error) throw new Error(error.message);
    return order;
  }

  store.set(order.id, order);
  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (supabase) {
    const { data } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
    return data ? rowToOrder(data as OrderRow) : null;
  }
  return store.get(id) ?? null;
}

/** All orders, oldest first (kitchen FIFO queue). */
export async function listOrders(): Promise<Order[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data as OrderRow[]).map(rowToOrder);
  }
  return Array.from(store.values()).sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : 1,
  );
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? rowToOrder(data as OrderRow) : null;
  }
  const order = store.get(id);
  if (!order) return null;
  order.status = status;
  store.set(id, order);
  return order;
}
