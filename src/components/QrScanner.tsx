"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, ScanLine, Keyboard, CameraOff } from "lucide-react";

const READER_ID = "hcc-qr-reader";

/** Pull a table number out of whatever the QR encodes. */
function extractTable(text: string): string | null {
  try {
    const t = new URL(text).searchParams.get("table");
    if (t) return t;
  } catch {
    /* not a full URL */
  }
  const m = text.match(/table=([\w-]+)/i);
  if (m) return m[1];
  if (/^\d{1,3}$/.test(text.trim())) return text.trim();
  return null;
}

type Scanner = {
  start: (
    camera: { facingMode: string },
    config: { fps: number; qrbox: { width: number; height: number } },
    onSuccess: (decoded: string) => void,
    onError: () => void,
  ) => Promise<void>;
  stop: () => Promise<void>;
  clear: () => Promise<void>;
};

export default function QrScanner({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const scannerRef = useRef<Scanner | null>(null);
  const doneRef = useRef(false);

  const goToTable = (table: string) => {
    if (doneRef.current) return;
    doneRef.current = true;
    router.push(`/order?table=${encodeURIComponent(table)}`);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;
        const scanner = new Html5Qrcode(READER_ID, false);
        scannerRef.current = scanner as unknown as Scanner;
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 230, height: 230 } },
          (decoded: string) => {
            const table = extractTable(decoded);
            if (table) {
              stop().then(() => goToTable(table));
            } else {
              try {
                const u = new URL(decoded);
                if (u.pathname.includes("/order")) {
                  stop().then(() => {
                    doneRef.current = true;
                    router.push(u.pathname + u.search);
                  });
                }
              } catch {
                /* ignore non-matching codes, keep scanning */
              }
            }
          },
          () => {},
        );
      } catch {
        if (!cancelled)
          setError(
            "We couldn't access your camera. Allow camera permission, or enter your table number below.",
          );
      }
    })();

    async function stop() {
      const s = scannerRef.current;
      if (!s) return;
      try {
        await s.stop();
        await s.clear();
      } catch {
        /* already stopped */
      }
      scannerRef.current = null;
    }

    return () => {
      cancelled = true;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1100] flex flex-col bg-charcoal/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 pt-5 text-cream">
        <div className="flex items-center gap-2">
          <ScanLine size={18} className="text-gold" />
          <span className="font-button text-[0.72rem] font-semibold uppercase tracking-wider2">
            Scan Table QR
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close scanner"
          className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {!error ? (
          <>
            <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-cream/15">
              <div id={READER_ID} className="w-full [&_video]:!w-full [&_video]:rounded-3xl" />
              {/* framing corners */}
              <div className="pointer-events-none absolute inset-6">
                <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-gold" />
                <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-gold" />
                <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-gold" />
                <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-gold" />
              </div>
            </div>
            <p className="mt-6 text-center font-body text-sm text-cream/70">
              Point your camera at the QR code on your table.
            </p>
          </>
        ) : (
          <div className="flex max-w-xs flex-col items-center text-center text-cream">
            <CameraOff size={36} className="text-crimson" />
            <p className="mt-4 font-body text-sm text-cream/80">{error}</p>
          </div>
        )}

        {/* manual fallback */}
        {(manual || error) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const t = new FormData(e.currentTarget).get("table")?.toString().trim();
              if (t) goToTable(t);
            }}
            className="mt-6 flex w-full max-w-xs gap-2"
          >
            <input
              name="table"
              inputMode="numeric"
              placeholder="Enter table number"
              className="w-full rounded-full border border-cream/20 bg-cream/5 px-5 py-3 font-body text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold px-5 font-button text-[0.68rem] font-semibold uppercase tracking-wider2 text-charcoal"
            >
              Go
            </button>
          </form>
        )}

        {!manual && !error && (
          <button
            onClick={() => setManual(true)}
            className="mt-5 flex items-center gap-2 font-button text-[0.66rem] font-semibold uppercase tracking-wider2 text-cream/50 hover:text-gold"
          >
            <Keyboard size={14} /> Enter table number manually
          </button>
        )}
      </div>
    </motion.div>
  );
}
