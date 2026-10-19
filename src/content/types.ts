export type Locale = "en" | "tr";

/** A string in both languages. English and Turkish live side by side so they cannot drift apart. */
export type L = { en: string; tr: string };
export type Text = string | L;

export const t = (value: Text, locale: Locale): string =>
  typeof value === "string" ? value : value[locale];

export type Lane = "industry" | "builds" | "programs" | "education";

export interface PlanBar {
  id: string;
  lane: Lane;
  row: number;
  /** YYYY-MM, first month of the bar. */
  start: string;
  /** YYYY-MM, last month of the bar (inclusive). Omit for work that is still going. */
  end?: string;
  label: Text;
  href?: string;
  /** Work done remotely is drawn hatched. */
  remote?: boolean;
}

export interface PlanMilestone {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  label: Text;
  href?: string;
  /** Label line, so neighbouring labels do not collide. */
  line: 0 | 1 | 2;
}

export interface LinkItem {
  label: Text;
  href: string;
}

export interface LedgerRow {
  label: Text;
  before?: Text;
  after: Text;
  note?: Text;
}

export interface LedgerGroup {
  basis: Text;
  rows: LedgerRow[];
}

export interface Figure {
  src: string;
  width: number;
  height: number;
  alt: Text;
  caption: Text;
  /** "phone" figures are shown side by side at phone size. */
  frame?: "plain" | "phone";
}

export interface CaseStudy {
  id: string;
  lane: Lane;
  kicker: Text;
  title: Text;
  award?: Text;
  status?: Text;
  pitch: Text;
  body: Text[];
  diagram?: "planning-loop";
  role: Text;
  points?: Text[];
  ledger: LedgerGroup[];
  stack: Text[];
  links: LinkItem[];
  figures: Figure[];
}

export interface StudyStep {
  label: Text;
  text: Text;
}

export interface Study {
  id: string;
  course: string;
  year: string;
  title: Text;
  methods: Text;
  headline: Text;
  team: Text;
  steps: StudyStep[];
  figure?: Figure;
  chart?: "umke-coverage";
  links: LinkItem[];
}

export interface Build {
  name: string;
  text: Text;
  link?: LinkItem;
}

export interface Role {
  id: string;
  org: string;
  title: Text;
  dates: Text;
  place: Text;
  points: Text[];
  see?: LinkItem;
}

export interface AwardItem {
  title: Text;
  org?: Text;
  date: Text;
  note?: Text;
  href?: string;
}

export interface WhereUsed {
  label: Text;
  href?: string;
}

export interface SkillRow {
  name: Text;
  where: WhereUsed[];
}

export interface SkillGroup {
  name: Text;
  rows: SkillRow[];
}
