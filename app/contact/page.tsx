import type { Metadata } from "next";
import { Contact } from "../_components/contact-footer";
import { PageHero } from "../_components/page-hero";
import { Faqs } from "../_components/resources";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Book a consultation with Ashwini Singh and Associates. We respond within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your numbers"
        text="Tell us a little about what you need. We'll respond within one working day to set up a conversation."
        crumbs={[{ label: "Contact Us" }]}
      />
      <Contact />
      <Faqs />
    </>
  );
}
