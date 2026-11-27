import Link from "next/link";
import { adminRequests } from "@/lib/admin-data";
import { fmtDateTime } from "@/lib/format";
import { REQUEST_STATUSES } from "@/lib/store";
import { RequestsTable } from "./requests-table";

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function RequestsPage({ searchParams }: PageProps<"/admin/requests">) {
  const { status } = await searchParams;
  const filter = REQUEST_STATUSES.find((s) => s === status) ?? "all";
  const all = await adminRequests();
  // "All" hides rejected requests; they only appear under the Rejected filter.
  const active = all.filter((r) => r.status !== "rejected");
  const count = (s: string) => (s === "all" ? active.length : all.filter((r) => r.status === s).length);
  const rows = (filter === "all" ? active : all.filter((r) => r.status === filter))
    .map((r) => ({ ...r, created: fmtDateTime(r.createdAt) }));

  return (
    <>
      <h1 className="text-[28px] font-bold">Callback requests</h1>
      <div role="group" aria-label="Filter by status" className="mt-5 flex flex-wrap gap-2">
        {(["all", ...REQUEST_STATUSES] as const).map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/requests" : `/admin/requests?status=${f}`}
            aria-current={filter === f ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium capitalize ${
              filter === f ? "border-navy bg-navy text-white" : "border-navy/15 bg-white hover:border-gold"
            }`}
          >
            {f} ({count(f)})
          </Link>
        ))}
      </div>
      <div className="mt-6">
        {rows.length === 0 ? (
          <p className="rounded-xl border border-navy/10 bg-white p-8 text-center text-sm text-slate-body">
            No {filter === "all" ? "" : filter + " "}requests.
          </p>
        ) : (
          <RequestsTable rows={rows} />
        )}
      </div>
    </>
  );
}
