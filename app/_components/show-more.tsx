import Link from "next/link";
import { Arrow } from "./hero";

/** "Show more" button that sends the visitor to the full page for a section. */
export function ShowMore({ href, label, hint }: { href: string; label: string; hint?: string }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 text-center">
      <Link href={href} className="btn btn-outline">
        {label} <Arrow />
      </Link>
      {hint && <p className="text-sm text-slate-body">{hint}</p>}
    </div>
  );
}
