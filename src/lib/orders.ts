/**
 * Online-order store. In-memory by default (same pattern as bookings.ts) so the
 * "Scan to Order" flow works out of the box. Swap `saveOrder` for a DB write to
 * go to production.
 */

export type OrderLine = { name: string; price: number; qty: number };

export type PaymentMethod = "upi" | "card" | "counter";
export type Payment = { method: PaymentMethod; status: "paid" | "pending" };

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

export const priceToNumber = (price: string) =>
  Number(price.replace(/[^\d.]/g, "")) || 0;

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

export async function saveOrder(input: OrderInput): Promise<Order> {
  const total = input.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const order: Order = {
    ...input,
    id: makeOrderId(),
    total,
    createdAt: new Date().toISOString(),
    status: "received",
  };
  store.set(order.id, order);
  return order;
}

export function getOrder(id: string) {
  return store.get(id) ?? null;
}

/** All orders, oldest first (kitchen FIFO queue). */
export function listOrders(): Order[] {
  return Array.from(store.values()).sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : 1,
  );
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | null {
  const order = store.get(id);
  if (!order) return null;
  order.status = status;
  store.set(id, order);
  return order;
}
