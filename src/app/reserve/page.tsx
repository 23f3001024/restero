import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageHero from "@/components/PageHero";
import Booking from "@/components/Booking";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Reserve your evening at The House of Chilli N Curry — instant confirmation, free cancellation up to 2 hours before.",
};

export default function ReservePage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Book Your Evening"
        title="Reserve"
        accent="a Table"
        subtitle="Tell us when you're coming — we'll have the coals lit and the table dressed."
        image={img("1585937421612-70a008356fbe", 2000)}
        crumb="Reserve"
      />
      <Booking />
    </SiteFrame>
  );
}
