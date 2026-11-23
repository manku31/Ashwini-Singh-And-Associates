import type { Metadata } from "next";
import { PageHero } from "../_components/page-hero";
import { Pillars } from "../_components/pillars";
import { CtaBand } from "../_components/reviews";
import { Services } from "../_components/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Audit, tax, GST, company law, corporate finance and Virtual CFO services under one roof.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Expertise across audit, tax and advisory"
        text="End-to-end accounting, assurance and advisory under one roof, so your compliance, tax and growth plans all speak to each other."
        crumbs={[{ label: "Services" }]}
      />
      <Services showAll={false} />
      <Pillars />
      <CtaBand />
    </>
  );
}
