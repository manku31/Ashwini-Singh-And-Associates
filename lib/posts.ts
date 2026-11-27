import { blogPosts, type BlogPost } from "@/app/blog/data";

/** Blog posts are written in code: add or edit them in app/blog/data.ts. */
export async function getAllPosts(): Promise<BlogPost[]> {
  return blogPosts;
}
