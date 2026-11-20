/* Split-flap departures board, after the "Split-Flap Board" idea in Planes (useplanes.com).
   Written for this site: each character flips through the alphabet until it lands, row by row,
   the first time the board scrolls into view. Reduced motion shows the final text at once. */
import { useEffect, useRef, useState } from "react";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉÍĽĹŇÓÔŔŠŤÚÝŽ0123456789.-–·:/";

function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function FlapText({ text, start, delay, width }: { text: string; start: boolean; delay: number; width: number }) {
  const target = text.toUpperCase().padEnd(width, " ").slice(0, width);
  const [shown, setShown] = useState(() => " ".repeat(width));
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(target); return; }
    const steps = target.split("").map((ch, i) => (ch === " " ? 0 : 6 + ((i * 7) % 9)));
    let tick = 0;
    let id = 0;
    const t0 = window.setTimeout(() => {
      id = window.setInterval(() => {
        tick++;
        setShown(target.split("").map((ch, i) => (tick >= steps[i] ? ch : CHARS[(i * 11 + tick * 5) % CHARS.length])).join(""));
        if (tick >= Math.max(...steps)) window.clearInterval(id);
      }, 55);
    }, delay);
    return () => { window.clearTimeout(t0); window.clearInterval(id); };
  }, [start, target, delay]);
  return (
    <span className="flap-text" aria-hidden="true">
      {shown.split("").map((ch, i) => <span className="flap" key={i + ch}>{ch}</span>)}
    </span>
  );
}

export type BoardRow = { date: string; code: string; site: string; state: string; tone: "ok" | "soon" | "late" };

export function SplitFlapBoard({ title, cols, rows, caption }: { title: string; cols: string[]; rows: BoardRow[]; caption: string }) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>();
  return (
    <figure className="board" ref={ref}>
      <figcaption className="board-head"><span>{title}</span><span className="board-dot" /></figcaption>
      <table className="board-table">
        <caption className="sr-only">{title}</caption>
        <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.code}>
              <td><span className="sr-only">{r.date}</span><FlapText text={r.date} width={6} start={seen} delay={i * 140} /></td>
              <td><span className="sr-only">{r.code}</span><FlapText text={r.code} width={8} start={seen} delay={i * 140 + 60} /></td>
              <td className="board-site"><span className="sr-only">{r.site}</span><FlapText text={r.site} width={10} start={seen} delay={i * 140 + 120} /></td>
              <td className={"board-state tone-" + r.tone}><span className="sr-only">{r.state}</span><FlapText text={r.state} width={9} start={seen} delay={i * 140 + 180} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="board-cap">{caption}</p>
    </figure>
  );
}
