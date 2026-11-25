import { adminSubscribers } from "@/lib/admin-data";
import { fmtDateTime } from "@/lib/format";
import { ConfirmButton } from "../../confirm-button";
import { deleteSubscriber } from "../../actions";

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function SubscribersPage() {
  const subs = await adminSubscribers();
  return (
    <>
      <h1 className="text-[28px] font-bold">Newsletter subscribers <span className="text-slate-body">({subs.length})</span></h1>
      {subs.length === 0 ? (
        <p className="mt-6 rounded-xl border border-navy/10 bg-white p-8 text-center text-sm text-slate-body">No subscribers yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-sand text-xs tracking-[0.14em] text-slate-body">
              <tr>
                <th scope="col" className="w-14 px-5 py-3 font-semibold">#</th>
                <th scope="col" className="px-5 py-3 font-semibold">EMAIL</th>
                <th scope="col" className="px-5 py-3 font-semibold">SUBSCRIBED ON</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {subs.map((s, i) => (
                <tr key={s.id}>
                  <td className="px-5 py-3.5 text-slate-body">{i + 1}</td>
                  <td className="px-5 py-3.5 font-medium"><a href={`mailto:${s.email}`} className="break-all underline">{s.email}</a></td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-slate-body"><time dateTime={s.createdAt}>{fmtDateTime(s.createdAt)}</time></td>
                  <td className="px-5 py-3.5 text-right">
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={s.id} />
                      <ConfirmButton message={`Remove ${s.email} from the list?`} className="cursor-pointer font-semibold text-red-700 underline">
                        Delete
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
