import "server-only";
import { db } from "./db";

/** Data lives in Neon Postgres via Prisma (see prisma/schema.prisma). */

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
  status: RequestStatus;
  remarks: Remark[]; // newest first
};

export type Subscriber = { id: string; email: string; createdAt: string };

export const storedViews = async () =>
  new Map((await db.view.findMany()).map((v) => [v.slug, v.count]));

export const addView = (slug: string) =>
  db.view.upsert({ where: { slug }, create: { slug, count: 1 }, update: { count: { increment: 1 } } });

export const storedRequests = async (): Promise<ContactRequest[]> =>
  (
    await db.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { remarks: { orderBy: { createdAt: "desc" } } },
    })
  ).map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    service: r.service,
    message: r.message,
    createdAt: r.createdAt.toISOString(),
    status: r.status as RequestStatus,
    remarks: r.remarks.map((m) => ({ id: m.id, text: m.text, createdAt: m.createdAt.toISOString() })),
  }));

export const storedSubscribers = async (): Promise<Subscriber[]> =>
  (await db.subscriber.findMany({ orderBy: { createdAt: "desc" } })).map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

export const addRequest = (
  r: Omit<ContactRequest, "id" | "createdAt" | "status" | "remarks"> & { status?: RequestStatus },
) =>
  db.contactRequest.create({
    data: { name: r.name, phone: r.phone, email: r.email, service: r.service, message: r.message, status: r.status ?? "pending" },
  });

export const addRemark = (id: string, text: string) => db.remark.create({ data: { requestId: id, text } });

export const patchRequest = (id: string, patch: Partial<Pick<ContactRequest, "status">>) =>
  db.contactRequest.updateMany({ where: { id }, data: patch });

export const removeRequest = (id: string) => db.contactRequest.deleteMany({ where: { id } });

export const removeSubscriber = (id: string) => db.subscriber.deleteMany({ where: { id } });

/** Returns false if the address was already subscribed. */
export const addSubscriber = async (email: string) => {
  const { count } = await db.subscriber.createMany({ data: [{ email }], skipDuplicates: true });
  return count > 0;
};
