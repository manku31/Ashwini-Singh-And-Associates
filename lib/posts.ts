import { cacheTag } from "next/cache";
import { blogPosts, type BlogPost } from "@/app/blog/data";
import { storedHidden, storedPosts } from "./store";

/** Stored posts override built-in ones with the same slug; hidden built-ins are dropped. */
export function mergePosts(stored: BlogPost[], hidden: string[] = []): BlogPost[] {
  const bySlug = new Map(stored.map((p) => [p.slug, p]));
  const builtIn = new Set(blogPosts.map((p) => p.slug));
  return [
    ...stored.filter((p) => !builtIn.has(p.slug)),
    ...blogPosts.filter((p) => !hidden.includes(p.slug)).map((p) => bySlug.get(p.slug) ?? p),
  ];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheTag("posts");
  return mergePosts(await storedPosts(), await storedHidden());
}
