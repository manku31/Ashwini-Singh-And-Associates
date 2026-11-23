import { About } from "./_components/about";
import { Hero } from "./_components/hero";
import { Credentials, Pillars } from "./_components/pillars";
import { Process } from "./_components/process";
import { CtaBand, Reviews } from "./_components/reviews";
import { Services, WhyUs } from "./_components/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Credentials />
      <About />
      <Services />
      <WhyUs />
      <Pillars />
      <Process />
      <Reviews />
      <CtaBand />
    </>
  );
}
