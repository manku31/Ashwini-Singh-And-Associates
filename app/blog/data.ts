export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
};

// Dummy posts — replace with real articles later.
export const blogPosts: BlogPost[] = [
  {
    slug: "handling-a-gst-notice",
    title: "Received a GST notice? Here's how to respond calmly",
    excerpt:
      "What the common notice types mean, the deadlines that matter and how to prepare a clean reply.",
    category: "GST",
    date: "2026-10-12",
    readTime: "6 min read",
    image: "/images/blog/gst-notice.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "Don't panic — read the notice first",
        paragraphs: [
          "A GST notice is a request for information or an explanation, not an automatic penalty. Start by identifying the notice type, the section it cites and the reply deadline printed on it.",
        ],
      },
      {
        heading: "Gather the right documents",
        paragraphs: [
          "Most notices relate to mismatches between returns. Reconcile GSTR-1, GSTR-3B and GSTR-2B for the period in question before drafting a reply.",
        ],
        points: [
          "Sales and purchase registers",
          "Reconciliation statements",
          "Proof of tax payment and input tax credit claims",
        ],
      },
      {
        heading: "Reply on time, with evidence",
        paragraphs: [
          "File the response on the GST portal within the deadline, attach supporting documents and keep an acknowledgement. If the matter is complex, get a professional to draft the reply.",
        ],
      },
    ],
  },
  {
    slug: "old-vs-new-tax-regime",
    title: "Old vs new tax regime: how to choose this year",
    excerpt:
      "A side-by-side look at slabs, deductions and who actually benefits from each regime.",
    category: "Income Tax",
    date: "2026-09-28",
    readTime: "7 min read",
    image: "/images/blog/tax-regime.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "Two regimes, one decision",
        paragraphs: [
          "Every salaried taxpayer and many professionals must choose between the old and new regime. The right choice depends on how much you claim in deductions.",
        ],
      },
      {
        heading: "When the old regime wins",
        paragraphs: [
          "If you claim substantial deductions, the old regime often results in lower tax.",
        ],
        points: [
          "Home loan interest and principal",
          "Section 80C investments and insurance",
          "HRA and other exemptions",
        ],
      },
      {
        heading: "When the new regime wins",
        paragraphs: [
          "With few deductions, lower slab rates in the new regime usually give a smaller bill and far simpler paperwork. Run both calculations every year — your numbers change.",
        ],
      },
    ],
  },
  {
    slug: "first-year-startup-compliance",
    title: "First-year compliance checklist for new startups",
    excerpt:
      "Every filing a newly incorporated company must complete in its first twelve months.",
    category: "Startups",
    date: "2026-09-10",
    readTime: "5 min read",
    image: "/images/blog/startup-compliance.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "Incorporation is only the start",
        paragraphs: [
          "A newly incorporated company has filing obligations from day one, even before its first rupee of revenue.",
        ],
      },
      {
        heading: "Your first-year checklist",
        paragraphs: ["Keep a calendar so nothing is missed."],
        points: [
          "Appoint the first auditor within 30 days",
          "File the commencement of business declaration",
          "Open the bank account and deposit share capital",
          "Register for GST and professional tax if applicable",
        ],
      },
      {
        heading: "Build good habits early",
        paragraphs: [
          "Maintain books monthly, hold board meetings on schedule and keep statutory registers updated. It is far cheaper than fixing gaps later.",
        ],
      },
    ],
  },
  {
    slug: "getting-audit-ready",
    title: "Getting audit-ready: records to keep all year",
    excerpt:
      "Small monthly habits that make year-end audits faster, cheaper and far less stressful.",
    category: "Audit",
    date: "2026-08-22",
    readTime: "6 min read",
    image: "/images/blog/audit-readiness.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "Audits reward preparation",
        paragraphs: [
          "The biggest cause of audit delays is missing paperwork, not complex accounting. Small monthly habits remove most of the pain.",
        ],
      },
      {
        heading: "Habits that help",
        paragraphs: ["Build these into your month-end routine."],
        points: [
          "Reconcile bank statements every month",
          "File invoices and vouchers in order",
          "Keep a fixed-asset register",
          "Document related-party transactions",
        ],
      },
      {
        heading: "Talk to your auditor early",
        paragraphs: [
          "Share a draft trial balance well before year-end so questions surface when there is still time to answer them.",
        ],
      },
    ],
  },
  {
    slug: "tds-basics-for-businesses",
    title: "TDS basics every business owner should know",
    excerpt:
      "When to deduct, at what rate, and how to avoid interest and late-filing penalties.",
    category: "TDS",
    date: "2026-08-05",
    readTime: "5 min read",
    image: "/images/blog/tds-basics.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "What is TDS?",
        paragraphs: [
          "Tax Deducted at Source requires certain payments — salaries, rent, professional fees, contractor payments — to have tax deducted before the payee receives the balance.",
        ],
      },
      {
        heading: "Your responsibilities",
        paragraphs: ["Once you deduct, the obligations follow quickly."],
        points: [
          "Deduct at the correct rate",
          "Deposit by the 7th of the following month",
          "File quarterly TDS returns",
          "Issue Form 16 / 16A on time",
        ],
      },
      {
        heading: "The cost of getting it wrong",
        paragraphs: [
          "Late deduction or deposit attracts interest, and late returns attract daily fees. Missed deductions can also lead to expense disallowance.",
        ],
      },
    ],
  },
  {
    slug: "tax-guide-for-nris",
    title: "A practical tax guide for NRIs with Indian income",
    excerpt:
      "Residency rules, DTAA relief and the filings NRIs most often miss.",
    category: "NRI",
    date: "2026-07-18",
    readTime: "8 min read",
    image: "/images/blog/nri-tax.svg",
    author: "Ashwini Singh",
    sections: [
      {
        heading: "Residency decides everything",
        paragraphs: [
          "Your tax liability in India depends on your residential status, which is determined by days spent in India across the current and previous years.",
        ],
      },
      {
        heading: "Common NRI filings",
        paragraphs: [
          "Many NRIs overlook income they earn without realising it is taxable in India.",
        ],
        points: [
          "Rental income from Indian property",
          "Interest on NRO accounts",
          "Capital gains on shares and property",
        ],
      },
      {
        heading: "Avoid double taxation",
        paragraphs: [
          "India has tax treaties (DTAA) with many countries. Claiming relief correctly needs a tax residency certificate and careful documentation.",
        ],
      },
    ],
  },
];
