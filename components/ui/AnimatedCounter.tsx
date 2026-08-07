"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  const animateToValue = useCallback(() => {
    if (hasAnimatedRef.current) return () => undefined;
    hasAnimatedRef.current = true;

    if (shouldReduceMotion) {
      setDisplay(value);
      return () => undefined;
    }

    setDisplay(0);
    let start: number | null = null;
    let frame = 0;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value * 10) / 10);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [value, duration, shouldReduceMotion]);

  useEffect(() => {
    if (!isInView) return;
    return animateToValue();
  }, [animateToValue, isInView]);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      if (!hasAnimatedRef.current) {
        setDisplay(value);
      }
    }, duration * 1000 + 400);

    return () => window.clearTimeout(fallback);
  }, [duration, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
