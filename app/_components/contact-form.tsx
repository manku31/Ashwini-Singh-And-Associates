"use client";

import { useState, useTransition } from "react";
import { submitContact } from "../actions";

const serviceOptions = [
  "Audit & Assurance",
  "Tax Advisory",
  "GST & Indirect Tax",
  "Corporate Finance",
  "Company Law & Compliance",
  "Virtual CFO & Advisory",
  "Other",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState(serviceOptions[0]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-navy/10 bg-white p-8 text-center shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] sm:p-12"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="text-[22px] font-bold">Request submitted</h3>
        <p className="max-w-md text-sm text-slate-body">
          Thank you — we’ve received your details and will get back to you within one working day.
        </p>
        <button
          type="button"
          onClick={() => {
            setService(serviceOptions[0]);
            setSent(false);
          }}
          className="btn btn-dark mt-2 h-12 cursor-pointer px-6"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        setError("");
        startTransition(async () => {
          const res = await submitContact(data);
          if (res.ok) {
            form.reset();
            setSent(true);
          } else {
            setError(res.error);
          }
        });
      }}
      className="grid gap-x-5 gap-y-[22px] rounded-xl border border-navy/10 bg-white p-5 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] sm:grid-cols-2 sm:p-12"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="text-[22px] font-bold">Request a callback</span>
        <span className="text-sm text-slate-body">All fields marked * are required.</span>
      </div>
      <Field id="f-name" label="Full name *">
        <input id="f-name" name="name" required className="field" type="text" placeholder="Your name" autoComplete="name" />
      </Field>
      <Field id="f-phone" label="Phone *">
        <input id="f-phone" name="phone" required className="field" type="tel" placeholder="+91" autoComplete="tel" />
      </Field>
      <Field id="f-email" label="Email *">
        <input id="f-email" name="email" required className="field" type="email" placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field id="f-svc" label="Service">
        <select id="f-svc" name="service" className="field" value={service} onChange={(e) => setService(e.target.value)}>
          {serviceOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      {service === "Other" && (
        <div className="sm:col-span-2">
          <Field id="f-other" label="Please specify the service *">
            <input id="f-other" name="otherService" required className="field" type="text" placeholder="Tell us what you need" />
          </Field>
        </div>
      )}
      <div className="sm:col-span-2">
        <Field id="f-msg" label="How can we help?">
          <textarea id="f-msg" name="message" rows={4} className="field !h-32 resize-y !py-3.5" placeholder="A few lines about your requirement" />
        </Field>
      </div>
      <div className="flex items-start gap-2.5 sm:col-span-2">
        <input id="f-ok" name="consent" required type="checkbox" className="mt-0.5 h-[18px] w-[18px] accent-navy" />
        <label htmlFor="f-ok" className="text-[13px] leading-normal text-slate-body">
          I agree to be contacted about my enquiry. Your details stay confidential.
        </label>
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-700 sm:col-span-2">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-dark h-14 cursor-pointer disabled:opacity-60 sm:col-span-2">
        {pending ? "Sending…" : "Request a Consultation"}
      </button>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}
