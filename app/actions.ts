"use server";

import { getAdmin } from "@/lib/session";
import { mergePosts } from "@/lib/posts";
import { addRequest, addSubscriber, addView, storedHidden, storedPosts } from "@/lib/store";

export type FormResult = { ok: true } | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (fd: FormData, key: string, max: number) =>
  String(fd.get(key) ?? "").trim().slice(0, max);

export async function submitContact(fd: FormData): Promise<FormResult> {
  const name = text(fd, "name", 120);
  const phone = text(fd, "phone", 40);
  const email = text(fd, "email", 200).toLowerCase();
  let service = text(fd, "service", 80);
  const other = text(fd, "otherService", 160);
  const message = text(fd, "message", 4000);

  if (!name || !phone || !EMAIL.test(email) || !service) {
    return { ok: false, error: "Please fill in your name, phone and a valid email." };
  }
  if (service === "Other") {
    if (!other) return { ok: false, error: "Please tell us which service you need." };
    service = `Other: ${other}`;
  }
  if (!fd.get("consent")) return { ok: false, error: "Please accept the consent checkbox." };

  try {
    await addRequest({ name, phone, email, service, message });
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}

export async function subscribe(fd: FormData): Promise<FormResult> {
  const email = text(fd, "email", 200).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, error: "Please enter a valid email address." };
  try {
    await addSubscriber(email); // duplicates are treated as success
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}

/** Counts one public view of a live blog post. Admin views are not counted. */
export async function recordView(slug: string): Promise<void> {
  if (await getAdmin()) return;
  const live = mergePosts(await storedPosts(), await storedHidden());
  if (!live.some((p) => p.slug === slug)) return;
  await addView(slug);
}
