import Link from "next/link";
import { blogPosts } from "@/app/blog/data";
import { adminViews } from "@/lib/admin-data";

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function BlogsPage() {
  const views = await adminViews();
  const rows = blogPosts
    .map((p) => ({ ...p, views: views.get(p.slug) ?? 0 }))
    .sort((a, b) => b.views - a.views);
  const total = rows.reduce((n, r) => n + r.views, 0);
  return (
    <>
      <h1 className="text-[28px] font-bold">Blog views <span className="text-slate-body">({total} total)</span></h1>
      <p className="mt-2 text-sm text-slate-body">Public views per post, most viewed first. Admin visits are not counted.</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-sand text-xs tracking-[0.14em] text-slate-body">
            <tr>
              <th scope="col" className="w-12 px-5 py-3 font-semibold">#</th>
              <th scope="col" className="px-5 py-3 font-semibold">TITLE</th>
              <th scope="col" className="px-5 py-3 font-semibold">CATEGORY</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">VIEWS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/10">
            {rows.map((r, i) => (
              <tr key={r.slug}>
                <td className="px-5 py-3.5 text-slate-body">{i + 1}</td>
                <td className="px-5 py-3.5 font-medium">
                  <Link href={`/blog/${r.slug}`} className="underline">{r.title}</Link>
                </td>
                <td className="px-5 py-3.5 text-slate-body">{r.category}</td>
                <td className="px-5 py-3.5 text-right font-semibold tabular-nums">{r.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
