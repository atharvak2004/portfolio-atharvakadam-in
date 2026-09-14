import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CaseStudy from "@/components/CaseStudy";
import Capabilities from "@/components/Capabilities";
import Journal from "@/components/Journal";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <main className="frame">
      
        <Navbar />
        <Hero />
        <Stats />
        <CaseStudy />
        <Capabilities />
        <Journal />
        <Testimonials />
        <FAQ />
        <CTAFooter />
    </main>
  );
}
