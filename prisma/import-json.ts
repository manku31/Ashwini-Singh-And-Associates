// One-time import of the old ./.data/*.json files into Postgres. Safe to re-run (skips existing rows).
// Usage: npx tsx prisma/import-json.ts
import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

config({ path: ".env.local" });
config();
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");

async function load<T>(name: string): Promise<T[]> {
  try {
    return JSON.parse(await readFile(path.join(DIR, `${name}.json`), "utf8"));
  } catch {
    return [];
  }
}

async function main() {
  const requests = await load<any>("requests");
  for (const r of requests) {
    const remarks = r.remarks ?? (r.remark ? [{ id: crypto.randomUUID(), text: r.remark, createdAt: r.createdAt }] : []);
    await db.contactRequest.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id, name: r.name, phone: r.phone, email: r.email, service: r.service, message: r.message,
        status: r.status ?? (r.done ? "done" : "pending"),
        createdAt: new Date(r.createdAt),
        remarks: { create: remarks.map((m: any) => ({ id: m.id, text: m.text, createdAt: new Date(m.createdAt) })) },
      },
    });
  }
  const subs = await load<any>("subscribers");
  await db.subscriber.createMany({
    data: subs.map((s) => ({ id: s.id, email: s.email, createdAt: new Date(s.createdAt) })),
    skipDuplicates: true,
  });
  const views = await load<any>("views");
  for (const v of views) await db.view.upsert({ where: { slug: v.slug }, update: {}, create: v });
  console.log({ requests: requests.length, subscribers: subs.length, views: views.length });
}
main().finally(() => db.$disconnect());
