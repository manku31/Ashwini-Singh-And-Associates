"use client";

import Image from "next/image";
import { useActionState, useMemo, useRef, useState } from "react";
import type { BlogPost } from "@/app/blog/data";
import { imageRefProblem, parseSections, readTime } from "@/lib/blog-content";

const MAX_IMAGES = 3;
const imageLabel = (u: string) =>
  (u.split("/").pop() ?? u).replace(/\.\w+$/, "").replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
import { PostPreview, type PreviewData } from "./post-preview";
import { ConfirmDialog } from "../../../confirm-dialog";
import { createPost, deleteUpload, updatePost, type AdminFormState } from "../../../actions";

export type PostFormInitial = {
  slug: string; title: string; category: string; author: string; excerpt: string; images: string[]; body: string;
  date: string; sections: BlogPost["sections"];
};

export function PostForm({ library: initialLibrary, existing, initial }: { library: string[]; existing: string[]; initial?: PostFormInitial }) {
  const [state, action, pending] = useActionState<AdminFormState, FormData>(initial ? updatePost : createPost, {});
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Ashwini Singh");
  const [selected, setSelected] = useState<string[]>(initial?.images ?? []);
  const [library, setLibrary] = useState<string[]>(() => [
    ...new Set([...(initial?.images ?? []).filter((u) => u.startsWith("/uploads/")), ...initialLibrary]),
  ]);
  // site images already in use (built-in covers etc.), selectable but never deletable
  const existingImages = [...new Set([...existing, ...(initial?.images ?? []).filter((u) => !u.startsWith("/uploads/"))])];
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const refProblem = imageRefProblem(body, selected.length);

  const toggle = (url: string) =>
    setSelected((cur) =>
      cur.includes(url) ? cur.filter((u) => u !== url) : cur.length >= MAX_IMAGES ? cur : [...cur, url],
    );

  function insertImage(n: number) {
    const el = bodyRef.current;
    const at = el?.selectionStart ?? body.length;
    const before = body.slice(0, at);
    const after = body.slice(el?.selectionEnd ?? at);
    const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    const tag = `${lead}[image ${n}]\n\n`;
    setBody(before + tag + after);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(before.length + tag.length, before.length + tag.length);
    });
  }

  async function confirmRemove() {
    if (!removing) return;
    setRemoveBusy(true);
    const res = await deleteUpload(removing);
    setRemoveBusy(false);
    if (res.ok) {
      setLibrary((l) => l.filter((u) => u !== removing));
      setSelected((cur) => cur.filter((u) => u !== removing));
      setUploadError("");
    } else {
      setUploadError(res.error);
    }
    setRemoving(null);
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploadError("");
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed.");
        setLibrary((l) => [data.url, ...l]);
        setSelected((cur) => (cur.length >= MAX_IMAGES ? cur : [...cur, data.url]));
      } catch (e) {
        setUploadError(e instanceof Error ? e.message : "Upload failed.");
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const preview = useMemo<PreviewData>(() => {
    const parsed = parseSections(body, selected);
    // keep inline images of the original post (same matching rule as saving)
    const sections =
      parsed && initial
        ? parsed.map((s, i) => {
            const old = initial.sections.find((o) => o.heading.toLowerCase() === s.heading.toLowerCase()) ?? initial.sections[i];
            return old?.images?.length ? { ...s, images: old.images } : s;
          })
        : parsed;
    return {
      title, category, author, excerpt, images: selected, sections,
      hasBody: body.trim() !== "",
      date: initial
        ? new Date(initial.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : "Published today",
      readTime: sections ? readTime(sections) : "1 min read",
    };
  }, [title, category, author, excerpt, selected, body, initial]);

  const renderGrid = (urls: string[], label: string) => (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label={label}>
      {urls.map((u) => {
        const n = selected.indexOf(u) + 1;
        const full = !n && selected.length >= MAX_IMAGES;
        return (
          <li key={u} className="relative">
            <button
              type="button"
              onClick={() => toggle(u)}
              disabled={full}
              aria-pressed={n > 0}
              aria-label={n ? `Selected image ${n}. Click to remove` : "Select image"}
              className={`relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border-2 ${n ? "border-gold ring-2 ring-gold/30" : "border-navy/10"} ${full ? "cursor-not-allowed opacity-40" : ""}`}
            >
              <Image src={u} alt="" fill sizes="160px" className="object-cover" />
              {n > 0 && (
                <span className="absolute left-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-navy px-1.5 text-xs font-bold text-white">
                  {n === 1 ? "Cover" : n}
                </span>
              )}
            </button>
            {u.startsWith("/uploads/") && (
              <button
                type="button"
                onClick={() => setRemoving(u)}
                aria-label="Delete this uploaded image"
                title="Delete this image"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:rounded-xl">
        <PostPreview d={preview} />
      </div>

      <form action={action} className="order-1 grid gap-5 rounded-xl border border-navy/10 bg-white p-5 sm:grid-cols-2 sm:p-6 lg:order-2">
        {initial && <input type="hidden" name="slug" value={initial.slug} />}
        <Field id="p-title" label="Title *" wide>
          <input id="p-title" name="title" required maxLength={160} value={title} onChange={(e) => setTitle(e.target.value)} className="field" />
        </Field>
        <Field id="p-cat" label="Category *">
          <input id="p-cat" name="category" required maxLength={40} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="GST, Income Tax, Audit…" className="field" />
        </Field>
        <Field id="p-author" label="Author *">
          <input id="p-author" name="author" required maxLength={80} value={author} onChange={(e) => setAuthor(e.target.value)} className="field" />
        </Field>
        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] font-semibold">
              Images * <span className="font-normal text-slate-body">(choose 1 to 3 · first is the cover)</span>
            </span>
            <span className="text-xs font-semibold text-slate-body">{selected.length} / {MAX_IMAGES} selected</span>
          </div>
          {selected.map((u) => <input key={u} type="hidden" name="images" value={u} />)}

          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="sr-only" id="p-upload" onChange={(e) => upload(e.target.files)} />
          <label
            htmlFor="p-upload"
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-navy/20 bg-cream px-4 py-6 text-center text-sm hover:border-gold ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <span className="font-semibold text-gold-ink">{uploading ? "Uploading…" : "+ Upload a new image"}</span>
            <span className="text-xs text-slate-body">JPG, PNG, WebP or GIF · up to 5 MB each · saved on this server</span>
          </label>
          {uploadError && <p role="alert" className="text-sm font-semibold text-red-700">{uploadError}</p>}

          {library.length > 0 && (
            <>
              <h3 className="text-xs font-semibold tracking-[0.14em] text-slate-body">YOUR UPLOADS</h3>
              {renderGrid(library, "Your uploaded images")}
            </>
          )}
          {existingImages.length > 0 && (
            <div className="flex flex-col gap-3">
              <label htmlFor="p-existing" className="text-xs font-semibold tracking-[0.14em] text-slate-body">
                OR CHOOSE AN EXISTING SITE IMAGE
              </label>
              <select
                id="p-existing"
                value=""
                disabled={selected.length >= MAX_IMAGES}
                onChange={(e) => e.target.value && toggle(e.target.value)}
                className="field cursor-pointer"
              >
                <option value="">
                  {selected.length >= MAX_IMAGES ? "Maximum of 3 images selected" : "Select an image…"}
                </option>
                {existingImages
                  .filter((u) => !selected.includes(u))
                  .map((u) => (
                    <option key={u} value={u}>
                      {imageLabel(u)}
                    </option>
                  ))}
              </select>
              {existingImages.some((u) => selected.includes(u)) &&
                renderGrid(existingImages.filter((u) => selected.includes(u)), "Selected site images")}
            </div>
          )}
          {selected.length === 0 && <p className="text-xs text-slate-body">Upload or select at least one image to publish.</p>}
        </div>
        <Field id="p-excerpt" label="Summary * (shown on the blog list)" wide>
          <textarea id="p-excerpt" name="excerpt" required maxLength={300} rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="field !h-auto !py-3" />
        </Field>
        <Field id="p-body" label="Article *" wide>
          <textarea
            id="p-body"
            name="body"
            ref={bodyRef}
            required
            rows={16}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"## First section heading\nWrite a paragraph here.\n\nBlank line starts a new paragraph.\n- Lines starting with “- ” become bullet points\n\n## Second section heading\nMore text…"}
            className="field !h-auto !py-3 font-mono !text-sm"
          />
          <span className="text-xs text-slate-body">
            Start each section with <code>## Heading</code>. Blank line = new paragraph. <code>- text</code> = bullet.
            Put <code>[image 2]</code> or <code>[image 3]</code> on its own line to show that image right there.
          </span>
          {selected.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-body">Insert at cursor:</span>
              {selected.slice(1).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => insertImage(i + 2)}
                  className="cursor-pointer rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold-ink hover:bg-sand"
                >
                  + [image {i + 2}]
                </button>
              ))}
            </div>
          )}
          {refProblem && <p role="alert" className="text-xs font-semibold text-red-700">{refProblem}</p>}
        </Field>
        {state.error && <p role="alert" className="text-sm font-semibold text-red-700 sm:col-span-2">{state.error}</p>}
        <button type="submit" disabled={pending || selected.length < 1 || !!refProblem} className="btn btn-dark h-12 cursor-pointer disabled:opacity-60 sm:col-span-2">
          {pending ? "Saving…" : initial ? "Save changes" : "Publish post"}
        </button>
      </form>

      {removing && (
        <ConfirmDialog
          title="Delete this image?"
          message="The image will be permanently deleted from the server. Other selected images keep their order."
          busy={removeBusy}
          onCancel={() => setRemoving(null)}
          onConfirm={confirmRemove}
        />
      )}
    </div>
  );
}

function Field({ id, label, wide, children }: { id: string; label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-[13px] font-semibold">{label}</label>
      {children}
    </div>
  );
}
