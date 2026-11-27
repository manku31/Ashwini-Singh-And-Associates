import "server-only";
import { requireAdmin } from "./session";
import { storedRequests, storedSubscribers } from "./store";

// Every admin read is authorised here, so a page can't forget the check.
export async function adminRequests() {
  await requireAdmin();
  return storedRequests();
}
export async function adminSubscribers() {
  await requireAdmin();
  return storedSubscribers();
}
