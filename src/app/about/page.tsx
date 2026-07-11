import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageHero from "@/components/PageHero";
import OurStory from "@/components/OurStory";
import Experience from "@/components/Experience";
import ChefSpecial from "@/components/ChefSpecial";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a single wok and a grandmother's recipe book to a luxury dining destination — the story of The House of Chilli N Curry.",
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Since 1998"
        title="Our"
        accent="Story"
        subtitle="A family kitchen reimagined as luxury — three decades of spice, smoke and warmth."
        image={img("1517248135467-4c7edcad34c4", 2000)}
        crumb="About"
      />
      <OurStory />
      <Experience />
      <ChefSpecial />
    </SiteFrame>
  );
}
