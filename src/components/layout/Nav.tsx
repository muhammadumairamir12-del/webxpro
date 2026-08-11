"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarsIcon, TimesIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog Insights", href: "/blog" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact Us", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const basePath = href.split("#")[0];
    return pathname === basePath;
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="flex items-center gap-2.5">
        <Link href="/" className="no-underline" onClick={closeMenu}>
          <span className="logo">WEBXPRO</span>
          <span className="logo-subtitle block">DIGITAL SOLUTIONS</span>
        </Link>
      </div>
      <button
        type="button"
        className="hamburger-menu"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <TimesIcon className="h-6 w-6" /> : <BarsIcon className="h-6 w-6" />}
      </button>
      <ul className={`nav-links ${open ? "active" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={isActive(link.href) ? "active" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
