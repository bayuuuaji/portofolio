"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "./ui/Button";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const navTargets = siteConfig.navLinks
      .map((link) => ({
        href: link.href,
        section: document.querySelector<HTMLElement>(link.href),
      }))
      .filter((item): item is { href: string; section: HTMLElement } =>
        Boolean(item.section)
      );

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const marker = window.scrollY + 260;
      let current = navTargets[0]?.href ?? "";

      navTargets.forEach(({ href, section }) => {
        if (section.offsetTop <= marker) {
          current = href;
        }
      });

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = navTargets[navTargets.length - 1]?.href ?? current;
      }

      setActiveSection(current);
    };

    const onActiveSection = (event: Event) => {
      const detail = (event as CustomEvent<{ href?: string }>).detail;
      setActiveSection(detail?.href ?? "");
      setScrolled(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("portfolio:active-section", onActiveSection);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("portfolio:active-section", onActiveSection);
    };
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-softer backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex h-20 items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="group flex items-center gap-3 text-navy"
          aria-label="Bayu Portfolio home"
        >
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">
              Bayu&apos;s
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-navy-soft/60">
              Portfolio
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-active={activeSection === link.href}
                className="nav-underline text-sm font-medium text-navy-soft/80 hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative flex h-10 w-[74px] items-center rounded-full border border-line bg-white p-1 text-navy-soft shadow-softer transition-colors duration-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-pressed={theme === "dark"}
          >
            <span
              className={`absolute top-1 h-8 w-8 rounded-full bg-electric transition-transform duration-300 ${
                theme === "dark" ? "translate-x-8" : "translate-x-0"
              }`}
              aria-hidden="true"
            />
            <span className="relative z-10 flex h-8 w-8 items-center justify-center">
              <Sun
                className={`h-4 w-4 transition-colors ${
                  theme === "dark" ? "text-navy-soft/60" : "text-white"
                }`}
                aria-hidden="true"
              />
            </span>
            <span className="relative z-10 flex h-8 w-8 items-center justify-center">
              <Moon
                className={`h-4 w-4 transition-colors ${
                  theme === "dark" ? "text-white" : "text-navy-soft/60"
                }`}
                aria-hidden="true"
              />
            </span>
          </button>
          <Button href="#contact" variant="primary" showArrow>
            Let&apos;s Work Together
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl2 border border-line lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="section-container flex flex-col gap-1 py-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl2 px-3 py-3 text-base font-medium text-navy-soft hover:bg-base-off hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between rounded-xl2 px-3 py-3">
              <span className="text-sm font-medium text-navy-soft">Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="relative flex h-10 w-[74px] items-center rounded-full border border-line bg-white p-1 text-navy-soft shadow-softer transition-colors duration-300"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                aria-pressed={theme === "dark"}
              >
                <span
                  className={`absolute top-1 h-8 w-8 rounded-full bg-electric transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-8" : "translate-x-0"
                  }`}
                  aria-hidden="true"
                />
                <span className="relative z-10 flex h-8 w-8 items-center justify-center">
                  <Sun
                    className={`h-4 w-4 transition-colors ${
                      theme === "dark" ? "text-navy-soft/60" : "text-white"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <span className="relative z-10 flex h-8 w-8 items-center justify-center">
                  <Moon
                    className={`h-4 w-4 transition-colors ${
                      theme === "dark" ? "text-white" : "text-navy-soft/60"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
            <li className="pt-2">
              <Button
                href="#contact"
                variant="primary"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Let&apos;s Work Together
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
