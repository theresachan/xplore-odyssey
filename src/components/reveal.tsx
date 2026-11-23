import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Once visible, stay visible */
  once?: boolean;
};

/** Scroll-triggered fade/rise. Respects prefers-reduced-motion. */
export function Reveal({ children, className = "", delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, reduce]);

  const style: CSSProperties = reduce
    ? undefined
    : {
        transitionDelay: visible ? `${delay}ms` : "0ms",
      };

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-base ${visible || reduce ? "reveal-in" : "reveal-out"} ${className}`}
    >
      {children}
    </div>
  );
}
