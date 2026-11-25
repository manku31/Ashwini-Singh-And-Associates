import { Suspense } from "react";
import { redirect } from "next/navigation";
import { adminConfigured, getAdmin } from "@/lib/session";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="wrap py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-xl border border-navy/10 bg-white p-8 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] sm:p-10">
        <h1 className="text-[26px] font-bold">Admin sign in</h1>
        <p className="mb-7 mt-2 text-sm text-slate-body">Authorised staff only.</p>
        <Suspense fallback={<div aria-busy="true" className="h-[250px] animate-pulse rounded-md bg-navy/5" />}>
          <LoginBody />
        </Suspense>
      </div>
    </div>
  );
}

async function LoginBody() {
  if (await getAdmin()) redirect("/admin");
  return adminConfigured() ? (
    <LoginForm />
  ) : (
    <p role="alert" className="rounded-md bg-sand p-4 text-sm text-slate-body">
      Admin access isn’t configured. Add <code>ADMIN_USERS=email:password</code> to <code>.env.local</code> and restart the
      server.
    </p>
  );
}
