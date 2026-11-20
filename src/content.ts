import type { BoardRow } from "./split-flap";
export type Lang = "sk" | "en";
export type Status = "late" | "soon" | "ok" | "nodoc";

export type Row = { code: string; site: string; due: string; dueAfter: string; before: Status; after: Status };

// Illustrative register of a fictional operator, shown in the hero statement.
export const ROWS: Row[] = [
  { code: "TT-Z-006", site: "Trnava", due: "14. 03. 2026", dueAfter: "14. 03. 2027", before: "late", after: "ok" },
  { code: "NR-P-002", site: "Nitra", due: "02. 05. 2026", dueAfter: "02. 12. 2027", before: "late", after: "ok" },
  { code: "ZA-T-011", site: "Žilina", due: "28. 11. 2026", dueAfter: "28. 11. 2027", before: "soon", after: "ok" },
  { code: "TT-E-031", site: "Trnava", due: "—", dueAfter: "19. 12. 2029", before: "nodoc", after: "ok" },
  { code: "SE-Z-004", site: "Senec", due: "09. 08. 2026", dueAfter: "09. 03. 2027", before: "late", after: "ok" },
  { code: "BA-E-012", site: "Bratislava", due: "17. 02. 2027", dueAfter: "17. 02. 2027", before: "ok", after: "ok" },
  { code: "NR-E-044", site: "Nitra", due: "21. 12. 2026", dueAfter: "21. 12. 2029", before: "soon", after: "ok" },
];

export const ROW_NAMES: Record<Lang, string[]> = {
  sk: ["Mostový žeriav 5 t", "Plynová kotolňa K1", "Vzdušník kompresora", "Rozvádzač RH-3", "Vysokozdvižný vozík 2", "Bleskozvod, centrála", "Elektrická inštalácia, hala B"],
  en: ["Overhead crane 5 t", "Gas boiler room K1", "Compressor air receiver", "Switchboard RH-3", "Forklift 2", "Lightning protection, HQ", "Electrical installation, hall B"],
};

