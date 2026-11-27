"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Logo link: on the home page it scrolls to the very top (and clears any #hash) instead of letting the router pick a section. */
export function HomeLink({ children, ...props }: Omit<React.ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href="/"
      onClick={(e) => {
        if (pathname !== "/") return;
        e.preventDefault();
        if (window.location.hash) history.replaceState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
