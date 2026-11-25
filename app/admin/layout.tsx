import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Admin pages are per-request (session cookie) and never prefetched as a static shell.
export const instant = false;

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="wrap min-h-[60vh] py-20" />}>
      {children}
    </Suspense>
  );
}
