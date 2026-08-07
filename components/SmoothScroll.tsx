"use client";

import { useEffect } from "react";

const easeInOutQuart = (value: number) =>
  value < 0.5 ? 8 * value ** 4 : 1 - Math.pow(-2 * value + 2, 4) / 2;

export default function SmoothScroll() {
  useEffect(() => {
    if (document.querySelector("[data-section-pager]")) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let activeAnimation = 0;

    const animateTo = (
      targetY: number,
      options: { duration?: number; onComplete?: () => void } = {}
    ) => {
      window.cancelAnimationFrame(activeAnimation);

      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration =
        options.duration ?? Math.min(1050, Math.max(620, Math.abs(distance) * 0.38));
      let startTime: number | null = null;

      document.documentElement.classList.add("is-programmatic-scroll");

      const step = (timestamp: number) => {
        startTime ??= timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        window.scrollTo(0, startY + distance * easeInOutQuart(progress));

        if (progress < 1) {
          activeAnimation = window.requestAnimationFrame(step);
          return;
        }

        window.scrollTo(0, targetY);
        window.dispatchEvent(new Event("scroll"));
        window.setTimeout(() => {
          document.documentElement.classList.remove("is-programmatic-scroll");
          window.dispatchEvent(new Event("scroll"));
          options.onComplete?.();
        }, 260);
      };

      activeAnimation = window.requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );

      if (!link || link.hash.length <= 1) return;

      const target = document.querySelector(link.hash);
      if (!target) return;

      event.preventDefault();

      if (prefersReducedMotion) {
        target.scrollIntoView();
        history.pushState(null, "", link.hash);
        return;
      }

      const headerOffset = 80;
      const startY = window.scrollY;
      const targetY =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      const distance = Math.abs(targetY - startY);

      animateTo(targetY, {
        duration: Math.min(1200, Math.max(680, distance * 0.5)),
        onComplete: () => {
          history.pushState(null, "", link.hash);
        },
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.cancelAnimationFrame(activeAnimation);
    };
  }, []);

  return null;
}
