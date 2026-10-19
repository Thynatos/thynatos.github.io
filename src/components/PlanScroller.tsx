"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal scroll container for the plan view. On narrow screens it starts
 * scrolled to the most recent months and shows a hint that it can be scrolled.
 */
export function PlanScroller({
  children,
  className,
  label,
  hint,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  hint: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScrollable(el.scrollWidth > el.clientWidth + 4);
    update();
    if (el.scrollWidth > el.clientWidth + 4) el.scrollLeft = el.scrollWidth;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={className}
        role="region"
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
        data-scrollable={scrollable || undefined}
      >
        {children}
      </div>
      {scrollable ? (
        <p className="eyebrow" style={{ marginTop: 10 }} aria-hidden="true">
          ← {hint}
        </p>
      ) : null}
    </>
  );
}
