"use client";
import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 20) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const timeout = setTimeout(() => setDisplayed(text), 0);
      return () => clearTimeout(timeout);
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setDisplayed((prev) => text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [text, speed]);

  return displayed;
}