import { useEffect, useRef, useState } from "react";
import { copy, ROWS, ROW_NAMES, type Lang, type Status } from "./content";

const EMAIL = "adam.bencic1@gmail.com";
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

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  function play(toAfter: boolean, instant = false) {
    clear();
    setAfter(toAfter);
    const target = toAfter ? SCORE.after : SCORE.before;
    if (instant || reduced) { setResolved(toAfter ? ROWS.length : 0); setScore(target); return; }
    const from = toAfter ? 0 : ROWS.length;
    ROWS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setResolved(toAfter ? i + 1 : from - i - 1), 140 + i * 170));
    });
    const start = toAfter ? SCORE.before : SCORE.after;
    const steps = 24;
    for (let k = 1; k <= steps; k++) {
      timers.current.push(window.setTimeout(() => setScore(Math.round(start + ((target - start) * k) / steps)), 140 + (k * ROWS.length * 170) / steps));
    }
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
    <figure className="stmt" aria-label={t.title}>
      <header className="stmt-head">
        <div>
          <p className="stmt-title">{t.title}</p>
          <p className="stmt-co">{t.company} <span>({t.sample})</span></p>
        </div>
        <div className="seg" role="group" aria-label={t.title}>
          <button type="button" aria-pressed={!after} onClick={() => play(false)}>{t.before}</button>
          <button type="button" aria-pressed={after} onClick={() => play(true)}>{t.after}</button>
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
              <tr key={r.code} className={s === "ok" && i < resolved && r.before !== "ok" ? "fixed" : ""}>
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
        <span>{t.foot}</span>
        <span className="stmt-score">
          <span className="lbl">{t.score}</span>
          <span className="val num">{score}<small>%</small></span>
          <span className="bar" aria-hidden="true"><i style={{ width: `${score}%` }} /></span>
          <span className="sr-only">{late} / {ROWS.length}</span>
        </span>
      </footer>
    </figure>
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
  return (
    <form className="form" onSubmit={submit}>
      <label>{t.form.name}<input name="name" required autoComplete="name" /></label>
      <label>{t.form.email}<input name="email" type="email" required autoComplete="email" /></label>
      <label>{t.form.company}<input name="company" required autoComplete="organization" /></label>
      <label>{t.form.sites}
        <select name="sites" defaultValue={t.form.sitesOpts[1]}>{t.form.sitesOpts.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="wide">{t.form.role}
        <select name="role" defaultValue={t.form.roleOpts[0]}>{t.form.roleOpts.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="wide">{t.form.message}<textarea name="message" rows={4} /></label>
      <div className="wide form-end">
        <button className="btn btn-ink" type="submit">{t.form.submit}</button>
        {sent && <p className="sent" role="status">{t.form.sent} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
      </div>
    </form>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (typeof navigator !== "undefined" && !navigator.language.startsWith("sk") && !navigator.language.startsWith("cs") ? "en" : "sk"));
  const t = copy[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <>
      <div className="dark">
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
          <ol className="timeline">
            {t.process.map(([d, h, p]) => (
              <li key={d}><p className="day num">{d}</p><h3>{h}</h3><p>{p}</p></li>
            ))}
          </ol>
        </section>

        <section className="wrap section product" id="product">
          <div className="product-copy">
            <h2>{t.productTitle}</h2>
            <p>{t.productText}</p>
            <ul>{t.productPoints.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <ProductFrame lang={lang} />
        </section>

        <section className="wrap section">
          <div className="sec-head"><h2>{t.forTitle}</h2></div>
          <div className="for">
            {t.forItems.map(([h, p]) => (<div key={h}><h3>{h}</h3><p>{p}</p></div>))}
          </div>
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

      <section className="dark contact" id="contact">
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
    </>
  );
}

function ProductFrame({ lang }: { lang: Lang }) {
  const sk = lang === "sk";
  const sites: [string, number, number, number][] = [
    ["Trnava", 96, 16, 11], ["Nitra", 78, 7, 9], ["Žilina", 62, 10, 6], ["Senec", 54, 9, 5], ["Bratislava", 22, 3, 2],
  ];
  return (
    <figure className="frame" aria-label="Control Tower">
      <div className="frame-bar"><i /><i /><i /><span>Control Tower</span></div>
      <div className="frame-body">
        <div className="frame-kpis">
          {[[sk ? "Zhoda" : "Compliance", "70 %"], [sk ? "Po termíne" : "Overdue", "45"], [sk ? "Do 30 dní" : "Due in 30 days", "28"], [sk ? "Bez dokladu" : "No record", "17"]].map(([l, v]) => (
            <div key={l}><span>{l}</span><b className="num">{v}</b></div>
          ))}
        </div>
        <p className="frame-h">{sk ? "Stav podľa prevádzky" : "Status by site"}</p>
        {sites.map(([n, total, late, soon]) => (
          <div className="frame-row" key={n}>
            <span>{n}</span>
            <span className="frame-bar2">
              <i className="b-late" style={{ width: `${(late / total) * 100}%` }} />
              <i className="b-soon" style={{ width: `${(soon / total) * 100}%` }} />
              <i className="b-ok" style={{ width: `${((total - late - soon) / total) * 100}%` }} />
            </span>
            <span className="num">{late}</span>
          </div>
        ))}
        <p className="frame-cap">{sk ? "Ukážka z aplikácie, fiktívna firma" : "Product screen, fictional company"}</p>
      </div>
    </figure>
  );
}
