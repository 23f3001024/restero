import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A feast for the eyes — plating, ambience and moments from The House of Chilli N Curry.",
};

export default function GalleryPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="In Focus"
        title="The"
        accent="Gallery"
        subtitle="Golden plating, cinematic interiors and the little moments that make a meal a memory."
        image={img("1414235077428-338989a2e8c0", 2000)}
        crumb="Gallery"
      />
      <Gallery />
      <Testimonials />
    </SiteFrame>
  );
}
