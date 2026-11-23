import type { Metadata } from "next";
import { About } from "../_components/about";
import { PageHero } from "../_components/page-hero";
import { Process } from "../_components/process";
import { CtaBand } from "../_components/reviews";
import { WhyUs } from "../_components/services";

export const metadata: Metadata = {
  title: "About Us",
  description: "A partner-led Chartered Accountancy practice built on diligence, clarity and long-term client relationships.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title="A practice built on diligence and trust"
        text="Partner-led Chartered Accountants helping families and businesses stay compliant, make sound decisions and grow with confidence."
        crumbs={[{ label: "About Us" }]}
      />
      <About showMore={false} />
      <WhyUs />
      <Process />
      <CtaBand />
    </>
  );
}
