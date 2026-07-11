import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Find your way to The House of Chilli N Curry — address, hours, phone and reservations in Undri, Pune.",
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="We'd Love to Host You"
        title="Visit"
        accent="Us"
        subtitle="Find your way to the table — directions, hours and every way to reach us."
        image={img("1552566626-52f8b828add9", 2000)}
        crumb="Contact"
      />
      <Contact />
    </SiteFrame>
  );
}
