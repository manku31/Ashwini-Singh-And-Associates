"use client";

import { useState } from "react";

const serviceOptions = [
  "Audit & Assurance",
  "Tax Advisory",
  "GST & Indirect Tax",
  "Corporate Finance",
  "Company Law & Compliance",
  "Virtual CFO & Advisory",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to an API route / email service.
        setSent(true);
      }}
      className="grid gap-x-5 gap-y-[22px] rounded-xl border border-navy/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] sm:grid-cols-2 sm:p-12"
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
        <select id="f-svc" name="service" className="field">
          {serviceOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
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
      <button type="submit" className="btn btn-dark h-14 cursor-pointer sm:col-span-2">
        Request a Consultation
      </button>
      <p role="status" className="text-sm font-medium text-gold-ink sm:col-span-2">
        {sent ? "Thank you — we’ll get back to you within one working day." : ""}
      </p>
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
