import { useEffect, useRef, useState } from "react";
import { copy, ROWS, ROW_NAMES, type Lang, type Status } from "./content";
import { AnimatedCounter } from "./vendor/arc/animated-counter";
import { ToastStack, ToastStackProvider, useToastStack } from "./vendor/arc/toast-stack";
import { DitherGradient } from "./vendor/componentry/dither-gradient";
import { StickyScrollCards } from "./vendor/componentry/sticky-scroll-cards";
import { SplitFlapBoard } from "./split-flap";
import { VelocityTabs } from "@/components/ui/velocity-tabs";
import { SpringSlider } from "@/components/ui/spring-slider";
import { HalftoneAreaChart } from "@/components/ui/halftone-area-chart";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const EMAIL = "admin@arcane-equity.com";
const SCORE = { before: 61, after: 98 };

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

function Statement({ lang }: { lang: Lang }) {
  const t = copy[lang].stmt;
  const reduced = useReducedMotion();
  const [after, setAfter] = useState(false);
  const [resolved, setResolved] = useState(0); // rows already switched to "after"
  const [score, setScore] = useState(SCORE.before);
  const timers = useRef<number[]>([]);
  const { toast, dismiss } = useToastStack();

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  function play(toAfter: boolean, instant = false) {
    clear();
    setAfter(toAfter);
    const target = toAfter ? SCORE.after : SCORE.before;
    dismiss();
    if (instant || reduced) { setResolved(toAfter ? ROWS.length : 0); setScore(target); return; }
    const from = toAfter ? 0 : ROWS.length;
    const gap = 420;
    ROWS.forEach((r, i) => {
      timers.current.push(window.setTimeout(() => {
        setResolved(toAfter ? i + 1 : from - i - 1);
        if (toAfter && r.before !== "ok") {
          toast({ type: "success", title: copy[lang].toastTitle, description: `${r.code} · ${ROW_NAMES[lang][i]} · ${copy[lang].toastNext} ${r.dueAfter}`, duration: 3200 });
        }
      }, 160 + i * gap));
    });
    // the score moves in a few steps, the Arc counter rolls each digit
    const marks = [0.35, 0.7, 1];
    marks.forEach((m, k) => timers.current.push(window.setTimeout(() => setScore(Math.round(score + (target - score) * m)), 160 + (k + 1) * (ROWS.length * gap) / marks.length)));
  }

  // one orchestrated moment: the statement reconciles itself once after load
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => play(true), 1800);
    return () => { clearTimeout(id); clear(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const rowState = (i: number): Status => (i < resolved ? ROWS[i].after : ROWS[i].before);
  const late = ROWS.filter((_, i) => rowState(i) !== "ok").length;

  return (
    <div className="stmt-wrap">
    <figure className="stmt" aria-label={t.title}>
      <header className="stmt-head">
        <div>
          <p className="stmt-title">{t.title}</p>
          <p className="stmt-co">{t.company} <span>({t.sample})</span></p>
          <p className="stmt-meta">{t.foot}</p>
        </div>
        <div className="stmt-score">
          <span className="lbl">{t.score}</span>
          <span className="val num"><AnimatedCounter value={score} locale="en-US" suffix="%" /></span>
          <span className="bar" aria-hidden="true"><i style={{ width: `${score}%` }} /></span>
          <span className="sr-only">{late} / {ROWS.length}</span>
        </div>
      </header>
      <table className="stmt-table">
        <thead>
          <tr>{t.cols.map((c, i) => <th key={c} className={i >= 2 ? "r" : ""}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => {
            const s = rowState(i);
            return (
              <tr key={r.code} className={s === "ok" && i < resolved && r.before !== "ok" ? "is-fixed" : ""}>
                <td><span className="code">{r.code}</span>{ROW_NAMES[lang][i]}</td>
                <td>{r.site}</td>
                <td className="r num">{i < resolved ? r.dueAfter : r.due}</td>
                <td className="r"><span className={"st st-" + s}>{t.status[s]}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <footer className="stmt-foot">
        <div className="seg" role="group" aria-label={t.title}>
          <button type="button" aria-pressed={!after} onClick={() => play(false)}>{t.before}</button>
          <button type="button" aria-pressed={after} onClick={() => play(true)}>{t.after}</button>
        </div>
      </footer>
    </figure>
    <ToastStack contained position="bottom-right" visibleToasts={3} hotkey={false} label={t.title} className="stmt-toasts" />
    </div>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`${lang === "sk" ? "Pilotný audit" : "Pilot audit"} – ${f.get("company")}`);
    const body = encodeURIComponent(
      [
        `${t.form.name}: ${f.get("name")}`,
        `${t.form.email}: ${f.get("email")}`,
        `${t.form.company}: ${f.get("company")}`,
        `${t.form.sites}: ${f.get("sites")}`,
        `${t.form.role}: ${f.get("role")}`,
        "",
        String(f.get("message") || ""),
      ].join("\n"),
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  const sel = (name: string, label: string, opts: string[], def: string) => (
    <Field className="sui-field">
      <FieldLabel>{label}</FieldLabel>
      <Select name={name} defaultValue={def} items={opts.map((o) => ({ label: o, value: o }))}>
        <SelectTrigger size="lg" className="w-full"><SelectValue /></SelectTrigger>
        <SelectPopup className="sui-popup">{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectPopup>
      </Select>
    </Field>
  );
  return (
    <form className="form sui" onSubmit={submit}>
      <Field className="sui-field"><FieldLabel>{t.form.name}</FieldLabel><Input name="name" required autoComplete="name" size="lg" /></Field>
      <Field className="sui-field"><FieldLabel>{t.form.email}</FieldLabel><Input name="email" type="email" required autoComplete="email" size="lg" /></Field>
      <Field className="sui-field"><FieldLabel>{t.form.company}</FieldLabel><Input name="company" required autoComplete="organization" size="lg" /></Field>
      <SitesField lang={lang} />
      <div className="wide">{sel("role", t.form.role, t.form.roleOpts, t.form.roleOpts[0])}</div>
      <Field className="sui-field wide"><FieldLabel>{t.form.message}</FieldLabel><Textarea name="message" id="contact-message" rows={4} /></Field>
      <div className="wide form-end">
        <Button type="submit" size="lg" className="sui-submit">{t.form.submit}</Button>
        {sent && <p className="sent" role="status">{t.form.sent} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
      </div>
    </form>
  );
}

const VERSIONS = [
  { id: "a", name: "A", color: "#ffd60a" },
  { id: "b", name: "B", color: "#3d5afe" },
  { id: "c", name: "C", color: "#2ee59d" },
  { id: "d", name: "D", color: "#ff4a1c" },
];

function useVersion() {
  const [v, setV] = useState(() => {
    const q = new URLSearchParams(window.location.search).get("v");
    return VERSIONS.some((x) => x.id === q) ? (q as string) : "a";
  });
  useEffect(() => {
    document.documentElement.dataset.v = v;
    const url = new URL(window.location.href);
    url.searchParams.set("v", v);
    window.history.replaceState(null, "", url);
  }, [v]);
  const show = /git-|localhost|127\.0\.0\.1/.test(window.location.hostname) || new URLSearchParams(window.location.search).has("review");
  return { v, setV, show };
}

function VersionSwitch({ v, setV }: { v: string; setV: (x: string) => void }) {
  return (
    <div className="vswitch" role="group" aria-label="Version">
      <span>Verzia</span>
      {VERSIONS.map((x) => (
        <button key={x.id} type="button" aria-pressed={v === x.id} onClick={() => setV(x.id)}>
          <i style={{ background: x.color }} />{x.name}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const ver = useVersion();
  const [lang, setLang] = useState<Lang>(() => (typeof navigator !== "undefined" && !navigator.language.startsWith("sk") && !navigator.language.startsWith("cs") ? "en" : "sk"));
  const t = copy[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <ToastStackProvider duration={3200}>
      {ver.show && <VersionSwitch v={ver.v} setV={ver.setV} />}
      <div className="dark">
        <DitherGradient className="dither" from="--dark" mid="--dark" to="--accent" version={ver.v} />
        <nav className="nav wrap" aria-label="Main">
          <a className="mark" href="#top" aria-label="Arcane">Arcane</a>
          <div className="nav-links">
            <a href="#audit">{t.nav.audit}</a>
            <a href="#product">{t.nav.product}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="nav-end">
            <div className="lang" role="group" aria-label="Language">
              {(["sk", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <a className="btn btn-paper btn-sm" href="#contact">{t.navCta}</a>
          </div>
        </nav>

        <header className="hero wrap" id="top">
          <div className="hero-copy">
            <h1>{t.heroTitle}</h1>
            <p className="lede">{t.heroText}</p>
            <div className="ctas">
              <a className="btn btn-paper" href="#contact">{t.heroCta}</a>
              <a className="btn btn-line" href="#process">{t.heroSecondary}</a>
            </div>
            <p className="hero-note">{t.heroNote}</p>
          </div>
          <Statement lang={lang} />
        </header>

        <section className="stakes wrap" aria-label="Context">
          {t.stakes.map(([k, v]) => (
            <div key={k}><p className="stake-k">{k}</p><p className="stake-v">{v}</p></div>
          ))}
        </section>
      </div>

      <main className="paper">
        <ReadinessCheck lang={lang} />
        <section className="wrap section" id="audit">
          <div className="sec-head">
            <h2>{t.offerTitle}</h2>
            <p>{t.offerText}</p>
          </div>
          <div className="offers">
            {t.offers.map((o) => (
              <article className="offer" key={o.name}>
                <header>
                  <p className="kind">{o.kind}</p>
                  <h3>{o.name}</h3>
                  <p className="lead">{o.lead}</p>
                </header>
                <dl>
                  {o.terms.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
                </dl>
                <a className="btn btn-ink" href="#contact">{t.heroCta}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section" id="process">
          <div className="sec-head"><h2>{t.processTitle}</h2></div>
          <StickyScrollCards
            className="process-stack"
            items={t.process.map(([d, h, p], i) => (
              <article className="day-card" key={d}>
                <p className="day num">{d}</p>
                <h3>{h}</h3>
                <p>{p}</p>
                <span className="day-count num" aria-hidden="true">{i + 1}/{t.process.length}</span>
              </article>
            ))}
          />
        </section>

        <section className="wrap section product" id="product">
          <div className="product-copy">
            <h2>{t.productTitle}</h2>
            <p>{t.productText}</p>
            <ul>{t.productPoints.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <SplitFlapBoard title={t.board.title} cols={t.board.cols} rows={t.board.rows} caption={t.board.caption} />
          <ComplianceChart lang={lang} />
        </section>

        <section className="wrap section" id="for">
          <div className="sec-head"><h2>{t.forTitle}</h2></div>
          <Industries lang={lang} />
          <div className="aside">
            <div>
              <h3>{t.partnerTitle}</h3>
              <p>{t.partnerText}</p>
              <a className="link" href="#contact">{t.partnerCta}</a>
            </div>
            <div>
              <h3>{t.alsoTitle}</h3>
              <p>{t.alsoText}</p>
            </div>
          </div>
        </section>
      </main>

      <section className={"dark contact" + (ver.v === "d" ? "" : " sui-dark")} id="contact">
        <div className="wrap contact-in">
          <div>
            <h2>{t.contactTitle}</h2>
            <p className="lede">{t.contactText}</p>
            <p className="direct"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <Contact lang={lang} />
        </div>
        <footer className="wrap foot">
          <span className="mark">Arcane</span>
          <span>{t.footer}</span>
          <p>{t.footerNote}</p>
        </footer>
      </section>
    </ToastStackProvider>
  );
}

function Industries({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [active, setActive] = useState("0");
  const tabs = t.forItems.map(([label], i) => ({ label, value: String(i) }));
  const [, sub, equipment, finding] = t.forItems[Number(active)];
  return (
    <div className="industries">
      <div className="industry-scroll"><VelocityTabs tabs={tabs} value={active} onValueChange={setActive} aria-label={t.forTitle}
        className="industry-tabs" indicatorClassName="industry-ind" tabClassName="industry-tab" /></div>
      <div className="industry-panel" aria-live="polite">
        <p className="industry-sub">{sub}</p>
        <div className="industry-cols">
          <div><h3>{t.forLabels.equipment}</h3><p>{equipment}</p></div>
          <div><h3>{t.forLabels.finding}</h3><p>{finding}</p></div>
        </div>
      </div>
    </div>
  );
}

const CHART = [0.61, 0.64, 0.7, 0.74, 0.79, 0.83, 0.86, 0.9, 0.92, 0.94, 0.96, 0.97, 0.98];

function ComplianceChart({ lang }: { lang: Lang }) {
  const c = copy[lang].chart;
  const v = useVersion().v;
  const [colors, setColors] = useState<string[]>(["#d8cfbd", "#17140f"]);
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    setColors([cs.getPropertyValue("--paper-deep").trim() || "#d8cfbd", cs.getPropertyValue("--accent-on-paper").trim() || "#17140f"]);
  }, [v]);
  return (
    <figure className="chart">
      <figcaption><h3>{c.title}</h3><p>{c.note}</p></figcaption>
      <HalftoneAreaChart
        key={colors.join()}
        data={CHART.map((value, i) => ({ label: `${c.weeks}${i}`, value }))}
        height={170}
        colors={colors}
        format={{ style: "percent", maximumFractionDigits: 0 }}
        locales={lang === "sk" ? "sk-SK" : "en-GB"}
        label={c.title}
        seriesName={c.title}
        vsLabel={c.vs}
      />
    </figure>
  );
}

function ReadinessCheck({ lang }: { lang: Lang }) {
  const c = copy[lang].check;
  const [ans, setAns] = useState<(boolean | null)[]>([null, null, null, null, null]);
  const answered = ans.filter((a) => a !== null).length;
  const score = ans.filter((a) => a === true).length;
  const done = answered === 5;
  const tier = score <= 2 ? 0 : score <= 4 ? 1 : 2;
  const set = (i: number, v: string) => setAns((a) => a.map((x, j) => (j === i ? v === "y" : x)));
  const use = () => {
    const el = document.getElementById("contact-message") as HTMLTextAreaElement | null;
    if (el) el.value = c.summary(c.qs.filter((_, i) => ans[i]), c.qs.filter((_, i) => ans[i] === false));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => el?.focus({ preventScroll: true }), 600);
  };
  return (
    <section className="wrap section check" id="check">
      <div className="check-side">
        <h2>{c.title}</h2>
        <p className="check-lead">{c.lead}</p>
        <div className={"check-result" + (done ? " t" + tier : "")} aria-live="polite">
          <p className="check-score num"><span>{score}</span> {c.of}</p>
          {done ? (
            <>
              <h3>{c.tiers[tier][0]}</h3>
              <p>{c.tiers[tier][1]}</p>
              <button type="button" className="btn btn-ink" onClick={use}>{c.use}</button>
            </>
          ) : (
            <p className="check-wait">{answered ? c.partial(answered) : c.empty}</p>
          )}
        </div>
      </div>
      <ol className="check-qs">
        {c.qs.map((q, i) => (
          <li key={q} className={ans[i] === false ? "is-no" : ans[i] ? "is-yes" : ""}>
            <p>{q}</p>
            <VelocityTabs aria-label={q} value={ans[i] === null ? "" : ans[i] ? "y" : "n"} onValueChange={(v) => set(i, v)}
              tabs={[{ label: c.yes, value: "y" }, { label: c.no, value: "n" }]}
              className="yn" indicatorClassName="yn-ind" tabClassName="yn-tab" />
          </li>
        ))}
      </ol>
    </section>
  );
}

function SitesField({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [n, setN] = useState(3);
  return (
    <div className="sui-field sites-field">
      <div className="sites-head"><span>{t.form.sites}</span><output className="num">{t.sitesHint(n)}</output></div>
      <input type="hidden" name="sites" value={t.sitesHint(n)} />
      <SpringSlider aria-label={t.form.sites} min={1} max={30} step={1} value={n} onValueChange={setN}
        ticks={false} renderTooltip={(x) => t.sitesHint(x)} valueText={(x) => t.sitesHint(x)} className="sites-slider" />
    </div>
  );
}
