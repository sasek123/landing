import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  MessageCircle,
  PhoneCall,
  Send,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { useState } from "react";

type Language = "sk" | "en";

const copy = {
  sk: {
    nav: ["Systém", "Čo tvoríme", "Ako pracujeme"],
    navCta: "Porozprávajme sa",
    kicker: "Arcane / AI infraštruktúra pre firmy",
    heroTitle: "Vaša nová recepcia",
    heroAccent: "už nečaká na telefón.",
    heroText:
      "Tvoríme AI hlasových agentov, ktorí dvíhajú hovory, kvalifikujú dopyty a rezervujú prácu. K tomu chatboty pre podporu, weby a digitálne workflow, ktoré držia firmu v pohybe.",
    primary: "Pozrieť možnosti",
    secondary: "Ako to funguje",
    live: "SYSTÉM V PREVÁDZKE",
    liveStat: "Priemerné zdvihnutie",
    systemLabel: "Nie je to demo. Je to pracovný tok.",
    systemTitle: "Jeden nový\nhovor. Štyri hotové kroky.",
    systemText:
      "Od prvého zazvonenia po zapísanú objednávku. Pozrite sa, ako sa z obyčajnej otázky stane konkrétna práca bez toho, aby váš tím prerušil deň.",
    tryIt: "Spustiť ukážkový hovor",
    noMic: "Mikrofón netreba",
    caller: "ZÁKAZNÍK",
    agent: "ARCANE AI AGENT",
    outcome: "VÝSLEDOK",
    reset: "Resetovať",
    showcasesLabel: "02 / ČO TVORÍME",
    showcasesTitle: "AI tam, kde\nmá zmysel.",
    showcasesText:
      "Hlas je náš hlavný kanál. Nie jediný. Poskladáme vám presne taký systém, aký vaše podnikanie potrebuje dnes, s priestorom na zajtrajší rast.",
    capabilities: [
      {
        icon: PhoneCall,
        tag: "01 / HLAVNÁ SILA",
        title: "AI hlasoví agenti",
        text: "Dvíhajú telefón 24/7, rozumejú kontextu, odpovedajú po slovensky aj po anglicky, objednávajú a eskalujú citlivé prípady človeku.",
        accent: "featured",
      },
      {
        icon: MessageCircle,
        tag: "02 / PODPORA",
        title: "Chatboty pre web a support",
        text: "Sprievodca na webe, FAQ, kvalifikácia leadov alebo interná podpora. Menej opakovaných otázok, viac vyriešených požiadaviek.",
        accent: "",
      },
      {
        icon: Globe2,
        tag: "03 / DIGITÁLNY ZÁKLAD",
        title: "Weby a celé workflow",
        text: "Vieme postaviť aj web, formuláre, CRM napojenie a automatizácie. Od prvého kliknutia po uzavretú zákazku v jednom systéme.",
        accent: "",
      },
    ],
    infrastructureLabel: "03 / VLASTNÁ INFRAŠTRUKTÚRA",
    infrastructureTitle: "Nie ste odkázaní na\nnáhodný plugin.",
    infrastructureText:
      "Arcane nie je ďalší widget, ktorý vám niekto vloží na web a zabudne naň. Máme vlastnú infraštruktúru a vieme vás na ňu presunúť: bezpečne, postupne a s jasným vlastníctvom toho, čo pre vás postavíme.",
    infraPoints: [
      "Vlastné nasadenie a monitoring",
      "Integrácie podľa vášho stacku",
      "Dáta a workflow pod kontrolou",
      "Iterácie bez čakania na vendor roadmapu",
    ],
    migration: "Presunieme vás k nám",
    workLabel: "04 / AKO PRACUJEME",
    workTitle: "Najprv pochopíme\ntlak. Potom staváme.",
    steps: [
      ["01", "Zachytíme problém", "Kde vám unikajú hovory, čas, leady alebo odpovede?"],
      ["02", "Navrhneme systém", "Rozhovor, web, chatbot, integrácie a jasné hranice pre AI."],
      ["03", "Spustíme a meriame", "Najprv bezpečne. Potom zlepšujeme podľa reálnych dát."],
    ],
    contactLabel: "05 / ZAČNIME",
    contactTitle: "Povedzte nám,\nčo vás dnes brzdí.",
    contactText:
      "Vyberte, čo potrebujete. Ozveme sa s konkrétnym prvým krokom, nie s generickou prezentáciou.",
    formName: "Vaše meno",
    formEmail: "Pracovný e-mail",
    formCompany: "Firma / web",
    formNeed: "Čo chcete vyriešiť?",
    formMessage: "Pár viet o vašej situácii",
    formSubmit: "Odoslať dopyt",
    formSuccess: "Dopyt je pripravený. Otvárame váš e-mailový klient.",
    formOptions: [
      "AI hlasový agent",
      "Chatbot pre podporu",
      "Nový web",
      "Kompletné workflow",
      "Ešte neviem",
    ],
    footer: "AI hlas. Web. Systémy, ktoré robia svoju prácu.",
  },
  en: {
    nav: ["System", "What we build", "How we work"],
    navCta: "Start a conversation",
    kicker: "Arcane / AI infrastructure for business",
    heroTitle: "Your new front desk",
    heroAccent: "does not wait on hold.",
    heroText:
      "We build AI voice agents that answer calls, qualify demand, and book work. Plus support chatbots, websites, and digital workflows that keep the whole business moving.",
    primary: "Explore the system",
    secondary: "How it works",
    live: "SYSTEM LIVE",
    liveStat: "Average pickup",
    systemLabel: "Not a demo. A working flow.",
    systemTitle: "One new call.\nFour finished steps.",
    systemText:
      "From the first ring to a structured job. See how an ordinary question becomes useful work without pulling your team out of their day.",
    tryIt: "Start a sample call",
    noMic: "No microphone required",
    caller: "CALLER",
    agent: "ARCANE AI AGENT",
    outcome: "OUTCOME",
    reset: "Reset",
    showcasesLabel: "02 / WHAT WE BUILD",
    showcasesTitle: "AI where\nit actually helps.",
    showcasesText:
      "Voice is our main channel. Not our only one. We compose the exact system your business needs today, with room for tomorrow's growth.",
    capabilities: [
      {
        icon: PhoneCall,
        tag: "01 / CORE STRENGTH",
        title: "AI voice agents",
        text: "They answer 24/7, understand context, speak naturally, book appointments, and escalate sensitive cases to a human.",
        accent: "featured",
      },
      {
        icon: MessageCircle,
        tag: "02 / SUPPORT",
        title: "Web and support chatbots",
        text: "A website guide, FAQ assistant, lead qualifier, or internal support layer. Fewer repetitive questions, more resolved requests.",
        accent: "",
      },
      {
        icon: Globe2,
        tag: "03 / DIGITAL FOUNDATION",
        title: "Websites and workflows",
        text: "We can build the website, forms, CRM connections, and automations too. From the first click to a closed job.",
        accent: "",
      },
    ],
    infrastructureLabel: "03 / OWN INFRASTRUCTURE",
    infrastructureTitle: "You are not stuck with\nanother random plugin.",
    infrastructureText:
      "Arcane is not a widget someone drops on your site and forgets. We run our own infrastructure and can move you onto it safely, gradually, and with clear ownership of what we build for you.",
    infraPoints: [
      "Own deployment and monitoring",
      "Integrations for your stack",
      "Your data and workflows stay in control",
      "Iteration without vendor roadmap delays",
    ],
    migration: "Move onto our infrastructure",
    workLabel: "04 / HOW WE WORK",
    workTitle: "First we understand\nthe pressure. Then we build.",
    steps: [
      ["01", "Find the pressure", "Where are calls, time, leads, or answers slipping away?"],
      [
        "02",
        "Design the system",
        "Conversation, web, chatbot, integrations, and clear AI boundaries.",
      ],
      ["03", "Launch and measure", "Start safely. Then improve from real operating data."],
    ],
    contactLabel: "05 / LET'S START",
    contactTitle: "Tell us what is\nslowing you down.",
    contactText:
      "Choose what you need. We will come back with a concrete first step, not a generic deck.",
    formName: "Your name",
    formEmail: "Work email",
    formCompany: "Company / website",
    formNeed: "What do you need?",
    formMessage: "A few words about your situation",
    formSubmit: "Send inquiry",
    formSuccess: "Your inquiry is ready. Opening your email client.",
    formOptions: [
      "AI voice agent",
      "Support chatbot",
      "New website",
      "Complete workflow",
      "Not sure yet",
    ],
    footer: "AI voice. Web. Systems that do their job.",
  },
} as const;

