import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "../../_components/page-hero";
import { Process } from "../../_components/process";
import { CtaBand } from "../../_components/reviews";
import { serviceDetails, services } from "../../data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.text } : {};
}

type Params = PageProps<"/services/[slug]">["params"];

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <>
      <Suspense fallback={<ServiceFallback />}>
        <ServiceContent params={params} />
      </Suspense>
      <Process />
      <CtaBand />
    </>
  );
}

function ServiceFallback() {
  return (
    <div aria-busy="true">
      <section className="border-b border-navy/10 bg-sand">
        <div className="wrap py-14 sm:py-20 lg:py-24">
          <p className="eyebrow mb-6">Service</p>
          <div className="h-12 max-w-xl animate-pulse rounded-md bg-navy/10 sm:h-14" />
          <div className="mt-6 h-5 max-w-2xl animate-pulse rounded bg-navy/10" />
        </div>
      </section>
      <section className="wrap py-16 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="h-8 w-40 animate-pulse rounded bg-navy/10" />
            <div className="h-4 w-full animate-pulse rounded bg-navy/10" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-navy/10" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-navy/10" />
          </div>
          <div className="h-56 animate-pulse rounded-xl bg-navy/10 lg:col-span-4 lg:col-start-9" />
        </div>
      </section>
    </div>
  );
}

async function ServiceContent({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        text={service.text}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <section className="wrap py-16 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="lg:col-span-7">
            <h2 className="h2">Overview</h2>
            <p className="mt-6 text-lg leading-[1.7] text-slate-body">{detail.intro}</p>

            <h3 className="mt-12 text-xl font-bold">What is included</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {detail.includes.map((i) => (
                <li key={i} className="flex gap-3 border-t border-navy/10 pt-3 text-[15px] leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {i}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-xl font-bold">Who it is for</h3>
            <ul className="mt-5 flex flex-wrap gap-3">
              {detail.whoFor.map((w) => (
                <li key={w} className="rounded-full border border-gold/50 bg-white px-4 py-2 text-sm font-medium text-gold-ink">
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <aside data-reveal className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="rounded-xl bg-navy p-8 text-white">
                <h3 className="font-serif text-2xl font-semibold">Talk to a CA about {service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">Free first call. We reply within one working day.</p>
                <Link href="/contact" className="btn btn-gold mt-6 w-full">Book a Consultation</Link>
              </div>
              <div className="rounded-xl border border-navy/10 bg-white p-6">
                <h3 className="text-sm font-bold tracking-[0.16em] text-slate-body">OTHER SERVICES</h3>
                <ul className="mt-4 flex flex-col">
                  {others.map((o) => (
                    <li key={o.slug} className="border-t border-navy/10 first:border-0">
                      <Link href={`/services/${o.slug}`} className="flex items-center justify-between gap-3 py-3 text-[15px] font-medium hover:text-gold-ink">
                        {o.title}
                        <span aria-hidden="true" className="text-gold-mid">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
