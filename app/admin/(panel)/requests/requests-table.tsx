"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { ContactRequest, Remark, RequestStatus } from "@/lib/store";
import { fmtDateTime } from "@/lib/format";
import { ConfirmDialog } from "../../confirm-dialog";
import { addRequestRemark, deleteRequest, setRequestStatus } from "../../actions";

export type RequestRow = ContactRequest & { status: RequestStatus; remarks: Remark[]; created: string };

const STATUSES: { value: RequestStatus; label: string; cls: string }[] = [
  { value: "pending", label: "Pending", cls: "border-amber-300 bg-amber-50 text-amber-900" },
  { value: "reached", label: "Reached", cls: "border-blue-300 bg-blue-50 text-blue-900" },
  { value: "done", label: "Done", cls: "border-green-300 bg-green-50 text-green-900" },
  { value: "rejected", label: "Rejected", cls: "border-red-300 bg-red-50 text-red-900" },
];
const cls = (s: RequestStatus) => STATUSES.find((x) => x.value === s)!.cls;

function StatusSelect({ row, large }: { row: RequestRow; large?: boolean }) {
  const [, start] = useTransition();
  return (
    <select
      key={row.id + row.status}
      aria-label={`Status for ${row.name}`}
      defaultValue={row.status}
      onChange={(e) => start(() => setRequestStatus(row.id, e.target.value))}
      className={`cursor-pointer rounded-full border font-semibold ${cls(row.status)} ${large ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs"}`}
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}

function RemarkCell({ row, onAdd }: { row: RequestRow; onAdd: () => void }) {
  const [latest, ...earlier] = row.remarks;
  return (
    <div className="flex min-w-[200px] flex-col items-start gap-1.5">
      {latest ? (
        <p className="line-clamp-2 text-sm leading-snug" title={latest.text}>
          {latest.text}
          {earlier.length > 0 && <span className="ml-1 text-xs text-slate-body">(+{earlier.length} earlier)</span>}
        </p>
      ) : (
        <span className="text-xs text-slate-body">No remarks yet</span>
      )}
      <button type="button" onClick={onAdd} className="cursor-pointer rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold-ink hover:bg-sand">
        + Add remark
      </button>
    </div>
  );
}

export function RequestsTable({ rows }: { rows: RequestRow[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [focusRemark, setFocusRemark] = useState(false);
  const open = rows.find((r) => r.id === openId) ?? null;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-sand text-xs tracking-[0.14em] text-slate-body">
            <tr>
              {["NAME", "MAIL", "CALL", "SERVICE", "STATUS", "REMARK"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/10">
            {rows.map((r) => (
              <tr key={r.id} className="align-middle">
                <td className="px-4 py-3">
                  <button type="button" onClick={() => { setFocusRemark(false); setOpenId(r.id); }} className="cursor-pointer text-left font-semibold text-gold-ink underline decoration-gold/40 underline-offset-2 hover:decoration-gold">
                    {r.name}
                  </button>
                </td>
                <td className="px-4 py-3"><a href={`mailto:${r.email}`} className="break-all underline">{r.email}</a></td>
                <td className="whitespace-nowrap px-4 py-3"><a href={`tel:${r.phone.replace(/[^+\d]/g, "")}`} className="underline">{r.phone}</a></td>
                <td className="px-4 py-3">{r.service}</td>
                <td className="px-4 py-3"><StatusSelect row={r} /></td>
                <td className="px-4 py-3"><RemarkCell row={r} onAdd={() => { setFocusRemark(true); setOpenId(r.id); }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && <DetailCard row={open} focusRemark={focusRemark} onClose={() => setOpenId(null)} />}
    </>
  );
}

function DetailCard({ row, focusRemark, onClose }: { row: RequestRow; focusRemark: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [remark, setRemark] = useState("");
  const [pending, start] = useTransition();
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="req-title"
      className="m-auto w-[min(640px,calc(100vw-32px))] rounded-2xl border border-navy/10 bg-white p-0 text-navy shadow-2xl backdrop:bg-navy/50"
    >
      <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-6 py-5">
        <div>
          <h2 id="req-title" className="text-xl font-bold">{row.name}</h2>
          <p className="mt-1 text-xs text-slate-body">Received {row.created}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-navy/15 hover:bg-sand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>

      <div className="flex flex-col gap-5 px-6 py-5">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Item label="Email"><a href={`mailto:${row.email}`} className="break-all underline">{row.email}</a></Item>
          <Item label="Phone"><a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`} className="underline">{row.phone}</a></Item>
          <Item label="Service">{row.service}</Item>
          <Item label="Status"><StatusSelect row={row} large /></Item>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold tracking-[0.14em] text-slate-body">MESSAGE</dt>
            <dd className="mt-1 whitespace-pre-wrap rounded-md bg-sand p-3 leading-relaxed">{row.message || "—"}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-2">
          <label htmlFor="req-remark" className="text-xs font-semibold tracking-[0.14em] text-slate-body">ADD REMARK</label>
          <textarea id="req-remark" autoFocus={focusRemark} rows={3} maxLength={2000} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Write a note (e.g. called, follow up Monday)" className="field !h-auto !py-2.5 !text-sm" />
          <button
            type="button"
            disabled={pending || !remark.trim()}
            onClick={() =>
              start(async () => {
                await addRequestRemark(row.id, remark);
                setRemark("");
              })
            }
            className="btn btn-dark !h-10 w-fit cursor-pointer !px-5 !text-sm disabled:opacity-50"
          >
            {pending ? "Adding…" : "Add remark"}
          </button>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.14em] text-slate-body">REMARK HISTORY ({row.remarks.length})</h3>
          {row.remarks.length === 0 ? (
            <p className="mt-2 text-sm text-slate-body">No remarks yet.</p>
          ) : (
            <ol className="mt-4 max-h-64 overflow-y-auto pr-1">
              {row.remarks.map((m, i) => {
                const last = i === row.remarks.length - 1;
                return (
                  <li key={m.id} className="relative flex gap-4 pb-5 last:pb-0">
                    {!last && <span aria-hidden="true" className="absolute left-[7px] top-4 h-full w-0.5 bg-navy/15" />}
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${i === 0 ? "border-gold bg-gold" : "border-navy/30 bg-white"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <time dateTime={m.createdAt} className="text-xs font-semibold text-slate-body">
                        {fmtDateTime(m.createdAt)}
                        {i === 0 && <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] text-gold-ink">Latest</span>}
                      </time>
                      <p className={`mt-1 whitespace-pre-wrap rounded-md p-3 text-sm leading-relaxed ${i === 0 ? "bg-sand" : "bg-navy/[0.03]"}`}>
                        {m.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <div className="flex justify-end border-t border-navy/10 px-6 py-4">
        <button
          type="button"
          onClick={() => setAsking(true)}
          className="btn !h-10 cursor-pointer border border-red-300 !px-5 !text-sm text-red-700 hover:bg-red-50"
        >
          Delete request
        </button>
      </div>

      {asking && (
        <ConfirmDialog
          message={`The request from ${row.name} will be permanently deleted. This cannot be undone.`}
          busy={pending}
          onCancel={() => setAsking(false)}
          onConfirm={() =>
            start(async () => {
              await deleteRequest(row.id);
              onClose();
            })
          }
        />
      )}
    </dialog>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.14em] text-slate-body">{label.toUpperCase()}</dt>
      <dd className="mt-1 font-medium">{children}</dd>
    </div>
  );
}
