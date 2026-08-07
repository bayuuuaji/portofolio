import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import Container from "./ui/Container";
import { Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col items-center justify-between gap-6 py-8 text-center lg:flex-row lg:text-left">
        <p className="font-display text-lg font-bold tracking-tight text-navy">
          Bayu Portfolio
        </p>

        <nav
          aria-label="Footer navigation"
          className="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2"
        >
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-navy-soft/70 hover:text-electric"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 gap-2">
          <a
            href={contactConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bayu on LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy-soft hover:border-electric hover:text-electric"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={contactConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bayu on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy-soft hover:border-electric hover:text-electric"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={contactConfig.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bayu on YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy-soft hover:border-electric hover:text-electric"
          >
            <Youtube className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <div className="border-t border-line py-4">
        <Container className="flex justify-center text-center text-xs text-navy-soft/60">
          <p>© {year} Bayu. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
