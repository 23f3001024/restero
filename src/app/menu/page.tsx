import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageHero from "@/components/PageHero";
import InteractiveMenu from "@/components/InteractiveMenu";
import SignatureDishes from "@/components/SignatureDishes";
import ScanToOrder from "@/components/ScanToOrder";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "Explore our Indo-Chinese and Pan-Asian menu — Schezwan, Thai curries, wok-fired noodles, momos, quick bites and desserts, crafted with the finest ingredients.",
};

export default function MenuPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Crafted Daily"
        title="The"
        accent="Menu"
        subtitle="Signature plates and house favourites fresh from the wok — each one a reason to return."
        image={img("1633945274405-b6c8069047b0", 2000)}
        crumb="Menu"
      />
      <InteractiveMenu />
      <SignatureDishes />
      <ScanToOrder />
    </SiteFrame>
  );
}
