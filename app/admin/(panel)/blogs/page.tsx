import Link from "next/link";
import { adminAllPosts, adminDeletedBuiltIns, adminViews } from "@/lib/admin-data";
import { ConfirmButton } from "../../confirm-button";
import { deletePost, restoreDeleted, restoreOriginal } from "../../actions";

const badge = {
  custom: { label: "Admin post", cls: "bg-gold/15 text-gold-ink" },
  edited: { label: "Edited", cls: "bg-blue-100 text-blue-800" },
  builtin: { label: "Built-in", cls: "bg-navy/10 text-navy" },
};

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function BlogsPage() {
  const [entries, deleted, views] = await Promise.all([adminAllPosts(), adminDeletedBuiltIns(), adminViews()]);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold">Blogs <span className="text-slate-body">({entries.length})</span></h1>
        <Link href="/admin/blogs/new" className="btn btn-dark !h-11 !px-5 !text-sm">New blog post</Link>
      </div>
      <p className="mt-2 text-sm text-slate-body">All posts currently live on the site. Edit any of them.</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-sand text-xs tracking-[0.14em] text-slate-body">
            <tr>
              <th scope="col" className="w-12 px-4 py-3 font-semibold">#</th>
              <th scope="col" className="px-4 py-3 font-semibold">TITLE</th>
              <th scope="col" className="px-4 py-3 font-semibold">CATEGORY</th>
              <th scope="col" className="px-4 py-3 font-semibold">AUTHOR</th>
              <th scope="col" className="px-4 py-3 font-semibold">PUBLISHED</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">VIEWS</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/10">
            {entries.map(({ post: p, origin }, i) => (
              <tr key={p.slug} className="align-middle">
                <td className="px-4 py-3.5 text-slate-body">{i + 1}</td>
                <td className="max-w-[340px] px-4 py-3.5">
                  <Link href={`/blog/${p.slug}`} className="font-semibold hover:text-gold-ink">{p.title}</Link>
                  <span className={`ml-2 inline-block rounded-full px-2.5 py-0.5 align-middle text-[11px] font-semibold ${badge[origin].cls}`}>{badge[origin].label}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">{p.category}</td>
                <td className="whitespace-nowrap px-4 py-3.5">{p.author}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-slate-body">{p.date}</td>
                <td className="px-4 py-3.5 text-right font-semibold tabular-nums">{(views.get(p.slug) ?? 0).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-4 whitespace-nowrap font-semibold">
                    <Link href={`/blog/${p.slug}`} className="underline">View</Link>
                    <Link href={`/admin/blogs/${p.slug}/edit`} className="text-gold-ink underline">Edit</Link>
                    {origin === "edited" && (
                      <form action={restoreOriginal}>
                        <input type="hidden" name="slug" value={p.slug} />
                        <ConfirmButton message="Discard your edits and restore the original post?" confirmLabel="Yes, restore" className="cursor-pointer underline">
                          Restore original
                        </ConfirmButton>
                      </form>
                    )}
                    <form action={deletePost}>
                      <input type="hidden" name="slug" value={p.slug} />
                      <ConfirmButton message={`Delete “${p.title}” from the site?`} className="cursor-pointer text-red-700 underline">
                        Delete
                      </ConfirmButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleted.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-bold">Deleted built-in posts ({deleted.length})</h2>
          <ul className="mt-3 divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
            {deleted.map((p) => (
              <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm">
                <span className="text-slate-body">{p.title}</span>
                <form action={restoreDeleted}>
                  <input type="hidden" name="slug" value={p.slug} />
                  <button type="submit" className="cursor-pointer font-semibold text-gold-ink underline">Restore</button>
                </form>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
