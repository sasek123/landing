/* Adapted from Componentry "Dither Gradient" (https://componentry.dev, github.com/harshjdhv/componentry),
   MIT License, (c) 2026 Harsh Jadhav.
   Changes: renders at a fraction of the size and scales up pixelated (cheap and crisp), runs at ~24 fps,
   pauses when off screen or in a hidden tab, draws one still frame under reduced motion,
   and reads its colours from CSS custom properties so the page's colour versions apply. */
import { useEffect, useRef } from "react";

interface DitherGradientProps {
  className?: string;
  /** CSS custom properties (or hex values) for the three stops. */
  from?: string;
  mid?: string;
  to?: string;
  intensity?: number;
  speed?: number;
  angle?: number;
  /** Size of one dither cell in CSS pixels. */
  cell?: number;
  /** Re-read colours when this changes (e.g. colour version). */
  version?: string;
}

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function resolve(color: string, el: Element) {
  const raw = color.startsWith("--") ? getComputedStyle(el).getPropertyValue(color).trim() : color;
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : { r: 0, g: 0, b: 0 };
}

const smooth = (t: number) => t * t * (3 - 2 * t);

export function DitherGradient({ className, from = "--dark", mid = "--dark", to = "--accent", intensity = 0.22, speed = 3, angle = 35, cell = 4, version }: DitherGradientProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let c0 = resolve(from, canvas), c1 = resolve(mid, canvas), c2 = resolve(to, canvas);
    let raf = 0, last = 0, time = 0, visible = true;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.ceil(r.width / cell));
      canvas.height = Math.max(1, Math.ceil(r.height / cell));
    };

    const draw = () => {
      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      const d = img.data;
      const rad = (angle * Math.PI) / 180, cos = Math.cos(rad), sin = Math.sin(rad);
      const drift = Math.sin(time * speed * 0.0008) * 0.1;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pos = Math.max(0, Math.min(1, ((x / width) * cos + (y / height) * sin) * 0.8 + 0.1 + drift));
          let r, g, b;
          if (pos < 0.5) { const t = smooth(pos * 2); r = c0.r + (c1.r - c0.r) * t; g = c0.g + (c1.g - c0.g) * t; b = c0.b + (c1.b - c0.b) * t; }
          else { const t = smooth((pos - 0.5) * 2); r = c1.r + (c2.r - c1.r) * t; g = c1.g + (c2.g - c1.g) * t; b = c1.b + (c2.b - c1.b) * t; }
          const th = (BAYER[y % 4][x % 4] / 16 - 0.5) * intensity * 180;
          const n = (Math.random() - 0.5) * intensity * 40;
          const i = (y * width + x) * 4;
          d[i] = r + th + n; d[i + 1] = g + th + n; d[i + 2] = b + th + n; d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || t - last < 42) return;
      time += t - last; last = t;
      draw();
    };

    size(); draw();
    const ro = new ResizeObserver(() => { size(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(loop);
    // colour versions change CSS variables on <html>
    const mo = new MutationObserver(() => { c0 = resolve(from, canvas); c1 = resolve(mid, canvas); c2 = resolve(to, canvas); draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-v"] });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, [from, mid, to, intensity, speed, angle, cell, version]);

  return <canvas ref={ref} className={className} aria-hidden="true" style={{ imageRendering: "pixelated" }} />;
}
