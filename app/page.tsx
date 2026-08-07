import Hero from "@/sections/Hero";
import Experience from "@/sections/Experience";
import VideoWorks from "@/sections/VideoWorks";
import DigitalSystems from "@/sections/DigitalSystems";
import Campaigns from "@/sections/Campaigns";
import Skills from "@/sections/Skills";
import ContactCTA from "@/sections/ContactCTA";
import SectionPager from "@/components/SectionPager";

export default function Home() {
  return (
    <SectionPager>
      <Hero />
      <Experience />
      <VideoWorks />
      <DigitalSystems />
      <Campaigns />
      <Skills />
      <ContactCTA />
    </SectionPager>
  );
}
