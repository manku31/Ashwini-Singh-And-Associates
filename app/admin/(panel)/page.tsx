import Link from "next/link";
import { adminAllPosts, adminRequests, adminSubscribers } from "@/lib/admin-data";
import { fmtDateTime } from "@/lib/format";

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function Overview() {
  const [posts, requests, subscribers] = await Promise.all([adminAllPosts(), adminRequests(), adminSubscribers()]);
  const cards = [
    { href: "/admin/blogs", label: "Live blog posts", n: posts.length },
    { href: "/admin/requests", label: `Callback requests · ${requests.filter((r) => r.status === "pending").length} pending`, n: requests.length },
    { href: "/admin/subscribers", label: "Newsletter subscribers", n: subscribers.length },
  ];
  return (
    <>
      <h1 className="text-[28px] font-bold">Admin overview</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-xl border border-navy/10 bg-white p-6 hover:border-gold">
            <span className="font-serif text-4xl font-semibold">{c.n}</span>
            <span className="mt-2 block text-sm text-slate-body">{c.label}</span>
          </Link>
        ))}
      </div>
      <h2 className="mt-12 text-xl font-bold">Latest requests</h2>
      {requests.length === 0 ? (
        <p className="mt-3 text-sm text-slate-body">No requests yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
          {requests.slice(0, 5).map((r) => (
            <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
              <span><strong>{r.name}</strong> <span className="text-sm text-slate-body">· {r.service}</span></span>
              <span className="text-xs text-slate-body">{fmtDateTime(r.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
