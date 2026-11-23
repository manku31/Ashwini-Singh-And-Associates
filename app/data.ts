export const nav = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#resources" },
  { label: "Contact Us", href: "#contact" },
];

export const stats = [
  { value: "15", suffix: "+", label: "Years of Trust" },
  { value: "500", suffix: "+", label: "Clients Served" },
  { value: "99", suffix: "%", label: "Client Retention" },
];

export const clientele = ["Startups", "MSMEs", "Corporates", "Professionals", "NRIs", "Trusts & NGOs"];

export const values = [
  { n: "01", title: "Integrity first", text: "Independent, ethical advice, always within ICAI standards." },
  { n: "02", title: "Partner attention", text: "Senior involvement on every file, not just the first meeting." },
  { n: "03", title: "Clarity, not jargon", text: "Plain-language reporting you can act on." },
];

export type IconName = "audit" | "tax" | "finance" | "gst" | "law" | "cfo";

export const services: { icon: IconName; title: string; text: string; points: string[] }[] = [
  {
    icon: "audit",
    title: "Audit & Assurance",
    text: "Independent audits that give lenders, investors and regulators confidence in your numbers.",
    points: ["Statutory & internal audit", "Tax audit (Sec. 44AB)", "Stock & concurrent audit"],
  },
  {
    icon: "tax",
    title: "Tax Advisory",
    text: "Proactive income-tax planning, filings and representation for businesses and individuals.",
    points: ["ITR filing & tax planning", "Assessments & notices", "NRI & international tax"],
  },
  {
    icon: "finance",
    title: "Corporate Finance",
    text: "Clear-eyed support for funding, valuations and transactions as your company scales.",
    points: ["Business valuations", "Due diligence", "Project & loan reports"],
  },
  {
    icon: "gst",
    title: "GST & Indirect Tax",
    text: "Registration, returns and reconciliations handled on time, every cycle.",
    points: ["GST registration & returns", "ITC reconciliation", "Audits, refunds & notices"],
  },
  {
    icon: "law",
    title: "Company Law & Compliance",
    text: "Incorporation to annual filings — your secretarial calendar, managed.",
    points: ["Company & LLP incorporation", "ROC annual filings", "FEMA & RBI compliance"],
  },
  {
    icon: "cfo",
    title: "Virtual CFO & Advisory",
    text: "Senior finance leadership on demand, without a full-time hire.",
    points: ["Bookkeeping & MIS reports", "Budgeting & cash-flow", "Board & investor reporting"],
  },
];

export const whyUs = [
  { title: "Qualified CAs on every file", text: "Returns and audits are signed off by ICAI-qualified Chartered Accountants." },
  { title: "Deadline-proof compliance", text: "A shared calendar tracks GST, TDS and ROC due dates, with reminders before penalty windows." },
  { title: "Transparent fixed fees", text: "Clear scope and fixed-fee proposals, so there are no surprises at year end." },
  { title: "One point of contact", text: "A single relationship owner, backed by tax, audit and corporate-law specialists." },
  { title: "Tax saved, legitimately", text: "Proactive planning within the Income Tax Act and Companies Act." },
  { title: "Confidential by design", text: "Secure document handling and strict access controls, per the ICAI Code of Ethics." },
];

export const process = [
  { n: "01", title: "Discovery call", text: "We understand your business, goals and current obligations." },
  { n: "02", title: "Assessment", text: "A review of records and risks, with a fixed-scope proposal." },
  { n: "03", title: "Execution", text: "Filings, audits and reports delivered against an agreed calendar." },
  { n: "04", title: "Ongoing review", text: "Regular check-ins so you stay ahead of every deadline." },
];

export const resources = [
  { tag: "GST", kind: "GST · GUIDE", title: "Your GST compliance calendar, month by month", text: "Returns, due dates and the reconciliations to run before each one.", tone: "navy" },
  { tag: "ITR", kind: "INCOME TAX · EXPLAINER", title: "Old vs new tax regime: how to choose this year", text: "A side-by-side look at deductions, slabs and who benefits from each.", tone: "sand" },
  { tag: "ROC", kind: "STARTUPS · CHECKLIST", title: "First-year compliance checklist for new companies", text: "Everything a newly incorporated company must file in year one.", tone: "gold" },
] as const;

