"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Minus,
  Plus,
  ArrowLeft,
  ShoppingBag,
  Check,
  Loader2,
  MessageCircle,
  ScanLine,
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  ChevronLeft,
  X,
  Trash2,
} from "lucide-react";
import QRCode from "qrcode";
import SmartImage from "@/components/ui/SmartImage";
import { menu, menuCategories, BRAND, type MenuCategory } from "@/lib/data";
import { priceToNumber, type OrderLine } from "@/lib/orders";

type Cart = Record<string, number>;
type Mode = "dine-in" | "takeaway";
type PayMethod = "upi" | "card" | "counter";
type Details = { name: string; phone: string; table?: string; notes?: string };
type Confirmation = {
  id: string;
  total: number;
  mode: Mode;
  table: string | null;
  paymentStatus: "paid" | "pending";
  paymentMethod: PayMethod | null;
  paymentReference: string | null;
};

const PAY_OPTIONS: { key: PayMethod; label: string; Icon: typeof Wallet; note: string }[] = [
  { key: "upi", label: "UPI", Icon: Smartphone, note: "Approve the request in any UPI app." },
  { key: "card", label: "Card", Icon: CreditCard, note: "Visa, Mastercard, RuPay & more." },
  { key: "counter", label: "Pay at Counter", Icon: Wallet, note: "Settle the bill when served." },
];

const FIELD =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-crimson focus:ring-2 focus:ring-crimson/15";

