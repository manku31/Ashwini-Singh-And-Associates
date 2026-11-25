import type { Metadata } from "next";
import { PageHero } from "../_components/page-hero";
import { CtaBand } from "../_components/reviews";
import { BlogExplorer } from "./blog-explorer";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on tax, GST, audit and compliance written by our team.",
};

async function Posts() {
  return <BlogExplorer posts={await getAllPosts()} />;
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from our desk"
        text="Articles on tax, GST, audit and compliance, written by our team."
        crumbs={[{ label: "Blog" }]}
      />
      <Suspense fallback={<div aria-busy="true" className="wrap min-h-96 py-20" />}>
        <Posts />
      </Suspense>
      <CtaBand />
    </>
  );
}
