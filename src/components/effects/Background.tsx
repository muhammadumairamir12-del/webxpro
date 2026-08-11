"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      const orbs = orbsRef.current?.querySelectorAll<HTMLElement>(".orb");
      if (!orbs) return;
      orbs.forEach((element, index) => {
        const speed = (index + 1) * 0.08;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-container" aria-hidden="true" ref={orbsRef}>
      <div className="grid-overlay" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
    </div>
  );
}
