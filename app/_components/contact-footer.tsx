import { ContactForm } from "./contact-form";
import { Logo } from "./header";

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const details = [
  {
    label: "OFFICE",
    value: "[Office address, City, State – PIN]",
    icon: (<svg {...iconProps}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>),
  },
  {
    label: "PHONE",
    value: "[+91 XXXXX XXXXX]",
    icon: (<svg {...iconProps}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>),
  },
  {
    label: "EMAIL · HOURS",
    value: "[hello@yourdomain.in] · [Mon–Sat, office hours]",
    icon: (<svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>),
  },
];

export function Contact() {
  return (
    <section id="contact" className="wrap scroll-mt-20 py-16 sm:py-24 lg:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="flex flex-col lg:col-span-5">
          <p className="eyebrow mb-6">Contact us</p>
          <h2 className="h2">Book a consultation</h2>
          <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-slate-body">
            Tell us a little about what you need. We’ll respond within one working day to set up a conversation.
          </p>
          <ul className="mt-12 flex flex-col border-b border-navy/10">
            {details.map((d) => (
              <li key={d.label} className="flex gap-[18px] border-t border-navy/10 py-[22px]">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-mid">
                  {d.icon}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs font-semibold tracking-[0.16em] text-slate-body">{d.label}</span>
                  <span className="break-words text-base font-semibold">{d.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

const footerCols = [
  { title: "FIRM", links: ["About Us", "Our Team", "Careers", "Contact Us"] },
  { title: "SERVICES", links: ["Audit & Assurance", "Tax Advisory", "GST & Indirect Tax", "Corporate Finance", "Virtual CFO"] },
  { title: "RESOURCES", links: ["Insights", "Compliance calendar", "FAQs"] },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap pb-8 pt-14 lg:pb-10 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-12 sm:grid-cols-3 lg:grid-cols-12 lg:gap-6 lg:pb-16">
          <div className="col-span-2 flex flex-col gap-6 sm:col-span-3 lg:col-span-4">
            <Logo dark />
            <p className="max-w-[340px] text-[15px] leading-relaxed text-white/75">
              Chartered Accountants providing audit, tax and advisory services to businesses and individuals.
            </p>
            <a href="#contact" className="btn btn-gold !h-12 w-full !px-[22px] !text-sm sm:w-auto sm:self-start">
              Book a Consultation
            </a>
          </div>
          {footerCols.map((c, i) => (
            <nav
              key={c.title}
              aria-label={`Footer — ${c.title.toLowerCase()}`}
              className={`flex flex-col gap-1 text-sm [&>a]:py-1.5 lg:gap-3.5 lg:[&>a]:py-0 ${["lg:col-span-2 lg:col-start-6", "lg:col-span-3 lg:col-start-8", "lg:col-span-2 lg:col-start-11"][i]}`}
            >
              <span className="mb-1.5 text-xs font-semibold tracking-[0.2em] text-gold-light">{c.title}</span>
              {c.links.map((l) => (
                <a key={l} href="#top" className="text-white/75 hover:text-white">
                  {l}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-x-10 gap-y-4 pt-8 text-[13px] leading-relaxed text-white/70">
          <span>© 2026 Ashwini Singh and Associates, Chartered Accountants. [Firm Registration No.]</span>
          <span className="max-w-[640px]">
            Disclaimer: In line with ICAI guidelines, this website provides information only and does not solicit work or advertise services.
          </span>
        </div>
      </div>
    </footer>
  );
}
