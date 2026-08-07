"use client";

import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionPagerProps = {
  children: ReactNode;
};

const TRANSITION_MS = 1180;

export default function SectionPager({ children }: SectionPagerProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timerRef = useRef<number | null>(null);

  const slideIdAt = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    return slide?.querySelector<HTMLElement>("section[id]")?.id ?? "";
  }, []);

  const publishActiveSection = useCallback(
    (index: number) => {
      const id = slideIdAt(index);
      window.dispatchEvent(
        new CustomEvent("portfolio:active-section", {
          detail: { href: id ? `#${id}` : "" },
        })
      );
    },
    [slideIdAt]
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (
        nextIndex === currentIndex ||
        nextIndex < 0 ||
        nextIndex >= slides.length ||
        isTransitioning
      ) {
        return;
      }

      setDirection(nextIndex > currentIndex ? 1 : -1);
      setOutgoingIndex(currentIndex);
      setCurrentIndex(nextIndex);
      setIsTransitioning(true);

      const id = slideIdAt(nextIndex);
      if (id) {
        history.replaceState(null, "", `#${id}`);
      } else {
        history.replaceState(null, "", window.location.pathname);
      }

      publishActiveSection(nextIndex);

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOutgoingIndex(null);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    },
    [
      currentIndex,
      isTransitioning,
      publishActiveSection,
      slideIdAt,
      slides.length,
    ]
  );

  useEffect(() => {
    document.documentElement.classList.add("has-section-pager");

    const fromHash = () => {
      const hash = window.location.hash;
      if (!hash) return 0;

      const targetIndex = slideRefs.current.findIndex((slide) =>
        Boolean(slide?.querySelector(hash))
      );

      return targetIndex >= 0 ? targetIndex : 0;
    };

    const initialIndex = fromHash();
    setCurrentIndex(initialIndex);
    publishActiveSection(initialIndex);

    return () => {
      document.documentElement.classList.remove("has-section-pager");
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [publishActiveSection]);

  useEffect(() => {
    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );

      if (!link || link.hash.length <= 1) return;

      const targetIndex = slideRefs.current.findIndex((slide) =>
        Boolean(slide?.querySelector(link.hash))
      );

      if (targetIndex < 0) return;

      event.preventDefault();
      goTo(targetIndex);
    };

    document.addEventListener("click", onAnchorClick, true);
    return () => document.removeEventListener("click", onAnchorClick, true);
  }, [goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PageDown") {
        event.preventDefault();
        goTo(currentIndex + 1);
      }
      if (event.key === "PageUp") {
        event.preventDefault();
        goTo(currentIndex - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, goTo]);

  return (
    <div
      className="section-pager relative h-[calc(100dvh-80px)] overflow-hidden bg-base-off"
      data-section-pager
    >
      {slides.map((slide, index) => {
        const state =
          index === currentIndex
            ? "active"
            : index === outgoingIndex
              ? "outgoing"
              : "idle";

        return (
          <div
            key={index}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="section-pager-slide absolute inset-0 overflow-y-auto overscroll-contain"
            data-state={state}
            data-direction={direction}
            aria-hidden={state === "idle"}
          >
            {slide}
          </div>
        );
      })}

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-white/95 p-1.5 shadow-soft backdrop-blur-md">
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0 || isTransitioning}
          className="flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-xs font-semibold text-navy transition-all duration-300 hover:border-electric hover:text-electric disabled:cursor-not-allowed disabled:opacity-55"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous Page</span>
        </button>
        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1 || isTransitioning}
          className="flex h-11 items-center gap-2 rounded-full bg-electric px-5 text-xs font-semibold text-white shadow-lift transition-all duration-300 hover:bg-electric-dark disabled:cursor-not-allowed disabled:opacity-55"
        >
          <span className="hidden sm:inline">Next Page</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
