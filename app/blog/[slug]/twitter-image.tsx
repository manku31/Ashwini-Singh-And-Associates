import { blogPosts } from "../data";
import { ogSize, renderBlogCard } from "../_og/render";

export const alt = "Blog article from Ashwini Singh and Associates";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return renderBlogCard(slug);
}
