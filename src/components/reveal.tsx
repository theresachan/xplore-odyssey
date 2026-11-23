import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Once visible, stay visible */
  once?: boolean;
};

/**
 * Scroll-triggered fade/rise.
 * Content stays visible for SSR and anything already on screen.
 * Only blocks fully below the fold start hidden, then rise in on scroll.
 */
export function Reveal({ children, className = "", delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setArmed(false);
      return;
    }

    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const rect = el.getBoundingClientRect();
    // Only hide when the whole block is clearly below the fold
    const fullyBelow = rect.top >= vh - 8;
    setVisible(!fullyBelow);
    setArmed(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.01, rootMargin: "100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style: CSSProperties =
    armed && visible
      ? {
          transitionDelay: `${delay}ms`,
        }
      : undefined;

  const motionClass = !armed ? "" : visible ? "reveal-in" : "reveal-out";

  return (
    <div ref={ref} style={style} className={`reveal-base ${motionClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