const calls = {
  sk: {
    caller: "Dobrý deň, potrebujem servis kotla ešte dnes.",
    reply: "Rozumiem. Overím urgentný termín a pošlem vám potvrdenie.",
    outcome: "Urgentný servis kvalifikovaný",
  },
  en: {
    caller: "Hi, I need a boiler service today.",
    reply: "I can help. I will check the urgent schedule and send your confirmation.",
    outcome: "Urgent service qualified",
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>("sk");
  const [callStage, setCallStage] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = copy[language];
  const call = calls[language];

  const startCall = () => {
    setCallStage(1);
    window.setTimeout(() => setCallStage(2), 650);
    window.setTimeout(() => setCallStage(3), 1400);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Arcane inquiry / ${data.get("company") || "new lead"}`);
    const body = encodeURIComponent(
      `${data.get("name")} (${data.get("email")})\nNeed: ${data.get("need")}\n\n${data.get("message")}`,
    );
    setSubmitted(true);
    window.location.href = `mailto:adam.bencic1@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="arcane-site min-h-screen overflow-hidden" id="top">
      <header className="arcane-site-nav">
        <a href="#top" className="arcane-wordmark" aria-label="Arcane home">
          <span>A</span>
          <strong>ARCANE</strong>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {t.nav.map((item, index) => (
            <a href={["#system", "#showcases", "#work"][index]} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="arcane-nav-actions">
          <div className="arcane-language" role="group" aria-label="Language switcher">
            <button className={language === "sk" ? "active" : ""} onClick={() => setLanguage("sk")}>
              SK
            </button>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>
              EN
            </button>
          </div>
          <a href="#contact" className="arcane-nav-cta">
            {t.navCta} <ArrowUpRight />
          </a>
        </div>
      </header>

      <main>
        <section className="arcane-hero">
          <div className="arcane-grid" />
          <div className="arcane-orbit arcane-orbit-one" />
          <div className="arcane-orbit arcane-orbit-two" />
          <div className="arcane-hero-copy">
            <p className="arcane-eyebrow">
              <span /> {t.kicker}
            </p>
            <h1>
              {t.heroTitle}
              <br />
              <em>{t.heroAccent}</em>
            </h1>
            <p className="arcane-hero-text">{t.heroText}</p>
            <div className="arcane-hero-actions">
              <a href="#system" className="arcane-button arcane-button-solid">
                {t.primary} <ArrowRight />
              </a>
              <a href="#showcases" className="arcane-button arcane-button-quiet">
                {t.secondary} <ArrowDown />
              </a>
            </div>
            <div className="arcane-hero-proof">
              <span>
                <Check /> SK / EN
              </span>
              <span>
                <Check /> 24/7 operation
              </span>
              <span>
                <Check /> Built in Slovakia
              </span>
            </div>
          </div>
          <div className="arcane-live-card" aria-label="Live system status">
            <div className="arcane-live-head">
              <span>
                <i /> {t.live}
              </span>
              <span>VOICE / 01</span>
            </div>
            <div className="arcane-wave" aria-hidden="true">
              {Array.from({ length: 38 }).map((_, index) => (
                <i
                  key={index}
                  style={
                    {
                      "--bar": `${18 + ((index * 31) % 70)}%`,
                      "--delay": `${index * -0.04}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div className="arcane-live-foot">
              <span>{t.liveStat}</span>
              <strong>0.8s</strong>
            </div>
            <div className="arcane-live-route">
              <span /> Bratislava <ArrowRight /> Europe
            </div>
          </div>
          <p className="arcane-scroll-note">SCROLL TO ENTER THE SYSTEM</p>
        </section>

        <section id="system" className="arcane-simulator-section">
          <div className="arcane-section-intro">
            <p className="arcane-index">01 / LIVE OPERATION</p>
            <h2>
              {t.systemLabel}
              <br />
              {t.systemTitle}
            </h2>
            <p>{t.systemText}</p>
          </div>
          <div className="arcane-simulator">
            <div className="arcane-vertical-tabs">
              <button className="active">
                <span>01</span> {language === "sk" ? "Servis a rezervácie" : "Service and booking"}
              </button>
              <button>
                <span>02</span> {language === "sk" ? "Kvalifikácia leadov" : "Lead qualification"}
              </button>
              <button>
                <span>03</span> {language === "sk" ? "Podpora zákazníkov" : "Customer support"}
              </button>
            </div>
            <div className="arcane-call-console">
              <div className="arcane-console-top">
                <div>
                  <span className={callStage ? "arcane-pulse" : ""} /> INCOMING / VOICE AGENT
                </div>
                <div>{callStage ? "00:03" : "READY"}</div>
              </div>
              <div className="arcane-conversation">
                {!callStage ? (
                  <button className="arcane-start-call" onClick={startCall}>
                    <span>
                      <PhoneCall />
                    </span>
                    <strong>{t.tryIt}</strong>
                    <small>{t.noMic}</small>
                  </button>
                ) : (
                  <>
                    <div className={`arcane-message caller ${callStage >= 1 ? "shown" : ""}`}>
                      <span>{t.caller}</span>
                      <p>“{call.caller}”</p>
                    </div>
                    <div className={`arcane-message agent ${callStage >= 2 ? "shown" : ""}`}>
                      <span>{t.agent}</span>
                      <p>“{call.reply}”</p>
                    </div>
                    <div className={`arcane-outcome ${callStage >= 3 ? "shown" : ""}`}>
                      <span>
                        <Check />
                      </span>
                      <div>
                        <small>{t.outcome}</small>
                        <strong>{call.outcome}</strong>
                        <p>
                          {language === "sk"
                            ? "Termín overený · CRM aktualizované"
                            : "Schedule checked · CRM updated"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="arcane-console-bottom">
                <span>
                  <Workflow /> {language === "sk" ? "Workflow beží" : "Workflow running"}
                </span>
                {callStage ? (
                  <button onClick={() => setCallStage(0)}>{t.reset}</button>
                ) : (
                  <span>ARCANE INFRASTRUCTURE</span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="showcases" className="arcane-showcase-section">
          <div className="arcane-section-intro arcane-section-intro-light">
            <p className="arcane-index">{t.showcasesLabel}</p>
            <h2>{t.showcasesTitle}</h2>
            <p>{t.showcasesText}</p>
          </div>
          <div className="arcane-capability-grid">
            {t.capabilities.map(({ icon: Icon, tag, title, text, accent }) => (
              <article className={`arcane-capability-card ${accent}`} key={title}>
                <div className="arcane-capability-icon">
                  <Icon />
                </div>
                <p className="arcane-index">{tag}</p>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact">
                  {language === "sk" ? "Chcem sa dozvedieť viac" : "Explore this"} <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="arcane-infrastructure-section">
          <div className="arcane-infra-visual">
            <div className="arcane-terminal">
              <div className="arcane-terminal-bar">
                <span />
                <span />
                <span />
                <small>arcane / infrastructure</small>
              </div>
              <div className="arcane-terminal-body">
                <p>
                  <span>$</span> arcane status --all
                </p>
                <p className="terminal-green">
                  ● voice-agent <b>operational</b>
                </p>
                <p className="terminal-green">
                  ● support-bot <b>operational</b>
                </p>
                <p className="terminal-green">
                  ● website-stack <b>ready</b>
                </p>
                <p>
                  <span>$</span> your business <i>connected</i>
                </p>
              </div>
            </div>
            <div className="arcane-infra-badge">
              <TerminalSquare /> BUILT / RUN / IMPROVE
            </div>
          </div>
          <div className="arcane-infra-copy">
            <p className="arcane-index">{t.infrastructureLabel}</p>
            <h2>{t.infrastructureTitle}</h2>
            <p>{t.infrastructureText}</p>
            <ul>
              {t.infraPoints.map((point) => (
                <li key={point}>
                  <Check /> {point}
                </li>
              ))}
            </ul>
            <a href="#contact" className="arcane-button arcane-button-solid">
              {t.migration} <ArrowRight />
            </a>
          </div>
        </section>

        <section id="work" className="arcane-work-section">
          <div className="arcane-section-intro arcane-section-intro-light">
            <p className="arcane-index">{t.workLabel}</p>
            <h2>{t.workTitle}</h2>
          </div>
          <div className="arcane-principles">
            {t.steps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="arcane-proof-strip">
            <span>{language === "sk" ? "Jeden partner" : "One partner"}</span>
            <i />
            <span>{language === "sk" ? "Jeden zodpovedný systém" : "One accountable system"}</span>
            <i />
            <span>
              {language === "sk" ? "Od prvého hovoru po výsledok" : "From first ring to outcome"}
            </span>
          </div>
        </section>

        <section id="contact" className="arcane-contact-section">
          <div className="arcane-contact-heading">
            <p className="arcane-index">{t.contactLabel}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="arcane-contact-meta">
              <span>Bratislava · Slovakia</span>
              <span>Serving Central Europe</span>
              <span>Adam & Greg · Founders</span>
            </div>
          </div>
          <form className="arcane-contact-form" onSubmit={submitForm}>
            {submitted ? (
              <div className="arcane-form-success">
                <span>
                  <Check />
                </span>
                <h3>{t.formSuccess}</h3>
                <p>
                  {language === "sk"
                    ? "Ak sa e-mail neotvoril, napíšte nám priamo na adam.bencic1@gmail.com."
                    : "If your email client did not open, write to adam.bencic1@gmail.com directly."}
                </p>
              </div>
            ) : (
              <>
                <label>
                  {t.formName}
                  <input required name="name" placeholder="Adam Bencic" />
                </label>
                <label>
                  {t.formEmail}
                  <input required type="email" name="email" placeholder="you@company.com" />
                </label>
                <label>
                  {t.formCompany}
                  <input name="company" placeholder="company.com" />
                </label>
                <label>
                  {t.formNeed}
                  <div className="arcane-select-wrap">
                    <select
                      required
                      name="need"
                      value={selectedNeed}
                      onChange={(event) => setSelectedNeed(event.target.value)}
                    >
                      <option value="">
                        {language === "sk" ? "Vyberte možnosť" : "Select an option"}
                      </option>
                      {t.formOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </label>
                <label className="arcane-form-wide">
                  {t.formMessage}
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder={
                      language === "sk"
                        ? "Napr. nestíhame zdvíhať telefóny..."
                        : "For example, we miss too many calls..."
                    }
                  />
                </label>
                <button type="submit" className="arcane-button arcane-button-solid">
                  {t.formSubmit} <Send />
                </button>
              </>
            )}
          </form>
        </section>
      </main>
      <footer className="arcane-footer">
        <a href="#top" className="arcane-wordmark">
          <span>A</span>
          <strong>ARCANE</strong>
        </a>
        <p>{t.footer}</p>
        <span>© {new Date().getFullYear()} Arcane Infrastructure</span>
      </footer>
    </div>
  );
}
