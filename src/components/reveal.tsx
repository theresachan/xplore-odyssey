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
 * SSR + first paint stay visible so images aren't blank before JS/IO.
 * After mount, off-screen blocks hide then animate in on scroll.
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

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const onScreen = rect.top < vh - 24 && rect.bottom > 24;
    setVisible(onScreen);
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
      { threshold: 0.04, rootMargin: "0px 0px -8% 0px" },
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
