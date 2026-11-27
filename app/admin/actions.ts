"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { clearSession, requireAdmin, setSession, verifyCredentials } from "@/lib/session";
import { REQUEST_STATUSES, type RequestStatus, addRemark, patchRequest, removeRequest, removeSubscriber } from "@/lib/store";

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
