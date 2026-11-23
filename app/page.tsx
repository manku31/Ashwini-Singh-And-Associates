import { About } from "./_components/about";
import { Contact, Footer } from "./_components/contact-footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Pillars, Credentials } from "./_components/pillars";
import { Process } from "./_components/process";
import { CtaBand, Reviews } from "./_components/reviews";
import { Resources } from "./_components/resources";
import { ScrollEffects } from "./_components/scroll-effects";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <div id="scroll-progress" aria-hidden="true" />
      <ScrollEffects />
      <Header />
      <main>
        <Hero />
        <Credentials />
        <About />
        <Services />
        <Pillars />
        <Process />
        <Reviews />
        <Resources />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
