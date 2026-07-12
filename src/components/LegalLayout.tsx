import SiteFrame from "./SiteFrame";
import PageHero from "./PageHero";
import { img } from "@/lib/data";

/** Shared shell for the Privacy Policy and Terms & Conditions pages. */
export default function LegalLayout({
  title,
  accent,
  subtitle,
  updated,
  children,
}: {
  title: string;
  accent: string;
  subtitle: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <SiteFrame>
      <PageHero
        title={title}
        accent={accent}
        subtitle={subtitle}
        image={img("1517248135467-4c7edcad34c4", 2000)}
        crumb={`${title} ${accent}`.trim()}
      />
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-10 font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
            Last updated: {updated}
          </p>
          <div className="legal">{children}</div>
          <p className="mt-12 border-t border-charcoal/10 pt-6 font-body text-xs italic leading-relaxed text-muted">
            This page is provided for general information and is not legal advice.
            Please have it reviewed by a qualified professional for your specific
            circumstances before relying on it.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
