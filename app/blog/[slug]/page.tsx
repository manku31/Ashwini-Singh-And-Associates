import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "../../_components/page-hero";
import { CtaBand } from "../../_components/reviews";
import { blogPosts } from "../data";
import { ArticleToc } from "../article-toc";
import { ShareButtons } from "../share-buttons";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

const slugify = (h: string) =>
  h
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Params = PageProps<"/blog/[slug]">["params"];

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense
        fallback={
          <div aria-busy="true" className="wrap py-24">
            <div className="h-12 max-w-xl animate-pulse rounded-md bg-navy/10" />
          </div>
        }
      >
        <PostContent params={params} />
      </Suspense>
      <CtaBand />
    </>
  );
}

async function PostContent({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = blogPosts.findIndex((p) => p.slug === slug);
  const prev = blogPosts[idx - 1];
  const next = blogPosts[idx + 1];
  const more = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const toc = post.sections.map((s) => ({
    id: slugify(s.heading),
    label: s.heading,
  }));
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        text={`${post.author} · ${date} · ${post.readTime}`}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <div className="wrap -mt-2 pt-10">
        <Image
          src={post.image}
          alt=""
          width={1200}
          height={750}
          priority
          className="aspect-[21/9] w-full rounded-2xl object-cover shadow-xl"
        />
      </div>

      <article className="wrap py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              <ArticleToc items={toc} />
              <div className="rounded-xl border border-navy/10 bg-white p-6">
                <h3 className="text-sm font-bold tracking-[0.16em] text-slate-body">
                  WRITTEN BY
                </h3>
                <div className="mt-4 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-serif text-lg text-gold-light"
                  >
                    {post.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-slate-body">
                      Chartered Accountant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div id="article-body" className="order-1 lg:order-2 lg:col-span-8">
            <p className="border-l-4 border-gold pl-6 font-serif text-2xl leading-[1.5] text-navy">
              {post.excerpt}
            </p>

            {post.sections.map((s, i) => (
              <section
                key={s.heading}
                id={slugify(s.heading)}
                className="scroll-mt-28 mt-14"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl italic text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {s.heading}
                  </h2>
                </div>
                {s.paragraphs.map((t) => (
                  <p
                    key={t}
                    className="mt-5 text-[18px] leading-[1.85] text-slate-body"
                  >
                    {t}
                  </p>
                ))}
                {s.points && (
                  <ul className="mt-6 flex flex-col gap-3 rounded-xl bg-sand p-6">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-3 text-[16px] leading-relaxed"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="mt-1 h-5 w-5 shrink-0 text-gold-mid"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <ShareButtons title={post.title} />

            <div className="mt-10 rounded-2xl bg-navy p-8 text-white sm:p-10">
              <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
                Need help with this?
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-white/75">
                Talk to a CA. Free first call, and we reply within one working
                day.
              </p>
              <Link href="/contact" className="btn btn-gold mt-6">
                Book a Consultation
              </Link>
            </div>

            <nav
              aria-label="Previous and next article"
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="card group rounded-xl border border-navy/10 bg-white p-5"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-slate-body">
                    ← PREVIOUS
                  </span>
                  <span className="mt-2 block font-bold leading-snug group-hover:text-gold-ink">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="card group rounded-xl border border-navy/10 bg-white p-5 sm:col-start-2 sm:text-right"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-slate-body">
                    NEXT →
                  </span>
                  <span className="mt-2 block font-bold leading-snug group-hover:text-gold-ink">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>

        <div className="mt-20 border-t border-navy/10 pt-12">
          <h2 className="text-2xl font-bold">More articles</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="thumb-wrap card group flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-white"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="thumb object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <span className="text-xs font-semibold tracking-[0.18em] text-gold-ink">
                    {p.category.toUpperCase()}
                  </span>
                  <span className="text-lg font-bold leading-snug group-hover:text-gold-ink">
                    {p.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
