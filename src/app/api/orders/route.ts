import { NextResponse } from "next/server";
import {
  saveOrder,
  validateOrder,
  listOrders,
  updateOrderStatus,
  ORDER_STATUSES,
  type OrderInput,
  type OrderStatus,
} from "@/lib/orders";
import { isStaffAuthed } from "@/lib/staff";

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized." }, { status: 401 });

// Kitchen dashboard reads live orders. Staff-only.
export async function GET() {
  if (!isStaffAuthed()) return unauthorized();
  return NextResponse.json(
    { orders: await listOrders() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

// Kitchen dashboard advances / cancels an order. Staff-only.
export async function PATCH(req: Request) {
  if (!isStaffAuthed()) return unauthorized();
  let body: { id?: string; status?: OrderStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.id || !body.status || !ORDER_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "id and a valid status are required." }, { status: 422 });
  }
  const order = await updateOrderStatus(body.id, body.status);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order });
}

export async function POST(req: Request) {
  let body: Partial<OrderInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const error = validateOrder(body);
  if (error) return NextResponse.json({ error }, { status: 422 });

  await new Promise((r) => setTimeout(r, 800));
  const order = await saveOrder(body as OrderInput);

  return NextResponse.json({
    id: order.id,
    total: order.total,
    mode: order.mode,
    table: order.table ?? null,
    items: order.items.length,
    name: order.name,
    paymentMethod: order.payment?.method ?? null,
    paymentStatus: order.payment?.status ?? "pending",
    paymentReference: order.payment?.reference ?? null,
  });
}
