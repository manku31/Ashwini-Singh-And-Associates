"use client";

import { useEffect } from "react";
import { recordView } from "../actions";

/** Records one view per browser tab session. */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: count anyway */
    }
    void recordView(slug);
  }, [slug]);
  return null;
}
