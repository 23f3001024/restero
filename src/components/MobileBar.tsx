"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, UtensilsCrossed, QrCode, CalendarCheck } from "lucide-react";

const TABS = [
  { Icon: Home, label: "Home", href: "/" },
  { Icon: UtensilsCrossed, label: "Menu", href: "/menu" },
  { Icon: QrCode, label: "Scan", href: "scan" },
];

export default function MobileBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 bottom-3 z-[850] flex items-center justify-between rounded-full border border-charcoal/10 bg-white/90 px-2 py-2 shadow-luxe backdrop-blur-xl lg:hidden"
    >
      {TABS.map(({ Icon, label, href }) => {
        const active = pathname === href;
        return (
          <button
            key={label}
            onClick={() =>
              href === "scan"
                ? window.dispatchEvent(new Event("hcc:open-scanner"))
                : router.push(href)
            }
            className={`flex flex-1 flex-col items-center gap-1 py-1.5 transition-colors active:text-crimson ${
              active ? "text-crimson" : "text-charcoal"
            }`}
          >
            <Icon size={21} strokeWidth={2.4} />
            <span className="font-button text-[0.62rem] font-bold uppercase tracking-wider2">
              {label}
            </span>
          </button>
        );
      })}
      <button
        onClick={() => router.push("/reserve")}
        className="flex items-center gap-1.5 rounded-full bg-crimson px-6 py-3.5 font-button text-[0.72rem] font-bold uppercase tracking-wider2 text-cream shadow-luxe"
      >
        <CalendarCheck size={17} strokeWidth={2.4} /> Reserve
      </button>
    </motion.nav>
  );
}
