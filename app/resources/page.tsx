import type { Metadata } from "next";
import { PageHero } from "../_components/page-hero";
import { Articles, Faqs } from "../_components/resources";
import { CtaBand } from "../_components/reviews";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, explainers and answers to common questions on tax, GST and company compliance.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Insights and guides, made readable"
        text="Practical notes on tax, GST and compliance — plus answers to the questions clients ask us most."
        crumbs={[{ label: "Resources" }]}
      />
      <Articles heading={false} />
      <Faqs />
      <CtaBand />
    </>
  );
}
