"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChefHat,
  Clock,
  RefreshCw,
  Volume2,
  VolumeX,
  Utensils,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/orders";

type Column = {
  key: OrderStatus;
  label: string;
  accent: string; // tailwind text/border color
  dot: string;
  next?: { to: OrderStatus; label: string };
};

const COLUMNS: Column[] = [
  {
    key: "received",
    label: "New Orders",
    accent: "border-crimson/40",
    dot: "bg-crimson",
    next: { to: "preparing", label: "Start Cooking" },
  },
  {
    key: "preparing",
    label: "Preparing",
    accent: "border-gold/50",
    dot: "bg-gold",
    next: { to: "ready", label: "Mark Ready" },
  },
  {
    key: "ready",
    label: "Ready to Serve",
    accent: "border-emerald-500/50",
    dot: "bg-emerald-400",
    next: { to: "completed", label: "Complete" },
  },
];

function minutesAgo(iso: string) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [sound, setSound] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const seen = useRef<Set<string>>(new Set());
  const soundRef = useRef(sound);
  soundRef.current = sound;

  const beep = useCallback(() => {
    if (!soundRef.current) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } catch {
      /* ignore */
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const data = (await res.json()) as { orders: Order[] };
      const list = data.orders ?? [];

      // beep when a brand-new active order appears (after the first load)
      const activeIds = list
        .filter((o) => o.status === "received")
        .map((o) => o.id);
      if (seen.current.size > 0) {
        const isNew = activeIds.some((id) => !seen.current.has(id));
        if (isNew) beep();
      }
      list.forEach((o) => seen.current.add(o.id));

      setOrders(list);
      setUpdatedAt(new Date());
      setLoaded(true);
    } catch {
      /* keep last data */
    }
  }, [beep]);

  useEffect(() => {
    fetchOrders();
    const t = setInterval(fetchOrders, 4000);
    return () => clearInterval(t);
  }, [fetchOrders]);

  const setStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    ); // optimistic
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchOrders();
  };

  const active = orders.filter((o) =>
    ["received", "preparing", "ready"].includes(o.status),
  );
  const completed = orders.filter((o) => o.status === "completed").length;

  return (
    <main className="min-h-[100svh] bg-charcoal text-cream">
      {/* top bar */}
      <header className="sticky top-0 z-10 border-b border-cream/10 bg-charcoal/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-crimson text-cream">
              <ChefHat size={20} />
            </span>
            <div className="leading-none">
              <h1 className="font-display text-xl font-semibold">Kitchen Display</h1>
              <p className="font-button text-[0.55rem] uppercase tracking-luxe text-cream/50">
                The House of Chilli N Curry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-cream/70">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
            <span className="hidden text-sm text-cream/50 sm:inline">
              {active.length} active · {completed} completed
            </span>
            <button
              onClick={() => setSound((s) => !s)}
              className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:text-gold"
              aria-label="Toggle sound"
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={fetchOrders}
              className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:text-gold"
              aria-label="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* board */}
      <div className="mx-auto max-w-7xl px-5 py-6">
        {loaded && active.length === 0 ? (
          <div className="grid min-h-[60vh] place-items-center text-center">
            <div>
              <Utensils size={40} className="mx-auto text-cream/20" />
              <p className="mt-4 font-display text-2xl text-cream/60">All caught up</p>
              <p className="mt-1 font-body text-sm text-cream/40">
                New orders will appear here automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {COLUMNS.map((col) => {
              const colOrders = active.filter((o) => o.status === col.key);
              return (
                <section key={col.key}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-button text-[0.72rem] font-semibold uppercase tracking-wider2 text-cream/80">
                      <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                      {col.label}
                    </h2>
                    <span className="rounded-full bg-cream/10 px-2.5 py-0.5 font-button text-[0.65rem] font-semibold text-cream/70">
                      {colOrders.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {colOrders.map((o) => {
                      const mins = minutesAgo(o.createdAt);
                      const urgent = col.key !== "ready" && mins >= 10;
                      return (
                        <article
                          key={o.id}
                          className={`rounded-2xl border-2 bg-charcoal-soft p-4 ${
                            urgent ? "animate-pulse border-crimson" : col.accent
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-2xl font-bold leading-none">
                                {o.mode === "dine-in" ? `Table ${o.table}` : "Takeaway"}
                              </p>
                              <p className="mt-1 font-button text-[0.6rem] uppercase tracking-wider2 text-cream/40">
                                {o.id}
                              </p>
                            </div>
                            <span
                              className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-button text-[0.62rem] font-semibold ${
                                urgent ? "bg-crimson text-cream" : "bg-cream/10 text-cream/70"
                              }`}
                            >
                              <Clock size={12} />
                              {mins}m
                            </span>
                          </div>

                          <ul className="mt-3 space-y-1 border-t border-cream/10 pt-3">
                            {o.items.map((it) => (
                              <li key={it.name} className="flex justify-between text-sm">
                                <span className="text-cream/90">
                                  <span className="font-semibold text-gold">{it.qty}×</span>{" "}
                                  {it.name}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {o.notes && (
                            <p className="mt-2 rounded-lg bg-crimson/15 px-3 py-2 font-body text-xs text-cream/80">
                              “{o.notes}”
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between text-xs text-cream/50">
                            <span className="flex items-center gap-2">
                              {o.name}
                              {o.payment?.status === "paid" ? (
                                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-emerald-300">
                                  Paid
                                </span>
                              ) : (
                                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-gold">
                                  Unpaid
                                </span>
                              )}
                            </span>
                            <span className="font-display text-sm font-semibold text-cream/80">
                              ₹{o.total}
                            </span>
                          </div>

                          <div className="mt-4 flex gap-2">
                            {col.next && (
                              <button
                                onClick={() => setStatus(o.id, col.next!.to)}
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 font-button text-[0.66rem] font-semibold uppercase tracking-wider2 text-charcoal transition-colors hover:bg-gold-light"
                              >
                                {col.key === "ready" ? <Check size={14} /> : null}
                                {col.next.label}
                                {col.key !== "ready" ? <ArrowRight size={14} /> : null}
                              </button>
                            )}
                            <button
                              onClick={() => setStatus(o.id, "cancelled")}
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-crimson hover:text-crimson"
                              aria-label="Cancel order"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </article>
                      );
                    })}

                    {colOrders.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-cream/10 py-8 text-center font-body text-xs text-cream/30">
                        Empty
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-center font-body text-xs text-cream/30">
          {updatedAt ? `Updated ${updatedAt.toLocaleTimeString()}` : "Connecting…"} · auto-refresh every 4s
        </p>
      </div>
    </main>
  );
}
