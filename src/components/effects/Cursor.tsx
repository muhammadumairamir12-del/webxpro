"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      window.setTimeout(() => {
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
      }, 80);
    };

    const onEnter = () => {
      cursor.style.transform = "scale(1.5)";
      cursor.style.borderColor = "#ff00f7";
      follower.style.transform = "scale(1.8)";
      follower.style.borderColor = "#00f0ff";
    };

    const onLeave = () => {
      cursor.style.transform = "scale(1)";
      cursor.style.borderColor = "#00f0ff";
      follower.style.transform = "scale(1)";
      follower.style.borderColor = "#ff00f7";
    };

    const hoverables = document.querySelectorAll(
      "a, button, .filter-btn, .portfolio-item, .contact-widget",
    );

    document.addEventListener("mousemove", onMouseMove);
    hoverables.forEach((item) => {
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((item) => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-follower" ref={followerRef} aria-hidden="true" />
    </>
  );
}
