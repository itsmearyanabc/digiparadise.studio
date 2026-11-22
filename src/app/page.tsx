import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { System } from "@/components/sections/System";
import { Services } from "@/components/sections/Services";
import { Split } from "@/components/sections/Split";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <System />
      <Services />
      <Split />
      <Work />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
