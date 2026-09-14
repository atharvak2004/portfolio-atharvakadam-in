"use client";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-black/10">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        {/* Logo + status */}
        <div className="h-10 w-10 overflow-hidden rounded-lg border border-black/10 bg-white">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden items-center font-mono text-base md:flex">
          {links.map((link, i) => (
            <div key={link.label} className="flex items-center">
              <a
                href={link.href}
                className={`px-3 py-1.5 transition-colors ${
                  link.active
                    ? "font-medium text-rust underline decoration-2 underline-offset-4"
                    : "text-ink/80 hover:text-rust hover:underline hover:decoration-2 hover:underline-offset-4"
                }`}
              >
                {link.label}
              </a>

              {/* Dot separator */}
              {i < links.length - 1 && (
                <span className="mx-1 text-ink/30">•</span>
              )}
            </div>
          ))}
        </nav>

        {/* CTA button */}
       <a
  href="https://wa.me/YOUR_PHONE_NUMBER"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-full bg-rust px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:scale-[1.03] active:scale-95"
>
  <FaWhatsapp className="h-5 w-5" />
  Chat on WhatsApp
</a>
      </div>
    </header>
  );
}