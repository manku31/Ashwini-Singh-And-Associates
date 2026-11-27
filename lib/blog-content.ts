import type { BlogPost } from "@/app/blog/data";

/** Inline image marker inside a paragraph: `[[img:/path/to/image.svg]]` (renders the image in that spot). */
export const IMG_TOKEN = /^\[\[img:(\/[^\]]+)\]\]$/;

/** Image URLs that the article places inline. */
export const placedImages = (sections: BlogPost["sections"]) =>
  new Set(sections.flatMap((s) => s.paragraphs.map((p) => IMG_TOKEN.exec(p)?.[1]).filter((u): u is string => !!u)));
