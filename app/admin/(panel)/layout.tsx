import { Suspense } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { logout } from "../actions";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

async function AdminEmail() {
  return <span className="hidden sm:inline">{await requireAdmin()}</span>;
}

// Auth gate lives inside Suspense so the tab bar renders instantly while the session is checked.
async function Gate({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
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
          <Suspense fallback={null}><AdminEmail /></Suspense>
          <button type="submit" className="btn btn-outline !h-10 cursor-pointer !px-4 !text-sm">Sign out</button>
        </form>
      </div>
      <Suspense fallback={null}>
        <Gate>{children}</Gate>
      </Suspense>
    </div>
  );
}