export const copy = {
  sk: {
    nav: { audit: "Audit", product: "Control Tower", process: "Postup", contact: "Kontakt" },
    navCta: "Objednať audit",
    heroTitle: "Viete dokázať, že každé vaše zariadenie má platnú revíziu?",
    heroText:
      "Žeriavy, kotly, tlakové nádoby, rozvádzače. Pre firmy s viacerými prevádzkami zmapujeme všetky vyhradené technické zariadenia, nájdeme revízie po termíne a chýbajúce doklady a postavíme z nich register, ktorý sa sám udržiava.",
    heroCta: "Objednať pilotný audit",
    heroSecondary: "Ako audit prebieha",
    heroNote: "Prvý výsledok do 10 pracovných dní. Bez inštalácie.",
    stmt: {
      title: "Výpis zhody",
      company: "Valtra Components a.s.",
      sample: "ukážkové dáta",
      before: "Deň 1",
      after: "Deň 30",
      score: "Zhoda",
      cols: ["Zariadenie", "Prevádzka", "Termín", "Stav"],
      status: { late: "Po termíne", soon: "Do 30 dní", ok: "V poriadku", nodoc: "Bez dokladu" } as Record<Status, string>,
      foot: "312 zariadení · 5 prevádzok · 1 204 dokumentov",
    },
    stakes: [
      ["1 000 – 200 000 €", "pokuta inšpektorátu práce za závažné porušenie povinností (§ 19 zák. č. 125/2006 Z. z.)"],
      ["Vyhláška 508/2009", "vyžaduje evidenciu každého vyhradeného zariadenia a revízie v predpísaných lehotách"],
      ["5 dodávateľov, 3 formáty", "typický stav: správy v PDF, šanónoch a Exceli, nikto nemá celý obraz"],
    ],
    offerTitle: "Dve zákazky. Jasný rozsah, fixná cena.",
    offerText: "Začíname auditom, ktorý ukáže skutočný stav. Ak chcete, aby taký stav aj zostal, prevezmeme priebežnú evidenciu.",
    offers: [
      {
        name: "Audit zhody VTZ",
        kind: "Jednorazová zákazka",
        lead: "Správa pre vedenie o tom, kde dnes stojíte, a 30-dňový plán nápravy.",
        terms: [
          ["Rozsah", "Všetky prevádzky, všetky kategórie VTZ: elektrické, plynové, tlakové, zdvíhacie"],
          ["Vstup", "Vaše existujúce revízne správy, registre a certifikáty v akejkoľvek forme"],
          ["Výstup", "Register zariadení, zoznam zariadení po termíne, nevyriešené závady, chýbajúce doklady, plán nápravy"],
          ["Trvanie", "10 pracovných dní od odovzdania podkladov"],
          ["Cena", "Fixná, podľa počtu prevádzok. Dohodneme pred začatím."],
        ],
      },
      {
        name: "Control Tower",
        kind: "Mesačná služba",
        lead: "Živý register všetkých zariadení, ktorý sa aktualizuje s každou novou revíznou správou.",
        terms: [
          ["Prehľad", "Stav zhody všetkých prevádzok v reálnom čase, riziká zoradené podľa závažnosti"],
          ["Správy", "Dodávatelia posielajú PDF, systém ich prečíta a zapíše. Každý zápis kontroluje človek."],
          ["Termíny", "Plán revízií na 12 mesiacov, upozornenia vopred, objednávka revízie jedným klikom"],
          ["Dodávatelia", "Ktorá revízna firma dodržiava termíny a ktorá nie"],
          ["Cena", "Mesačný paušál podľa počtu zariadení. Bez viazanosti."],
        ],
      },
    ],
    processTitle: "Audit za 10 pracovných dní",
    process: [
      ["Deň 1", "Úvodné stretnutie", "Prejdeme prevádzky a dodávateľov. Dostanete zabezpečený priestor na nahratie dokumentov."],
      ["Deň 2–6", "Spracovanie", "AI vytiahne z každej správy zariadenie, dátumy, výsledok a závady. Každý údaj overí človek."],
      ["Deň 7–9", "Vyhodnotenie", "Porovnáme termíny, závady a doklady naprieč prevádzkami a pripravíme plán nápravy."],
      ["Deň 10", "Odovzdanie", "Správa pre vedenie, kompletný register a prístup do Control Tower."],
    ],
    board: {
      title: "Najbližšie revízie",
      cols: ["Termín", "Zariadenie", "Prevádzka", "Stav"],
      rows: [
        { date: "18.11.", code: "NR-E-044", site: "Nitra", state: "Mešká", tone: "late" as BoardRow["tone"] },
        { date: "24.11.", code: "TT-Z-006", site: "Trnava", state: "Potvrdená", tone: "ok" as BoardRow["tone"] },
        { date: "27.11.", code: "NR-P-002", site: "Nitra", state: "Objednaná", tone: "soon" as BoardRow["tone"] },
        { date: "28.11.", code: "ZA-T-011", site: "Žilina", state: "Čaká", tone: "soon" as BoardRow["tone"] },
        { date: "02.12.", code: "SE-Z-004", site: "Senec", state: "Objednaná", tone: "soon" as BoardRow["tone"] },
        { date: "05.12.", code: "BA-E-012", site: "Bratislava", state: "Potvrdená", tone: "ok" as BoardRow["tone"] },
      ],
      caption: "Ukážka z Control Tower, fiktívna firma",
    },
    toastTitle: "Revízia zapísaná",
    toastNext: "ďalší termín",
    productTitle: "Jeden register pre všetky prevádzky",
    productText:
      "Control Tower nahrádza šanóny a Excel. Každé zariadenie má QR štítok, históriu revízií a otvorené závady. Vedenie vidí jedno číslo, údržba vidí, čo má urobiť tento týždeň.",
    productPoints: [
      "Evidencia podľa prílohy č. 4 vyhlášky 508/2009 Z. z.",
      "Prístup pre vedenie, údržbu aj externého auditora",
      "Export do Excelu a správa pre vedenie v PDF",
      "Dáta uložené v EÚ, prístup podľa rolí",
    ],
    forTitle: "Pre koho to robíme",
    forItems: [
      ["Výroba", "Závody so žeriavmi, kotlami a tlakovými systémami"],
      ["Logistika a sklady", "Vysokozdvižné vozíky, regálové zakladače, rampy"],
      ["Správa nehnuteľností", "Kotolne, výťahy a elektroinštalácie v desiatkach budov"],
      ["Zdravotníctvo a verejný sektor", "Viac budov, viac dodávateľov, prísne kontroly"],
    ],
    partnerTitle: "Ste revízna firma?",
    partnerText:
      "Spolupracujeme s revíznymi technikmi. Vaše správy idú priamo do registra klienta, termíny máte pod kontrolou a my vám posielame klientov, ktorí potrebujú revíziu.",
    partnerCta: "Ozvite sa nám",
    alsoTitle: "Na mieru",
    alsoText:
      "Pre prevádzkovo náročné firmy staviame aj vlastné AI systémy: spracovanie dokumentov, interné znalostné bázy a hlasových agentov pre zákaznícku linku.",
    contactTitle: "Začnime pilotným auditom jednej prevádzky",
    contactText: "Napíšte nám pár údajov. Ozveme sa do jedného pracovného dňa s návrhom rozsahu a termínu.",
    form: {
      name: "Meno a priezvisko",
      email: "Pracovný e-mail",
      company: "Firma",
      sites: "Počet prevádzok",
      sitesOpts: ["1", "2–5", "6–20", "Viac ako 20"],
      role: "Vaša rola",
      roleOpts: ["Vedenie / prevádzka", "BOZP / technik", "Údržba", "Revízna firma", "Iné"],
      message: "Čo chcete vyriešiť (nepovinné)",
      submit: "Odoslať dopyt",
      sent: "Otvárame váš e-mail s pripravenou správou. Ak sa neotvoril, napíšte na",
    },
    footer: "Arcane Infrastructure, Bratislava",
    footerNote: "Audit identifikuje medzery v evidencii a termínoch. Nenahrádza odbornú prehliadku ani skúšku, ktorú vykonáva revízny technik s oprávnením.",
  },
  en: {
    nav: { audit: "Audit", product: "Control Tower", process: "Process", contact: "Contact" },
    navCta: "Book an audit",
    heroTitle: "Can you prove every piece of your regulated equipment is inspected?",
    heroText:
      "Cranes, boilers, pressure vessels, switchboards. For operators with several sites, we map every regulated asset, find overdue inspections and missing records, and turn them into a register that keeps itself current.",
    heroCta: "Book a pilot audit",
    heroSecondary: "How the audit works",
    heroNote: "First results in 10 working days. Nothing to install.",
    stmt: {
      title: "Compliance statement",
      company: "Valtra Components a.s.",
      sample: "sample data",
      before: "Day 1",
      after: "Day 30",
      score: "Compliance",
      cols: ["Asset", "Site", "Due", "Status"],
      status: { late: "Overdue", soon: "Due in 30 days", ok: "Compliant", nodoc: "No record" } as Record<Status, string>,
      foot: "312 assets · 5 sites · 1,204 documents",
    },
    stakes: [
      ["€1,000 – 200,000", "labour inspectorate fine for a serious breach of duties (Act 125/2006, § 19)"],
      ["Decree 508/2009", "requires a register of every regulated asset and inspections within set intervals"],
      ["5 contractors, 3 formats", "the usual picture: reports in PDFs, binders and Excel, nobody sees all of it"],
    ],
    offerTitle: "Two engagements. Clear scope, fixed price.",
    offerText: "We start with an audit that shows where you really stand. If you want it to stay that way, we take over the ongoing register.",
    offers: [
      {
        name: "Compliance audit",
        kind: "One-off engagement",
        lead: "A board-level report on where you stand today, with a 30-day remediation plan.",
        terms: [
          ["Scope", "Every site and every regulated category: electrical, gas, pressure, lifting"],
          ["Input", "Your existing inspection reports, registers and certificates, in any format"],
          ["Output", "Asset register, overdue inspections, open defects, missing records, remediation plan"],
          ["Duration", "10 working days from receiving the documents"],
          ["Price", "Fixed, by number of sites. Agreed before we start."],
        ],
      },
      {
        name: "Control Tower",
        kind: "Monthly service",
        lead: "A live register of every asset, updated with each new inspection report.",
        terms: [
          ["Overview", "Real-time compliance for every site, risks ranked by severity"],
          ["Reports", "Contractors send PDFs, the system reads and files them. A person checks every entry."],
          ["Deadlines", "12-month inspection plan, early alerts, one-click inspection requests"],
          ["Contractors", "Which inspection firms meet their deadlines and which don't"],
          ["Price", "Monthly fee by number of assets. No lock-in."],
        ],
      },
    ],
    processTitle: "The audit in 10 working days",
    process: [
      ["Day 1", "Kick-off", "We walk through your sites and contractors. You get a secure space to upload documents."],
      ["Days 2–6", "Processing", "AI extracts the asset, dates, result and defects from every report. A person verifies each entry."],
      ["Days 7–9", "Assessment", "We compare deadlines, defects and records across sites and draft the remediation plan."],
      ["Day 10", "Handover", "Board report, the complete register and access to Control Tower."],
    ],
    board: {
      title: "Upcoming inspections",
      cols: ["Date", "Asset", "Site", "Status"],
      rows: [
        { date: "18 Nov", code: "NR-E-044", site: "Nitra", state: "Overdue", tone: "late" as BoardRow["tone"] },
        { date: "24 Nov", code: "TT-Z-006", site: "Trnava", state: "Confirmed", tone: "ok" as BoardRow["tone"] },
        { date: "27 Nov", code: "NR-P-002", site: "Nitra", state: "Booked", tone: "soon" as BoardRow["tone"] },
        { date: "28 Nov", code: "ZA-T-011", site: "Zilina", state: "Pending", tone: "soon" as BoardRow["tone"] },
        { date: "02 Dec", code: "SE-Z-004", site: "Senec", state: "Booked", tone: "soon" as BoardRow["tone"] },
        { date: "05 Dec", code: "BA-E-012", site: "Bratislava", state: "Confirmed", tone: "ok" as BoardRow["tone"] },
      ],
      caption: "Control Tower screen, fictional company",
    },
    toastTitle: "Inspection recorded",
    toastNext: "next due",
    productTitle: "One register for every site",
    productText:
      "Control Tower replaces binders and spreadsheets. Every asset has a QR label, an inspection history and its open defects. Management sees one number; maintenance sees what to do this week.",
    productPoints: [
      "Register structured to Annex 4 of Decree 508/2009",
      "Access for management, maintenance and external auditors",
      "Excel export and a PDF board report",
      "Data stored in the EU, role-based access",
    ],
    forTitle: "Who it's for",
    forItems: [
      ["Manufacturing", "Plants with cranes, boilers and pressure systems"],
      ["Logistics and warehousing", "Forklifts, stacker cranes, dock equipment"],
      ["Property management", "Boiler rooms, lifts and electrical systems across many buildings"],
      ["Healthcare and public sector", "Many buildings, many contractors, strict inspections"],
    ],
    partnerTitle: "Are you an inspection firm?",
    partnerText:
      "We work with licensed inspection technicians. Your reports go straight into the client's register, your deadlines stay under control, and we send you clients who need inspections.",
    partnerCta: "Get in touch",
    alsoTitle: "Custom work",
    alsoText:
      "For operations-heavy companies we also build custom AI systems: document processing, internal knowledge bases and voice agents for customer lines.",
    contactTitle: "Start with a pilot audit of one site",
    contactText: "Send us a few details. We reply within one working day with a proposed scope and timeline.",
    form: {
      name: "Full name",
      email: "Work email",
      company: "Company",
      sites: "Number of sites",
      sitesOpts: ["1", "2–5", "6–20", "More than 20"],
      role: "Your role",
      roleOpts: ["Management / operations", "Health & safety / engineering", "Maintenance", "Inspection firm", "Other"],
      message: "What do you want to solve (optional)",
      submit: "Send request",
      sent: "Opening your email with the message ready. If it didn't open, write to",
    },
    footer: "Arcane Infrastructure, Bratislava",
    footerNote: "The audit identifies gaps in records and deadlines. It does not replace the inspections and tests performed by a licensed inspection technician.",
  },
};
