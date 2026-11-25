"use server";

import { revalidatePath, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { blogPosts } from "@/app/blog/data";
import { COVER_IMAGES, imageRefProblem, parseSections, readTime, slugify } from "@/lib/blog-content";
import { NAME_RE, listUploads, removeUpload } from "@/lib/uploads";
import { clearSession, requireAdmin, setSession, verifyCredentials } from "@/lib/session";
import { mergePosts } from "@/lib/posts";
import { hidePost, unhidePost, REQUEST_STATUSES, type RequestStatus, addPost, addRemark, patchRequest, removePost, removeRequest, removeSubscriber, savePost, storedHidden, storedPosts } from "@/lib/store";

export type AdminFormState = { error?: string };

// Basic in-memory brute-force throttle (per client IP, per server instance).
const attempts = new Map<string, { n: number; until: number }>();

export async function login(_: AdminFormState, fd: FormData): Promise<AdminFormState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const a = attempts.get(ip);
  if (a && a.until > Date.now() && a.n >= 5) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }
  const email = String(fd.get("email") ?? "").slice(0, 200);
  const password = String(fd.get("password") ?? "").slice(0, 200);

  if (!verifyCredentials(email, password)) {
    attempts.set(ip, { n: (a && a.until > Date.now() ? a.n : 0) + 1, until: Date.now() + 15 * 60_000 });
    return { error: "Invalid email or password." };
  }
  attempts.delete(ip);
  await setSession(email);
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}

const field = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);

function readPostFields(fd: FormData) {
  return {
    title: field(fd, "title", 160),
    category: field(fd, "category", 40),
    author: field(fd, "author", 80),
    excerpt: field(fd, "excerpt", 300),
    images: fd.getAll("images").map((v) => String(v).slice(0, 120)),
    body: field(fd, "body", 60_000),
  };
}

async function validate(f: ReturnType<typeof readPostFields>, existing: string[] = []) {
  if (!f.title || !f.category || !f.author || !f.excerpt) {
    return { error: "Title, category, author and summary are required." };
  }
  if (f.images.length < 1 || f.images.length > 3 || new Set(f.images).size !== f.images.length) {
    return { error: "Add between 1 and 3 different images. The first one is the cover." };
  }
  const uploaded = new Set(await listUploads());
  const ok = (u: string) => uploaded.has(u) || existing.includes(u) || COVER_IMAGES.includes(u);
  if (!f.images.every(ok)) return { error: "One of the selected images is not available. Please re-select your images." };
  const refProblem = imageRefProblem(f.body, f.images.length);
  if (refProblem) return { error: refProblem };
  const sections = parseSections(f.body, f.images);
  if (!sections) {
    return {
      error:
        "Article body needs at least one “## Heading” followed by text. Each section must contain a paragraph, and no text may come before the first heading.",
    };
  }
  return { sections };
}

export async function createPost(_: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const fields = readPostFields(fd);
  const v = await validate(fields);
  if (!v.sections) return { error: v.error };

  const taken = new Set([...blogPosts, ...(await storedPosts())].map((p) => p.slug));
  const base = slugify(fields.title) || "post";
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;

  await addPost({
    slug,
    title: fields.title,
    excerpt: fields.excerpt,
    category: fields.category,
    author: fields.author,
    image: fields.images[0],
    gallery: fields.images.slice(1),
    date: new Date().toISOString().slice(0, 10),
    readTime: readTime(v.sections),
    sections: v.sections,
  });
  updateTag("posts");
  redirect("/admin/blogs");
}

/** Edit any live post. Editing a built-in post stores an override; the code version is untouched. */
export async function updatePost(_: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  const current = mergePosts(await storedPosts(), await storedHidden()).find((p) => p.slug === slug);
  if (!current) return { error: "This post no longer exists." };

  const fields = readPostFields(fd);
  const v = await validate(fields, [current.image, ...(current.gallery ?? [])]);
  if (!v.sections) return { error: v.error };

  // keep inline images attached to sections (matched by heading, else by position)
  const sections = v.sections.map((s, i) => {
    const old =
      current.sections.find((o) => o.heading.toLowerCase() === s.heading.toLowerCase()) ?? current.sections[i];
    return old?.images?.length ? { ...s, images: old.images } : s;
  });

  await savePost({
    ...current,
    title: fields.title,
    excerpt: fields.excerpt,
    category: fields.category,
    author: fields.author,
    image: fields.images[0],
    gallery: fields.images.slice(1),
    readTime: readTime(sections),
    sections,
  });
  updateTag("posts");
  redirect("/admin/blogs");
}

/** Removes a post from the site. Built-in posts are hidden (and can be restored). */
export async function deletePost(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if ((await storedPosts()).some((p) => p.slug === slug)) await removePost(slug);
  if (blogPosts.some((p) => p.slug === slug)) await hidePost(slug);
  updateTag("posts");
  redirect("/admin/blogs");
}

/** Discards edits to a built-in post, restoring the code version. */
export async function restoreOriginal(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if (blogPosts.some((p) => p.slug === slug)) await removePost(slug);
  updateTag("posts");
  redirect("/admin/blogs");
}

export async function restoreDeleted(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if (blogPosts.some((p) => p.slug === slug)) await unhidePost(slug);
  updateTag("posts");
  redirect("/admin/blogs");
}

const id = (fd: FormData) => String(fd.get("id") ?? "");

export async function setRequestStatus(requestId: string, status: string) {
  await requireAdmin();
  if (!(REQUEST_STATUSES as readonly string[]).includes(status)) return;
  await patchRequest(requestId, { status: status as RequestStatus });
  revalidatePath("/admin", "layout");
}

export async function addRequestRemark(requestId: string, remark: string) {
  await requireAdmin();
  const text = remark.trim().slice(0, 2000);
  if (!text) return;
  await addRemark(requestId, text);
  revalidatePath("/admin", "layout");
}

export async function deleteRequest(requestId: string) {
  await requireAdmin();
  await removeRequest(requestId);
  revalidatePath("/admin", "layout");
}

export async function deleteSubscriber(fd: FormData) {
  await requireAdmin();
  await removeSubscriber(id(fd));
  revalidatePath("/admin", "layout");
}

/** Permanently deletes an uploaded image, unless a saved post still uses it. */
export async function deleteUpload(url: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const name = url.replace(/^\/uploads\//, "");
  if (!NAME_RE.test(name)) return { ok: false, error: "Not an uploaded image." };
  const users = mergePosts(await storedPosts(), await storedHidden()).filter(
    (p) => p.image === url || p.gallery?.includes(url),
  );
  if (users.length) {
    return { ok: false, error: `Still used by “${users[0].title}”. Remove it from that post first.` };
  }
  await removeUpload(name);
  return { ok: true };
}
