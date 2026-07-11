"use client";

import { useEffect, useState } from "react";
import { Lock, Loader2 } from "lucide-react";

/**
 * Wraps a staff-only page. Children are not mounted until the correct PIN is
 * accepted by the server (/api/staff-auth), so their data fetches never run
 * while locked. Unlock persists for 12h via an httpOnly cookie.
 */
export default function PinGate({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<"checking" | "locked" | "open">("checking");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/staff-auth", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setStatus(d.authed ? "open" : "locked"))
      .catch(() => setStatus("locked"));
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/staff-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Incorrect PIN.");
      }
      setStatus("open");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect PIN.");
      setPin("");
    } finally {
      setBusy(false);
    }
  };

  if (status === "open") return <>{children}</>;

  if (status === "checking") {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-charcoal">
        <Loader2 size={26} className="animate-spin text-cream/50" />
      </main>
    );
  }

  return (
    <main className="grid min-h-[100svh] place-items-center bg-charcoal px-6 text-cream">
      <form onSubmit={submit} className="w-full max-w-xs text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-crimson text-cream">
          <Lock size={22} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">{title}</h1>
        <p className="mt-1 font-body text-sm text-cream/50">
          Enter the staff PIN to continue.
        </p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
          inputMode="numeric"
          type="password"
          autoFocus
          aria-label="Staff PIN"
          placeholder="••••"
          className="mt-6 w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-center font-display text-2xl tracking-[0.5em] text-cream outline-none transition-colors focus:border-gold"
        />
        {error && <p className="mt-3 font-body text-sm text-crimson">{error}</p>}
        <button
          type="submit"
          disabled={busy || pin.length < 4}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 font-button text-[0.72rem] font-semibold uppercase tracking-wider2 text-charcoal transition-opacity disabled:opacity-50"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : null}
          {busy ? "Checking…" : "Unlock"}
        </button>
      </form>
    </main>
  );
}