export const faqs = [
  { q: "How do I start working with the firm?", a: "Book a consultation using the form below or call us. We'll schedule a short discovery call to understand your needs and share a fixed-scope proposal." },
  { q: "Can you take over compliance that is already behind?", a: "Yes. We review past filings, reconcile records and bring GST, TDS, ROC and income-tax compliance up to date before moving to a regular calendar." },
  { q: "Are your fees fixed or hourly?", a: "Recurring compliance is quoted as a fixed fee. Advisory and project work is scoped and quoted up front." },
  { q: "Do you work with clients outside our city?", a: "Yes. Most filings and advisory are handled online, with secure document sharing and video calls." },
  { q: "Do fees include government charges and challans?", a: "Professional fees and statutory fees are listed separately in every proposal so you always know what you are paying for." },
];

export const testimonials = [
  {
    quote: "[Client testimonial — add a real quote, shared with the client's permission, about the clarity and care of working with the firm.]",
    name: "[Client name]",
    role: "[Role, Company]",
  },
];

/* Virtual CFO service pillars — categories common to the profession, written in our own words. */
export const pillars = [
  { title: "Financial Strategy & Planning", text: "Forward-looking plans built on your numbers, so decisions rest on data rather than instinct.", points: ["Financial modelling & projections", "Budgets & annual operating plans", "Cash-flow forecasting"] },
  { title: "MIS & Management Reporting", text: "Clear monthly reports that turn raw books into decisions you can act on.", points: ["Monthly MIS packs", "Unit economics & variance analysis", "Board & investor reporting"] },
  { title: "Cash Flow & Working Capital", text: "Keep enough liquidity to run the business and fund its growth.", points: ["Receivables & payables control", "Working-capital optimisation", "Cash-burn tracking"] },
  { title: "Fundraising & Investor Support", text: "Get ready to raise capital and manage investors with confidence.", points: ["Investor-ready projections", "Pitch-deck financials", "Valuation & due-diligence support"] },
  { title: "Compliance & Governance", text: "Strong controls and clean compliance, so audits hold no surprises.", points: ["Accounting review & audit readiness", "Internal-controls design", "GST, income-tax & ROC oversight"] },
  { title: "Systems & Process Automation", text: "Finance systems that scale without adding headcount.", points: ["Accounting-software selection", "ERP advisory & roll-out", "Workflow automation"] },
  { title: "Founder Advisory & CFO Support", text: "A finance partner on call for the decisions that shape the business.", points: ["Decision support", "Expansion feasibility studies", "Periodic financial reviews"] },
  { title: "M&A Advisory", text: "Financial guidance through acquisitions, mergers and exits.", points: ["Target screening & deal strategy", "Financial due diligence", "Business valuation"] },
  { title: "Cost Control & Profitability", text: "Find the margin you are leaving on the table.", points: ["Cost-structure analysis", "Expense optimisation", "Pricing-strategy advice"] },
];

/* Placeholders — replace with the firm's real credentials. Nothing here is borrowed from another practice. */
export const credentials = [
  "[Qualification — e.g. Chartered Accountant, ICAI]",
  "[Years of experience]",
  "[Recognition or award]",
  "[Additional certification]",
  "[Languages spoken]",
];

/**
 * SAMPLE reviews — fictional names and original text, here only to fill the layout.
 * Replace with real, permission-cleared client reviews before launch, then set SHOW_SAMPLE_LABEL to false.
 */
export const SHOW_SAMPLE_LABEL = true;

export const reviews = [
  { name: "Rahul Verma", meta: "Founder, D2C brand · Pune", tone: "navy", quote: "Our GST filings were months behind. They cleaned up the backlog, reconciled everything and put a calendar in place. We haven't missed a due date since." },
  { name: "Meera Kulkarni", meta: "Consultant · Navi Mumbai", tone: "gold", quote: "I used to dread tax season. The team explained my options in plain language, picked the right regime for me and filed well before the deadline." },
  { name: "Imran Sheikh", meta: "Director, trading firm · Thane", tone: "sand", quote: "Responsive, patient and thorough. Every query got a clear answer, and our TDS returns are now filed on time, every quarter." },
  { name: "Priya Nair", meta: "Co-founder, SaaS startup · Bengaluru", tone: "navy", quote: "The monthly MIS gave us numbers we could actually use. It made our investor conversations far easier and our planning much sharper." },
  { name: "Arjun Mehta", meta: "NRI client · Dubai", tone: "gold", quote: "Handling Indian tax from abroad felt daunting. They managed the paperwork end to end and kept me informed at every step." },
  { name: "Sunita Deshmukh", meta: "Trustee, NGO · Mumbai", tone: "sand", quote: "Our trust's accounts and compliance were scattered. They organised the records, handled the filings and made our audit smooth." },
] as const;
