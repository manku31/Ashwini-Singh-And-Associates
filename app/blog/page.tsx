import type { Metadata } from "next";
import { PageHero } from "../_components/page-hero";
import { CtaBand } from "../_components/reviews";
import { BlogExplorer } from "./blog-explorer";
import { blogPosts } from "./data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on tax, GST, audit and compliance written by our team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from our desk"
        text="Articles on tax, GST, audit and compliance, written by our team."
        crumbs={[{ label: "Blog" }]}
      />
      <BlogExplorer posts={blogPosts} />
      <CtaBand />
    </>
  );
}
