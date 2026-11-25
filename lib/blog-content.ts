import type { BlogPost } from "@/app/blog/data";

const MAX_SECTIONS = 30;

/**
 * Plain-text article format used by the admin editor:
 *   ## Section heading
 *   A paragraph (blank line between paragraphs)
 *   - a bullet point
 */
export const IMG_TOKEN = /^\[\[img:(\/[^\]]+)\]\]$/;
const IMG_REF = /^\[image\s*(\d+)\]$/i;

/** Problems with `[image N]` placeholders in the article (N=1 is the cover, so use 2 or 3). */
export function imageRefProblem(body: string, imageCount: number): string | null {
  const seen = new Set<number>();
  for (const line of body.split("\n")) {
    const m = IMG_REF.exec(line.trim());
    if (!m) continue;
    const n = Number(m[1]);
    if (n === 1) return "[image 1] is the cover and is already shown at the top. Use [image 2] or [image 3].";
    if (n > imageCount) return `[image ${n}] needs ${n} selected images, but only ${imageCount} are selected.`;
    if (seen.has(n)) return `[image ${n}] is placed more than once.`;
    seen.add(n);
  }
  return null;
}

/** Image URLs that the article places inline. */
export const placedImages = (sections: BlogPost["sections"]) =>
  new Set(sections.flatMap((s) => s.paragraphs.map((p) => IMG_TOKEN.exec(p)?.[1]).filter((u): u is string => !!u)));

export function parseSections(body: string, images: string[] = []): BlogPost["sections"] | null {
  const sections: BlogPost["sections"] = [];
  let cur: BlogPost["sections"][number] | null = null;
  let para: string[] = [];
  const flush = () => {
    if (cur && para.length) cur.paragraphs.push(para.join(" "));
    para = [];
  };
  for (const raw of body.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    const h = /^##\s+(.+)$/.exec(line);
    if (h) {
      flush();
      cur = { heading: h[1].trim(), paragraphs: [] };
      sections.push(cur);
    } else if (!cur) {
      if (line) return null; // text before the first heading
    } else if (IMG_REF.test(line)) {
      flush();
      const url = images[Number(IMG_REF.exec(line)![1]) - 1];
      if (url && Number(IMG_REF.exec(line)![1]) > 1) cur.paragraphs.push(`[[img:${url}]]`);
    } else if (/^[-*]\s+/.test(line)) {
      flush();
      (cur.points ??= []).push(line.replace(/^[-*]\s+/, ""));
    } else if (line === "") {
      flush();
    } else {
      para.push(line);
    }
  }
  flush();
  if (!sections.length || sections.length > MAX_SECTIONS) return null;
  if (sections.some((s) => !s.paragraphs.length)) return null;
  return sections;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

export function readTime(sections: BlogPost["sections"]) {
  const words = sections
    .flatMap((s) => [s.heading, ...s.paragraphs.filter((p) => !IMG_TOKEN.test(p)), ...(s.points ?? [])])
    .join(" ")
    .split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export const COVER_IMAGES = [
  "gst-notice", "gst-portal", "gst-reconcile", "gst-documents", "tax-regime", "regime-calc",
  "regime-chart", "tds-basics", "nri-tax", "startup-compliance", "audit-readiness",
].map((n) => `/images/blog/${n}.svg`);

export function sectionsToText(sections: BlogPost["sections"], images: string[] = []): string {
  return sections
    .map((s) =>
      [`## ${s.heading}`, ...s.paragraphs.flatMap((p) => {
          const url = IMG_TOKEN.exec(p)?.[1];
          const n = url ? images.indexOf(url) + 1 : 0;
          return url ? (n > 1 ? [`[image ${n}]`, ""] : []) : [p, ""];
        }), ...(s.points ?? []).map((pt) => `- ${pt}`)]
        .join("\n")
        .trim(),
    )
    .join("\n\n");
}
