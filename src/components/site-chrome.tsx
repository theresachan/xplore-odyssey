import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND, EMAIL, LOCATION, WHATSAPP } from "@/lib/brand";
import { BrandLockup } from "@/components/xo-logo";

const nav = [
  { href: "/#routes", label: "Routes" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#cuisine", label: "Cuisine", className: "hidden lg:inline" },
  { href: "/#seeing", label: "Places", className: "hidden xl:inline" },
];

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" | "overlay" }) {
  const isOverlay = tone === "overlay";
  const isDark = tone === "dark";
  const logoTone = isOverlay || isDark ? "overlay" : "light";
  const text = isOverlay || isDark ? "text-mist" : "text-ink";
  const muted = isOverlay || isDark ? "opacity-80 hover:opacity-100" : "text-ink/70 hover:text-ink";
  const book =
    isOverlay || isDark
      ? "bg-mist text-ink hover:bg-white"
      : "bg-ink text-mist hover:bg-canopy";

  return (
    <header
      className={`relative z-10 flex items-center justify-between px-5 md:px-10 ${
        isOverlay ? "pt-6 md:pt-8" : "py-5 border-b border-current/10"
      } ${text}`}
    >
      <BrandLockup tone={logoTone} />
      <nav className="flex items-center gap-5 md:gap-7 text-[13px] font-medium tracking-wide">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`hidden md:inline transition-opacity ${muted} ${item.className ?? ""}`}
          >
            {item.label}
          </a>
        ))}
        <Link to="/brand" className={`hidden sm:inline transition-opacity ${muted}`}>
          Brand
        </Link>
        <a href="/#book" className={`px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${book}`}>
          Book
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-mist px-5 py-14 md:px-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <div>
          <BrandLockup tone="overlay" showWordmark />
          <p className="mt-4 text-[14px] text-mist/55">{LOCATION}</p>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] text-mist/40 font-semibold">Hours</p>
          <p className="mt-2 text-[15px] text-mist/75 leading-relaxed">
            Daily
            <br />
            Reply within the hour on WhatsApp
          </p>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] text-mist/40 font-semibold">Contact</p>
          <a href={WHATSAPP} className="mt-2 block text-[15px] text-mist/75 hover:text-brass transition-colors">
            Message us on WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block text-[15px] text-mist/75 hover:text-brass transition-colors">
            {EMAIL}
          </a>
          <Link to="/brand" className="mt-4 inline-block text-[13px] font-semibold text-mist/50 hover:text-mist transition-colors">
            Brand Guideline ↗
          </Link>
        </div>
      </div>
      <p className="mx-auto max-w-6xl mt-12 pt-6 border-t border-mist/10 text-[12px] text-mist/35">
        © {new Date().getFullYear()} {BRAND} · Iloilo, Philippines
      </p>
    </footer>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] uppercase tracking-[0.22em] text-canopy font-semibold ${className}`}>
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
  dark = false,
  hush = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  hush?: boolean;
}) {
  const bg = dark ? "bg-ink text-mist" : hush ? "bg-hush text-ink" : "bg-mist text-ink";
  return (
    <section id={id} className={`px-5 py-20 md:px-10 md:py-28 ${bg} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function ButtonPrimary({
  href,
  children,
  className = "",
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-[15px] font-semibold transition-colors ${
        onDark
          ? "bg-mist text-ink hover:bg-white"
          : "bg-ink text-paper hover:bg-canopy"
      } ${className}`}
    >
      {children}
    </a>
  );
}

export function ButtonSecondary({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-[15px] font-semibold transition-colors ${
        light
          ? "border border-mist/40 text-mist hover:bg-mist/10"
          : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-mist"
      } ${className}`}
    >
      {children}
    </a>
  );
}
