"use client";

import { motion } from "framer-motion";

export default function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.6em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mb-6 flex items-center justify-center gap-4"
    >
      <span className="h-px w-10 bg-gold/70" />
      <span className="eyebrow text-crimson">{children}</span>
      <span className="h-px w-10 bg-gold/70" />
    </motion.div>
  );
}
