"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const QrScanner = dynamic(() => import("./QrScanner"), { ssr: false });

/** Mounts the camera QR scanner once and opens it on the `hcc:open-scanner` event. */
export default function GlobalScanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("hcc:open-scanner", handler);
    return () => window.removeEventListener("hcc:open-scanner", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && <QrScanner onClose={() => setOpen(false)} />}
    </AnimatePresence>
  );
}
