import "server-only";
import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { DIR } from "./store";

const UPLOAD_DIR = path.join(DIR, "uploads");
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const NAME_RE = /^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/;

export const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

/** Identify the real image type from its bytes (never trust the client's name or type). SVG is refused. */
export function sniffExt(b: Buffer): string | null {
  if (b.length > 12 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.length > 12 && b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP") return "webp";
  if (b.length > 6 && ["GIF87a", "GIF89a"].includes(b.subarray(0, 6).toString())) return "gif";
  return null;
}

export async function saveUpload(buf: Buffer, ext: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${crypto.randomUUID()}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/uploads/${name}`;
}

export const uploadPath = (name: string) => path.join(UPLOAD_DIR, name);

/** Uploaded images, newest first, as public URLs. */
export async function listUploads(): Promise<string[]> {
  try {
    const names = (await readdir(UPLOAD_DIR)).filter((n) => NAME_RE.test(n));
    const withTime = await Promise.all(names.map(async (n) => ({ n, t: (await stat(path.join(UPLOAD_DIR, n))).mtimeMs })));
    return withTime.sort((a, b) => b.t - a.t).map((x) => `/uploads/${x.n}`);
  } catch {
    return [];
  }
}

export async function removeUpload(name: string): Promise<void> {
  if (NAME_RE.test(name)) await unlink(path.join(UPLOAD_DIR, name)).catch(() => {});
}
