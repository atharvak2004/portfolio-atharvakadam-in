import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CaseStudy from "@/components/CaseStudy";
import Capabilities from "@/components/Capabilities";
import Journal from "@/components/Journal";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAFooter from "@/components/CTAFooter";
import WorkAndEducation from "@/components/WorkAndEducation";

const SITE_URL = "https://atharvakadam.in";

/* Structured data: helps Google connect the name "Atharva Kadam" to this site */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Atharva Kadam",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Atharva Kadam",
      givenName: "Atharva",
      familyName: "Kadam",
      url: SITE_URL,
      image: `${SITE_URL}/atharva-kadam-software-developer.png`,
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer in Pune, India building web applications with Next.js, React, TypeScript and Django.",
      worksFor: {
        "@type": "Organization",
        name: "Prushal Technology",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "G.H. Raisoni College of Engineering",
        address: { "@type": "PostalAddress", addressLocality: "Pune" },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Redux",
        "GraphQL",
        "Django REST Framework",
        "Web development",
      ],
      // Add your real profile URLs here. These are the strongest signal that
      // all of these accounts belong to the same person.
      sameAs: [
        // "https://www.linkedin.com/in/your-handle",
        // "https://github.com/your-handle",
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />
      <Hero />
      <Stats />
      <CaseStudy />
      <Capabilities />
      <WorkAndEducation />
      <Journal />
      {/* <FAQ /> */}
      {/* <Testimonials /> */}
      <CTAFooter />
    </main>
  );
}