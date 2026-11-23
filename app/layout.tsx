import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "./_components/contact-footer";
import { Header } from "./_components/header";
import { ScrollEffects } from "./_components/scroll-effects";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Ashwini Singh and Associates | Chartered Accountants — Audit, Tax & Advisory",
    template: "%s | Ashwini Singh and Associates",
  },
  description:
    "Expert Chartered Accountancy, Audit, Tax and Advisory services for startups, MSMEs, corporates, professionals and NRIs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-screen">
        <div className="overflow-x-clip">
          <div id="scroll-progress" aria-hidden="true" />
          <ScrollEffects />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
