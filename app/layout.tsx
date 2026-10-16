import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://atharvakadam.in";
const SITE_NAME = "Atharva Kadam";

const TITLE = "Atharva Kadam | Full-Stack Developer in Pune";
const DESCRIPTION =
  "Atharva Kadam is a full-stack developer in Pune, India. I build fast, SEO-friendly web apps with Next.js, React, TypeScript and Django. Get in touch to work together.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Atharva Kadam",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Atharva Kadam",
    "Atharva",
    "full-stack developer in Pune",
    "software developer in Pune",
    "web developer in Pune",
    "Next.js developer in Pune",
    "React developer in Pune",
    "full-stack developer India",
    "Next.js developer India",
    "Django developer",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        // Create a 1200x630 image and put it at /public/og-image.png
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atharva Kadam, full-stack developer in Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // After adding the site in Google Search Console, paste the token here:
  // verification: { google: "YOUR_TOKEN" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}