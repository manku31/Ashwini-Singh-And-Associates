import "server-only";
import { listUploads } from "./uploads";
import { requireAdmin } from "./session";
import { blogPosts } from "@/app/blog/data";
import { mergePosts } from "./posts";
import { storedHidden, storedViews, storedPosts, storedRequests, storedSubscribers } from "./store";

// Every admin read is authorised here, so a page can't forget the check.
export async function adminPosts() {
  await requireAdmin();
  return storedPosts();
}
/** Every live post (built-in + admin-created), with where it comes from. */
export async function adminAllPosts() {
  await requireAdmin();
  const [stored, hidden] = await Promise.all([storedPosts(), storedHidden()]);
  const storedSlugs = new Set(stored.map((p) => p.slug));
  const builtIn = new Set(blogPosts.map((p) => p.slug));
  return mergePosts(stored, hidden).map((post) => ({
    post,
    origin: !builtIn.has(post.slug) ? ("custom" as const) : storedSlugs.has(post.slug) ? ("edited" as const) : ("builtin" as const),
  }));
}
export async function adminUploads() {
  await requireAdmin();
  return listUploads();
}
export async function adminViews() {
  await requireAdmin();
  return storedViews();
}

/** Built-in posts that were deleted and can be restored. */
export async function adminDeletedBuiltIns() {
  await requireAdmin();
  const hidden = await storedHidden();
  return blogPosts.filter((p) => hidden.includes(p.slug));
}
export async function adminRequests() {
  await requireAdmin();
  return storedRequests();
}
export async function adminSubscribers() {
  await requireAdmin();
  return storedSubscribers();
}
