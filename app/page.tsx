import { About } from "./_components/about";
import { Contact, Footer } from "./_components/contact-footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Process, Testimonial } from "./_components/process";
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
        <About />
        <Services />
        <Process />
        <Testimonial />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