export default function OrderPage() {
  const [active, setActive] = useState<MenuCategory>("Starters");
  const [cart, setCart] = useState<Cart>({});
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("dine-in");
  const [tableParam, setTableParam] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [stage, setStage] = useState<"details" | "pay">("details");
  const [payMethod, setPayMethod] = useState<PayMethod>("upi");
  const [details, setDetails] = useState<Details | null>(null);
  const [ordered, setOrdered] = useState<{ lines: OrderLine[]; total: number } | null>(null);
  const [txnId, setTxnId] = useState("");
  const [upiQr, setUpiQr] = useState("");

  // Read the table number encoded in the QR the guest scanned (/order?table=7),
  // and any dish passed from the homepage menu (/order?add=Chilly%20Paneer).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("table");
    if (t) {
      setTableParam(t);
      setMode("dine-in");
    }
    const add = params.get("add");
    if (add) {
      const dish = menu.find((m) => m.name === add);
      if (dish) {
        setActive(dish.category);
        setCart((c) => ({ ...c, [dish.name]: (c[dish.name] ?? 0) + 1 }));
      }
      // Strip ?add= so a Strict-Mode re-run or a page refresh doesn't add it
      // twice (this was the "one tap, quantity 2" bug).
      params.delete("add");
      const qs = params.toString();
      window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    }
  }, []);

  const items = menu.filter((m) => m.category === active);

  // If the guest deletes the last item while the checkout sheet is open, drop
  // them back to the menu to add more.
  useEffect(() => {
    if (checkout && Object.keys(cart).length === 0) {
      setCheckout(false);
      setStage("details");
    }
  }, [cart, checkout]);

  const lines = useMemo(
    () =>
      menu
        .filter((m) => cart[m.name])
        .map((m) => ({ name: m.name, price: priceToNumber(m.price), qty: cart[m.name] })),
    [cart],
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  // UPI intent deep-link with the exact cart amount pre-filled. Tapping it on a
  // phone opens GPay/PhonePe/Paytm/any UPI app ready to pay.
  const upiLink = useMemo(() => {
    const p = new URLSearchParams();
    p.set("pa", BRAND.upiId);
    p.set("pn", BRAND.upiName);
    p.set("am", String(total));
    p.set("cu", "INR");
    p.set("tn", `Order at ${BRAND.short}`);
    // UPI apps expect %20 for spaces, not URLSearchParams' '+'.
    return `upi://pay?${p.toString().replace(/\+/g, "%20")}`;
  }, [total]);

  // Render the same link as a scannable QR so guests can also pay from another
  // device (e.g. a laptop order scanned with their phone).
  useEffect(() => {
    if (stage !== "pay" || payMethod !== "upi" || total <= 0) return;
    let alive = true;
    QRCode.toDataURL(upiLink, {
      width: 240,
      margin: 1,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    })
      .then((url) => alive && setUpiQr(url))
      .catch(() => alive && setUpiQr(""));
    return () => {
      alive = false;
    };
  }, [stage, payMethod, total, upiLink]);

  // Swipe left/right (mobile) to move between menu categories.
  const [swipeDir, setSwipeDir] = useState(0); // 1 = next, -1 = prev (for slide animation)
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const changeCategory = (delta: number) => {
    const i = menuCategories.indexOf(active);
    const next = Math.min(menuCategories.length - 1, Math.max(0, i + delta));
    if (next !== i) {
      setSwipeDir(delta);
      setActive(menuCategories[next]);
    }
  };

  // Tapping a chip: slide in the direction of the chosen category.
  const selectCategory = (cat: MenuCategory) => {
    const i = menuCategories.indexOf(active);
    const j = menuCategories.indexOf(cat);
    if (j !== i) {
      setSwipeDir(j > i ? 1 : -1);
      setActive(cat);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    // horizontal swipe only (ignore vertical scrolls)
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      changeCategory(dx < 0 ? 1 : -1);
    }
  };

  const setQty = (name: string, delta: number) =>
    setCart((c) => {
      const next = Math.max(0, (c[name] ?? 0) + delta);
      const copy = { ...c };
      if (next === 0) delete copy[name];
      else copy[name] = next;
      return copy;
    });

  const removeItem = (name: string) =>
    setCart((c) => {
      const copy = { ...c };
      delete copy[name];
      return copy;
    });

  const celebrate = () => {
    const colors = ["#B71C1C", "#D4AF37", "#FFF4D6"];
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors });
  };

  const openCheckout = () => {
    setStage("details");
    setError(null);
    setTxnId("");
    setCheckout(true);
  };

  // Step 1 → capture guest details, move to payment.
  const submitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setDetails({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      table:
        mode === "dine-in"
          ? tableParam ?? String(form.get("table") ?? "")
          : undefined,
      notes: String(form.get("notes") ?? ""),
    });
    setError(null);
    setStage("pay");
  };

  // Step 2 → confirm payment, then place the order.
  const payAndPlace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!details) return;

    // UPI is paid in the guest's own app; we record the transaction reference
    // they paste back so staff can reconcile it against the bank statement.
    if (payMethod === "upi" && txnId.trim().length < 6) {
      setError("Please paste the UPI transaction ID from your payment app.");
      return;
    }

    setError(null);
    setLoading(true);

    // Card is still a simulated gateway — swap for Razorpay/Stripe when ready.
    await new Promise((r) => setTimeout(r, payMethod === "card" ? 1700 : 400));
    const payment = {
      method: payMethod,
      status: payMethod === "counter" ? "pending" : "paid",
      ...(payMethod === "upi" ? { reference: txnId.trim() } : {}),
    };

    const payload = {
      name: details.name,
      phone: details.phone,
      mode,
      table: mode === "dine-in" ? details.table : undefined,
      notes: details.notes,
      items: lines,
      payment,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Payment could not be completed.");
      setOrdered({ lines, total });
      setConfirmation(data);
      setCheckout(false);
      setStage("details");
      setCart({});
      setTxnId("");
      celebrate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = () => {
    const snap = ordered ?? { lines, total };
    const ref = confirmation?.paymentReference
      ? `%0AUPI Ref: ${confirmation.paymentReference}`
      : "";
    const text = `Order ${confirmation?.id}%0A${snap.lines
      .map((l) => `${l.qty}× ${l.name}`)
      .join("%0A")}%0ATotal: ₹${snap.total}${ref}`;
    return `${BRAND.socials.whatsapp}?text=${text}`;
  };

  return (
    <main className="min-h-[100svh] bg-cream-light pb-32">
      {/* header */}
      <header className="sticky top-0 z-40 glass border-b border-charcoal/5">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-charcoal/70 transition-colors hover:text-crimson"
          >
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="text-center leading-none">
            <p className="font-display text-base font-semibold text-charcoal">
              {tableParam ? `Table ${tableParam}` : "Order Online"}
            </p>
            <p className="font-button text-[0.5rem] uppercase tracking-luxe text-muted">
              The House of Chilli N Curry
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-crimson font-display text-sm font-bold text-cream">
            C
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4">
        {/* category chips */}
        <div className="hide-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 font-button text-[0.68rem] font-semibold uppercase tracking-wider2 transition-colors ${
                active === cat ? "bg-crimson text-cream" : "bg-white text-charcoal/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* swipe hint (mobile) */}
        <p className="mt-2 text-center font-button text-[0.55rem] uppercase tracking-wider2 text-muted/70 sm:hidden">
          ← Swipe to change category →
        </p>

        {/* items — swipe left/right to move between categories */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="touch-pan-y overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={swipeDir} initial={false}>
            <motion.ul
              key={active}
              custom={swipeDir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 60 : -60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 space-y-3"
            >
              {items.map((item) => {
                const qty = cart[item.name] ?? 0;
                return (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-glass"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                      <SmartImage src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg text-charcoal">{item.name}</h3>
                      <p className="truncate font-body text-xs text-muted">{item.desc}</p>
                      <p className="mt-1 font-display text-base font-semibold text-crimson">{item.price}</p>
                    </div>
                    {qty === 0 ? (
                      <button
                        onClick={() => setQty(item.name, 1)}
                        className="shrink-0 rounded-full bg-crimson px-4 py-2 font-button text-[0.65rem] font-semibold uppercase tracking-wider2 text-cream"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex shrink-0 items-center gap-2 rounded-full bg-crimson px-2 py-1.5 text-cream">
                        <button onClick={() => setQty(item.name, -1)} aria-label="Remove one" className="grid h-6 w-6 place-items-center">
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center font-button text-sm font-semibold">{qty}</span>
                        <button onClick={() => setQty(item.name, 1)} aria-label="Add one" className="grid h-6 w-6 place-items-center">
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* sticky cart bar */}
      <AnimatePresence>
        {count > 0 && !checkout && !confirmation && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
          >
            <button
              onClick={openCheckout}
              className="mx-auto flex w-full max-w-3xl items-center justify-between rounded-full bg-crimson px-6 py-4 text-cream shadow-luxe"
            >
              <span className="flex items-center gap-2 font-button text-[0.72rem] font-semibold uppercase tracking-wider2">
                <ShoppingBag size={16} /> {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="font-button text-[0.72rem] font-semibold uppercase tracking-wider2">
                Review · ₹{total}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* checkout sheet */}
      <AnimatePresence>
        {checkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/60 backdrop-blur-sm sm:items-center"
            onClick={() => setCheckout(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-cream-light p-6 sm:rounded-[2rem]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {stage === "pay" && (
                    <button
                      type="button"
                      onClick={() => {
                        setStage("details");
                        setError(null);
                      }}
                      aria-label="Back"
                      className="text-muted transition-colors hover:text-crimson"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  <h2 className="font-display text-2xl text-charcoal">
                    {stage === "details" ? "Your Order" : "Payment"}
                  </h2>
                </div>
                <button type="button" onClick={() => setCheckout(false)} aria-label="Close" className="text-muted">
                  <X size={22} />
                </button>
              </div>

              <ul className="mb-4 space-y-1 rounded-2xl bg-white p-3">
                {lines.map((l) => (
                  <li key={l.name} className="flex items-center gap-2 py-1">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm text-charcoal">{l.name}</p>
                      <p className="font-display text-sm font-semibold text-crimson">
                        ₹{l.price * l.qty}
                      </p>
                    </div>
                    {stage === "details" ? (
                      <>
                        <div className="flex items-center gap-1.5 rounded-full bg-crimson/10 px-1.5 py-1 text-crimson">
                          <button
                            type="button"
                            onClick={() => setQty(l.name, -1)}
                            aria-label={`One less ${l.name}`}
                            className="grid h-6 w-6 place-items-center"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-4 text-center font-button text-sm font-semibold">
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(l.name, 1)}
                            aria-label={`One more ${l.name}`}
                            className="grid h-6 w-6 place-items-center"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(l.name)}
                          aria-label={`Remove ${l.name}`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-crimson/10 hover:text-crimson"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    ) : (
                      <span className="font-body text-sm text-charcoal">{l.qty}×</span>
                    )}
                  </li>
                ))}
                <li className="mt-2 flex justify-between border-t border-charcoal/10 pt-3 font-display text-lg font-semibold text-crimson">
                  <span>Total</span>
                  <span>₹{total}</span>
                </li>
              </ul>

              {stage === "details" ? (
                <form onSubmit={submitDetails}>
                  {tableParam ? (
                    <div className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-crimson/10 py-3 font-button text-[0.72rem] font-semibold uppercase tracking-wider2 text-crimson">
                      <ScanLine size={15} /> Ordering for Table {tableParam}
                    </div>
                  ) : (
                    <div className="mb-3 grid grid-cols-2 gap-2">
                      {(["dine-in", "takeaway"] as Mode[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMode(m)}
                          className={`rounded-xl py-3 font-button text-[0.7rem] font-semibold uppercase tracking-wider2 transition-colors ${
                            mode === m ? "bg-crimson text-cream" : "bg-white text-charcoal/70"
                          }`}
                        >
                          {m === "dine-in" ? "Dine-in" : "Takeaway"}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <input name="name" required placeholder="Your name" className={FIELD} />
                    <input name="phone" required placeholder="Phone number" className={FIELD} />
                    {mode === "dine-in" && !tableParam && (
                      <input name="table" required placeholder="Table number" className={FIELD} />
                    )}
                    <textarea name="notes" rows={2} placeholder="Notes (spice level, allergies…)" className={`${FIELD} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-crimson py-4 font-button text-[0.78rem] font-semibold uppercase tracking-wider2 text-cream shadow-luxe"
                  >
                    Continue to Payment · ₹{total}
                  </button>
                </form>
              ) : (
                <form onSubmit={payAndPlace}>
                  <div className="space-y-2">
                    {PAY_OPTIONS.map(({ key, label, Icon, note }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPayMethod(key)}
                        className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-colors ${
                          payMethod === key ? "border-crimson bg-crimson/5" : "border-charcoal/10 bg-white"
                        }`}
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                          <Icon size={18} />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-base text-charcoal">{label}</span>
                          <span className="block font-body text-xs text-muted">{note}</span>
                        </span>
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                            payMethod === key ? "border-crimson" : "border-charcoal/25"
                          }`}
                        >
                          {payMethod === key && <span className="h-2.5 w-2.5 rounded-full bg-crimson" />}
                        </span>
                      </button>
                    ))}
                  </div>

                  {payMethod === "upi" && (
                    <div className="mt-3 rounded-2xl border border-charcoal/10 bg-white p-4">
                      <a
                        href={upiLink}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-crimson py-3.5 font-button text-[0.74rem] font-semibold uppercase tracking-wider2 text-cream shadow-luxe"
                      >
                        <Smartphone size={16} /> Pay ₹{total} in UPI App
                      </a>

                      <div className="my-4 flex items-center gap-3">
                        <span className="h-px flex-1 bg-charcoal/10" />
                        <span className="font-button text-[0.58rem] uppercase tracking-wider2 text-muted">
                          or scan to pay
                        </span>
                        <span className="h-px flex-1 bg-charcoal/10" />
                      </div>

                      <div className="flex flex-col items-center">
                        {upiQr ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={upiQr}
                            alt="Scan to pay via UPI"
                            width={180}
                            height={180}
                            className="rounded-xl"
                          />
                        ) : (
                          <div className="grid h-[180px] w-[180px] place-items-center rounded-xl bg-charcoal/5">
                            <Loader2 size={22} className="animate-spin text-muted" />
                          </div>
                        )}
                        <p className="mt-2 font-body text-xs text-muted">
                          {BRAND.upiId}
                        </p>
                      </div>

                      <label className="mt-4 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                        Paste UPI transaction ID after paying
                      </label>
                      <input
                        name="txn"
                        value={txnId}
                        onChange={(e) => setTxnId(e.target.value)}
                        inputMode="numeric"
                        placeholder="e.g. 4198XXXXXXXX (UTR / Ref no.)"
                        className={`${FIELD} mt-1.5`}
                      />
                    </div>
                  )}
                  {payMethod === "card" && (
                    <div className="mt-3 space-y-3">
                      <input name="card" inputMode="numeric" required placeholder="Card number" className={FIELD} />
                      <div className="grid grid-cols-2 gap-3">
                        <input name="exp" required placeholder="MM / YY" className={FIELD} />
                        <input name="cvv" inputMode="numeric" required placeholder="CVV" className={FIELD} />
                      </div>
                    </div>
                  )}

                  {error && (
                    <p className="mt-3 rounded-xl bg-crimson/10 px-4 py-3 font-body text-sm text-crimson">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || (payMethod === "upi" && txnId.trim().length < 6)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-crimson py-4 font-button text-[0.78rem] font-semibold uppercase tracking-wider2 text-cream shadow-luxe disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {payMethod === "card" ? "Processing payment…" : "Placing order…"}
                      </>
                    ) : payMethod === "counter" ? (
                      <>Place Order · ₹{total}</>
                    ) : payMethod === "upi" ? (
                      <>I&apos;ve Paid · Place Order</>
                    ) : (
                      <>Pay ₹{total}</>
                    )}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 font-body text-[0.68rem] text-muted">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    {payMethod === "upi"
                      ? "Pay to the verified UPI ID, then paste your reference."
                      : "Secure checkout · demo card gateway"}
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confirmation */}
      <AnimatePresence>
        {confirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md rounded-[2rem] bg-cream-light p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep shadow-luxe-gold"
              >
                <Check size={40} className="text-charcoal" strokeWidth={3} />
              </motion.div>
              <h2 className="mt-6 font-display text-3xl text-charcoal">Order placed!</h2>
              <p className="mt-2 font-body text-sm text-muted">
                Your order <span className="font-semibold text-crimson">{confirmation.id}</span> is
                on its way to the kitchen.
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-wider2 ${
                  confirmation.paymentStatus === "paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gold/20 text-gold-deep"
                }`}
              >
                {confirmation.paymentStatus === "paid" ? (
                  <>
                    <ShieldCheck size={13} /> Paid ₹{confirmation.total}
                    {confirmation.paymentMethod ? ` · ${confirmation.paymentMethod.toUpperCase()}` : ""}
                  </>
                ) : (
                  <>
                    <Wallet size={13} /> Pay at counter
                  </>
                )}
              </span>
              {confirmation.paymentReference && (
                <p className="mt-2 font-body text-xs text-muted">
                  UPI Ref:{" "}
                  <span className="font-medium text-charcoal">
                    {confirmation.paymentReference}
                  </span>
                </p>
              )}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white px-3 py-4">
                  <p className="font-button text-[0.55rem] uppercase tracking-wider2 text-muted">Total</p>
                  <p className="mt-1 font-display text-lg font-semibold text-crimson">₹{confirmation.total}</p>
                </div>
                <div className="rounded-2xl bg-white px-3 py-4">
                  <p className="font-button text-[0.55rem] uppercase tracking-wider2 text-muted">
                    {confirmation.mode === "dine-in" ? "Table" : "Type"}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-crimson">
                    {confirmation.mode === "dine-in" ? confirmation.table : "Takeaway"}
                  </p>
                </div>
              </div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-button text-[0.72rem] font-semibold uppercase tracking-wider2 text-white"
              >
                <MessageCircle size={16} /> Send order on WhatsApp
              </a>
              <Link
                href="/"
                className="mt-3 block font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-crimson underline-offset-4 hover:underline"
              >
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
