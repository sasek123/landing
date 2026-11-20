/* Adapted from Componentry "Sticky Scroll Cards" (https://componentry.dev, github.com/harshjdhv/componentry),
   MIT License, (c) 2026 Harsh Jadhav.
   Changes: cards hold arbitrary content (here, the audit's working days) instead of photos, no Lenis
   smooth-scroll hijacking, smaller tilt, uses the `motion` package. */
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

const TILT = [-0.8, 0.6, -0.5, 0.9, -0.6];

function StackCard({ children, index, total, progress, reduce }: { children: ReactNode; index: number; total: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = total > 1 ? index / (total + 1) : 0;
  const rest = Math.max(0.78, 1 - (total - index - 1) * 0.06);
  const scale = useTransform(progress, [start, 1], reduce ? [1, 1] : [1, rest]);
  return (
    <div className="ssc-slot">
      <motion.div className="ssc-card" style={{ scale, rotate: reduce ? 0 : TILT[index % TILT.length], top: `${96 + index * 26}px` }}>
        {children}
      </motion.div>
    </div>
  );
}

export function StickyScrollCards({ items, className }: { items: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className={"ssc " + (className ?? "")}>
      {items.map((c, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress} reduce={reduce}>{c}</StackCard>
      ))}
    </div>
  );
}
