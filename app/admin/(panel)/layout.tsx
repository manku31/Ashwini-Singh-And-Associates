import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { logout } from "../actions";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const email = await requireAdmin();
  return (
    <div className="wrap py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <nav aria-label="Admin" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium hover:border-gold hover:text-gold-ink">
              {t.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="flex items-center gap-3 text-sm text-slate-body">
          <span className="hidden sm:inline">{email}</span>
          <button type="submit" className="btn btn-outline !h-10 cursor-pointer !px-4 !text-sm">Sign out</button>
        </form>
      </div>
      {children}
    </div>
  );
}
