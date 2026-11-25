import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { BlogPost } from "@/app/blog/data";

/**
 * Tiny JSON-file store (local / self-hosted). Data lives in ./.data (git-ignored),
 * override with DATA_DIR. NOTE: this does not persist on serverless hosts like Vercel —
 * swap these functions for a real database before deploying there.
 */
export const DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");

export const REQUEST_STATUSES = ["pending", "reached", "done", "rejected"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export type Remark = { id: string; text: string; createdAt: string };

export type ContactRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
  status?: RequestStatus; // missing = pending
  done?: boolean; // legacy, superseded by status
  remark?: string; // legacy single remark, superseded by remarks
  remarks?: Remark[]; // newest first
};

export type Subscriber = { id: string; email: string; createdAt: string };

type Collections = {
  posts: BlogPost[];
  requests: ContactRequest[];
  subscribers: Subscriber[];
  views: { slug: string; count: number }[];
  hidden: string[]; // slugs of built-in posts deleted from the site
};

const queues = new Map<string, Promise<unknown>>();

async function read<K extends keyof Collections>(name: K): Promise<Collections[K]> {
  try {
    return JSON.parse(await readFile(path.join(DIR, `${name}.json`), "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [] as Collections[K];
    throw e;
  }
}

/** Serialised read-modify-write with atomic replace, so concurrent requests can't corrupt a file. */
function update<K extends keyof Collections, R = void>(
  name: K,
  fn: (items: Collections[K]) => { items: Collections[K]; result?: R },
): Promise<R> {
  const run = (queues.get(name) ?? Promise.resolve()).then(async () => {
    const { items, result } = fn(await read(name));
    await mkdir(DIR, { recursive: true });
    const file = path.join(DIR, `${name}.json`);
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(items, null, 2));
    await rename(tmp, file);
    return result as R;
  });
  queues.set(name, run.catch(() => {}));
  return run;
}

export const storedPosts = () => read("posts");
export const storedViews = async () =>
  new Map((await read("views")).map((v) => [v.slug, v.count]));

export const addView = (slug: string) =>
  update("views", (items) => ({
    items: items.some((v) => v.slug === slug)
      ? items.map((v) => (v.slug === slug ? { ...v, count: v.count + 1 } : v))
      : [...items, { slug, count: 1 }],
  }));

export const storedHidden = () => read("hidden");

export const hidePost = (slug: string) =>
  update("hidden", (items) => ({ items: items.includes(slug) ? items : [...items, slug] }));

export const unhidePost = (slug: string) =>
  update("hidden", (items) => ({ items: items.filter((s) => s !== slug) }));
const remarksOf = (r: ContactRequest): Remark[] =>
  r.remarks ?? (r.remark ? [{ id: "legacy", text: r.remark, createdAt: r.createdAt }] : []);

export const storedRequests = async () =>
  (await read("requests")).map((r) => ({
    ...r,
    status: (r.status ?? (r.done ? "done" : "pending")) as RequestStatus,
    remarks: remarksOf(r),
  }));
export const storedSubscribers = () => read("subscribers");

export const addPost = (post: BlogPost) =>
  update("posts", (items) => ({ items: [post, ...items] }));

export const savePost = (post: BlogPost) =>
  update("posts", (items) => ({
    items: items.some((p) => p.slug === post.slug)
      ? items.map((p) => (p.slug === post.slug ? post : p))
      : [post, ...items],
  }));

export const removePost = (slug: string) =>
  update("posts", (items) => ({ items: items.filter((p) => p.slug !== slug) }));

export const addRequest = (r: Omit<ContactRequest, "id" | "createdAt">) =>
  update("requests", (items) => ({
    items: [{ ...r, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...items],
  }));

export const addRemark = (id: string, text: string) =>
  update("requests", (items) => ({
    items: items.map((r) =>
      r.id === id
        ? {
            ...r,
            remark: undefined,
            remarks: [{ id: crypto.randomUUID(), text, createdAt: new Date().toISOString() }, ...remarksOf(r)],
          }
        : r,
    ),
  }));

export const patchRequest = (id: string, patch: Partial<Pick<ContactRequest, "status">>) =>
  update("requests", (items) => ({ items: items.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));

export const removeRequest = (id: string) =>
  update("requests", (items) => ({ items: items.filter((r) => r.id !== id) }));

export const removeSubscriber = (id: string) =>
  update("subscribers", (items) => ({ items: items.filter((s) => s.id !== id) }));

/** Returns false if the address was already subscribed. */
export const addSubscriber = (email: string) =>
  update("subscribers", (items) => {
    if (items.some((s) => s.email === email)) return { items, result: false };
    return {
      items: [{ id: crypto.randomUUID(), email, createdAt: new Date().toISOString() }, ...items],
      result: true,
    };
  });
