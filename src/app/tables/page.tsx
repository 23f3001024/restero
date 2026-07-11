"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Printer, ScanLine } from "lucide-react";
import { BRAND } from "@/lib/data";
import PinGate from "@/components/PinGate";

function TableTools() {
  const [count, setCount] = useState(12);
  const [qrs, setQrs] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!origin) return;
    let cancelled = false;
    Promise.all(
      Array.from({ length: count }, (_, i) =>
        QRCode.toDataURL(`${origin}/order?table=${i + 1}`, {
          margin: 1,
          width: 420,
          errorCorrectionLevel: "H",
          color: { dark: "#1E1E1E", light: "#ffffff" },
        }),
      ),
    ).then((urls) => {
      if (!cancelled) setQrs(urls);
    });
    return () => {
      cancelled = true;
    };
  }, [count, origin]);

  return (
    <main className="min-h-[100svh] bg-cream-light">
      {/* controls */}
      <div className="sticky top-0 z-10 border-b border-charcoal/10 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-button text-[0.6rem] uppercase tracking-luxe text-crimson">
              Staff Tools
            </p>
            <h1 className="font-display text-2xl font-semibold text-charcoal">
              Table QR Codes
            </h1>
            <p className="mt-1 font-body text-sm text-muted">
              Print one per table. Scanning opens the menu pre-set to that table.
            </p>
          </div>
          <div className="flex items-end gap-3">
            <label className="text-sm">
              <span className="mb-1 block font-button text-[0.6rem] uppercase tracking-wider2 text-muted">
                Number of tables
              </span>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) =>
                  setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))
                }
                className="w-28 rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 font-body text-charcoal outline-none focus:border-crimson"
              />
            </label>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-full bg-crimson px-6 py-3 font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-cream"
            >
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-4">
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="flex break-inside-avoid flex-col items-center rounded-2xl border-2 border-charcoal/10 bg-white p-6 text-center"
            >
              <p className="font-button text-[0.55rem] uppercase tracking-luxe text-crimson">
                The House of
              </p>
              <p className="font-display text-lg font-semibold text-charcoal">
                Chilli N Curry
              </p>

              <div className="my-4 rounded-xl border border-charcoal/10 p-3">
                {qrs[i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrs[i]} alt={`Scan to order for table ${i + 1}`} className="h-40 w-40" />
                ) : (
                  <div className="h-40 w-40 animate-pulse rounded bg-charcoal/10" />
                )}
              </div>

              <div className="rounded-full bg-charcoal px-5 py-1.5">
                <span className="font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-cream">
                  Table {i + 1}
                </span>
              </div>
              <p className="mt-3 flex items-center gap-1.5 font-button text-[0.6rem] font-semibold uppercase tracking-wider2 text-muted">
                <ScanLine size={13} className="text-crimson" /> Scan to Order
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-xs text-muted print:hidden">
          Tip: deploy the site, then these codes point at your live domain
          automatically. Currently: <span className="text-crimson">{origin}/order?table=N</span>
        </p>
      </div>
    </main>
  );
}

export default function TablesPage() {
  return (
    <PinGate title="Table QR Tools">
      <TableTools />
    </PinGate>
  );
}
