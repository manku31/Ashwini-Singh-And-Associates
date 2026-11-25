"use client";

import { useActionState } from "react";
import { login, type AdminFormState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<AdminFormState, FormData>(login, {});
  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="a-email" className="text-[13px] font-semibold">Email</label>
        <input id="a-email" name="email" type="email" required autoComplete="username" className="field" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="a-pw" className="text-[13px] font-semibold">Password</label>
        <input id="a-pw" name="password" type="password" required autoComplete="current-password" className="field" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn btn-dark h-12 cursor-pointer disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
