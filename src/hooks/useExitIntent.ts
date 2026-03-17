"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const COOLDOWN_KEY = "exit_popup_last_shown";
const COOLDOWN_DAYS = 7;

export function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false);
  const triggered = useRef(false);

  const isInCooldown = useCallback(() => {
    if (typeof window === "undefined") return true;
    const last = localStorage.getItem(COOLDOWN_KEY);
    if (!last) return false;
    const elapsed = Date.now() - parseInt(last, 10);
    return elapsed < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  }, []);

  const trigger = useCallback(() => {
    if (triggered.current || isInCooldown()) return;
    triggered.current = true;
    setShowPopup(true);
  }, [isInCooldown]);

  const dismiss = useCallback(() => {
    setShowPopup(false);
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    if (isInCooldown()) return;

    // Desktop: mouse leaves top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile: detect significant scroll up (user pulling away)
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentY;
        if (scrollUpDistance > 300 && currentY > 500) {
          trigger();
        }
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trigger, isInCooldown]);

  return { showPopup, dismiss };
}
