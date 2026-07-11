"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CalendarCheck, Check, Loader2, Mail, MessageSquareText } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { BRAND, img } from "@/lib/data";

type Confirmation = {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
};

const FIELD =
  "w-full rounded-xl border border-charcoal/15 bg-white/70 px-4 py-3 font-body text-sm text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-crimson focus:ring-2 focus:ring-crimson/15";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const celebrate = () => {
    const end = Date.now() + 900;
    const colors = ["#B71C1C", "#F5C518", "#FFF4D6"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      guests: Number(form.get("guests")),
      date: form.get("date"),
      time: form.get("time"),
      requests: form.get("requests"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setConfirmation(data);
      celebrate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="book" className="relative overflow-hidden py-28 sm:py-36">
      {/* blurred food backdrop */}
      <div className="absolute inset-0">
        <SmartImage
          src={img("1517248135467-4c7edcad34c4", 1800)}
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/60" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center text-cream">
          <SectionLabel>Book a Table</SectionLabel>
          <Reveal>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Reserve your
              <span className="text-gold-gradient italic"> evening.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-cream/70">
              Tell us when you&apos;re coming — we&apos;ll have the coals lit and
              the table dressed.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass mt-12 overflow-hidden rounded-[2rem] p-2 shadow-luxe">
            <AnimatePresence mode="wait">
              {confirmation ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center px-6 py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep shadow-luxe-gold"
                  >
                    <Check size={40} className="text-charcoal" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mt-6 font-display text-3xl text-charcoal">
                    Table reserved, {confirmation.name.split(" ")[0]}!
                  </h3>
                  <p className="mt-2 max-w-md font-body text-sm text-muted">
                    We can&apos;t wait to host you. A confirmation is on its way to
                    your email and phone.
                  </p>

                  <div className="mt-7 grid w-full max-w-md grid-cols-3 gap-3">
                    {[
                      { k: "Reservation", v: confirmation.id },
                      { k: "Date", v: confirmation.date },
                      { k: "Time · Guests", v: `${confirmation.time} · ${confirmation.guests}` },
                    ].map((d) => (
                      <div key={d.k} className="rounded-2xl bg-white/70 px-3 py-4">
                        <p className="font-button text-[0.55rem] uppercase tracking-wider2 text-muted">
                          {d.k}
                        </p>
                        <p className="mt-1 font-display text-sm font-semibold text-crimson">
                          {d.v}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-muted">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Mail size={14} className="text-gold-deep" /> Email sent
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <MessageSquareText size={14} className="text-gold-deep" /> SMS sent
                    </span>
                  </div>

                  <button
                    onClick={() => setConfirmation(null)}
                    className="mt-8 font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-crimson underline-offset-4 hover:underline"
                  >
                    Make another reservation
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4 rounded-[1.6rem] bg-white/60 p-6 sm:grid-cols-2 sm:p-8"
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Full Name
                    </label>
                    <input name="name" required placeholder="Your name" className={FIELD} />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Phone
                    </label>
                    <input name="phone" required placeholder="+91 …" className={FIELD} />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Email
                    </label>
                    <input name="email" type="email" required placeholder="you@email.com" className={FIELD} />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Guests
                    </label>
                    <select name="guests" defaultValue="2" className={FIELD}>
                      {[...Array(20)].map((_, n) => (
                        <option key={n} value={n + 1}>
                          {n + 1} {n === 0 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Date
                    </label>
                    <input name="date" type="date" required min={today} className={FIELD} />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Time
                    </label>
                    <input name="time" type="time" required min="11:00" max="23:30" defaultValue="20:00" className={FIELD} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                      Special Requests
                    </label>
                    <textarea
                      name="requests"
                      rows={2}
                      placeholder="Window table, birthday, dietary needs…"
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  {error && (
                    <p className="sm:col-span-2 rounded-xl bg-crimson/10 px-4 py-3 font-body text-sm text-crimson">
                      {error}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-crimson py-4 font-button text-[0.78rem] font-semibold uppercase tracking-wider2 text-cream shadow-luxe transition-all duration-500 hover:shadow-luxe-gold disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Securing your table…
                        </>
                      ) : (
                        <>
                          <CalendarCheck size={16} /> Reserve Table
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center font-body text-xs text-muted">
                      Instant confirmation · Free cancellation up to 2 hours before
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <p className="mt-6 text-center font-body text-sm text-cream/60">
          Prefer to call? <span className="text-gold">{BRAND.phone}</span>
        </p>
      </div>
    </section>
  );
}
