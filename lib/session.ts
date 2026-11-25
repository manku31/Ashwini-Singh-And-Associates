import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { cache } from "react";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Admins are plain `email:password` pairs in the environment (.env.local), comma-separated:
 *   ADMIN_USERS=admin@example.com:MyPassword,second@example.com:AnotherPassword
 * Edit the file and restart the server to change a password or add/remove an admin.
 * (Passwords can't contain a comma, and avoid "$" because .env files treat it specially.)
 */
function adminUsers(): Map<string, string> {
  const users = new Map<string, string>();
  for (const entry of (process.env.ADMIN_USERS ?? "").split(",")) {
    const i = entry.indexOf(":");
    if (i < 1) continue;
    const email = entry.slice(0, i).trim().toLowerCase();
    const password = entry.slice(i + 1).trim();
    if (email && password) users.set(email, password);
  }
  return users;
}

/** Cookie-signing key. Optional ADMIN_SESSION_SECRET; otherwise derived from ADMIN_USERS so changing a password signs everyone out. */
function secret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 32) return explicit;
  const raw = process.env.ADMIN_USERS;
  return raw ? createHash("sha256").update(`admin-session:${raw}`).digest("hex") : null;
}

export function adminConfigured(): boolean {
  return adminUsers().size > 0 && secret() !== null;
}

const sign = (payload: string, key: string) =>
  createHmac("sha256", key).update(payload).digest("base64url");

const safeEqual = (a: Buffer, b: Buffer) =>
  a.length === b.length && timingSafeEqual(a, b);

/** Constant-time string comparison (compares fixed-length digests). */
const sameText = (a: string, b: string) =>
  safeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

export function verifyCredentials(email: string, password: string): boolean {
  const expected = adminUsers().get(email.trim().toLowerCase());
  // always run one comparison so unknown emails take the same time as wrong passwords
  const ok = sameText(password, expected ?? "\u0000no-such-user");
  return expected !== undefined && ok;
}

export function createToken(email: string): string {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const payload = Buffer.from(
    JSON.stringify({ e: email.toLowerCase(), x: Date.now() + MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

/** Returns the admin's email if the token is authentic, unexpired, and still an allowed admin. */
export function verifyToken(token: string | undefined): string | null {
  const key = secret();
  if (!token || !key) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  if (!safeEqual(Buffer.from(sig), Buffer.from(sign(payload, key)))) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || typeof x !== "number" || x < Date.now()) return null;
    return adminUsers().has(e) ? e : null;
  } catch {
    return null;
  }
}

export async function setSession(email: string) {
  (await cookies()).set(COOKIE, createToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function getAdmin(): Promise<string | null> {
  await connection(); // session expiry uses Date.now(): always evaluate at request time
  return verifyToken((await cookies()).get(COOKIE)?.value);
}

/** Authorization gate: call at the top of every admin page, action and admin data read. */
// cache(): the layout, page and each data read all call this; verify once per request.
export const requireAdmin = cache(async (): Promise<string> => {
  const email = await getAdmin();
  if (!email) redirect("/admin/login");
  return email;
});

export const SESSION_COOKIE = COOKIE;
