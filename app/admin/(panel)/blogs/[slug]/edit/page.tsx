import { notFound } from "next/navigation";
import { adminAllPosts, adminUploads } from "@/lib/admin-data";
import { COVER_IMAGES, sectionsToText } from "@/lib/blog-content";
import { PostForm } from "../../new/post-form";

// Per-request, session-gated admin page: opt out of instant-navigation validation.
export const instant = false;

export default async function EditPostPage({ params }: PageProps<"/admin/blogs/[slug]/edit">) {
  const { slug } = await params;
  const [all, library] = await Promise.all([adminAllPosts(), adminUploads()]);
  const entry = all.find((e) => e.post.slug === slug);
  if (!entry) notFound();
  const p = entry.post;
  return (
    <>
      <h1 className="text-[28px] font-bold">Edit post</h1>
      <p className="mb-6 mt-1 text-sm text-slate-body">
        {entry.origin === "builtin"
          ? "This is a built-in post. Saving creates an edited copy on the site; the original can be restored any time."
          : `/blog/${p.slug}`}
      </p>
      <PostForm
        library={library}
        existing={COVER_IMAGES}
        initial={{
          slug: p.slug, title: p.title, category: p.category, author: p.author,
          excerpt: p.excerpt, images: [p.image, ...(p.gallery ?? [])], body: sectionsToText(p.sections, [p.image, ...(p.gallery ?? [])]),
          date: p.date, sections: p.sections,
        }}
      />
    </>
  );
}
