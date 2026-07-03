"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let val = 0;
    const tick = setInterval(() => {
      // ease toward 100 with a little organic jitter
      val += Math.max(2.5, (100 - val) * 0.28) * (0.7 + Math.random() * 0.8);
      if (val >= 100) {
        val = 100;
        clearInterval(tick);
        setTimeout(() => setDone(true), 260);
      }
      setProgress(Math.min(100, val));
    }, 55);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-charcoal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ambient smoke */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="steam"
                style={{
                  left: `${12 + i * 15}%`,
                  bottom: "42%",
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${5 + i}s`,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="eyebrow mb-6 text-gold/80"
            >
              Est. Fine Indian Dining
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl leading-tight text-cream sm:text-6xl"
            >
              The House of
              <br />
              <span className="text-gold-gradient shimmer bg-clip-text">
                Chilli N Curry
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="gold-divider mt-8 w-56 origin-center"
            />

            {/* progress */}
            <div className="mt-8 h-px w-64 overflow-hidden bg-cream/15">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 font-button text-xs tracking-luxe text-cream/60">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
