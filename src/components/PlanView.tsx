import { plan } from "@/content/site";
import { t, type Locale, type PlanBar } from "@/content/types";
import { PlanScroller } from "./PlanScroller";
import styles from "./PlanView.module.css";

const [Y0, M0] = plan.from.split("-").map(Number);
const MONTHS = monthIndex(plan.to) + 1;
/** Narrowest the timeline track gets before the plan scrolls sideways (px). */
const TRACK_MIN = 860;
const PX_PER_MONTH = TRACK_MIN / MONTHS;
/** Rough width of a bar label in Barlow Condensed 600 at 14px, plus padding. */
const labelWidth = (text: string) => text.length * 6.4 + 14;

function monthIndex(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return (y - Y0) * 12 + (m - M0);
}

/** Position of a calendar day, in months from the start of the plan. */
function dayPosition(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const days = new Date(y, m, 0).getDate();
  return (y - Y0) * 12 + (m - M0) + (d - 0.5) / days;
}

const pct = (months: number) => `${(months / MONTHS) * 100}%`;
const NOW = dayPosition(plan.now.date);

type Placed = PlanBar & {
  x0: number;
  x1: number;
  clipped: boolean;
  ongoing: boolean;
  placement: "inside" | "right" | "left";
};

function placeBars(locale: Locale): Placed[] {
  const placed = plan.bars.map((bar) => {
    const x0 = Math.max(0, monthIndex(bar.start));
    const x1 = bar.end ? monthIndex(bar.end) + 1 : NOW;
    return { ...bar, x0, x1, clipped: monthIndex(bar.start) < 0, ongoing: !bar.end, placement: "inside" as const };
  });
  return placed.map((bar) => {
    const width = labelWidth(t(bar.label, locale));
    const barPx = (bar.x1 - bar.x0) * PX_PER_MONTH;
    if (width <= barPx) return bar;
    const neighbours = placed.filter((o) => o.lane === bar.lane && o.row === bar.row && o.id !== bar.id);
    const nextStart = Math.min(MONTHS, ...neighbours.filter((o) => o.x0 >= bar.x1).map((o) => o.x0));
    const prevEnd = Math.max(0, ...neighbours.filter((o) => o.x1 <= bar.x0).map((o) => o.x1));
    const roomRight = (nextStart - bar.x1) * PX_PER_MONTH;
    const roomLeft = (bar.x0 - prevEnd) * PX_PER_MONTH;
    return { ...bar, placement: roomRight >= width || roomRight >= roomLeft ? "right" : "left" };
  });
}

function monthName(ym: string, locale: Locale) {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { month: "short", year: "numeric" }).format(
    new Date(y, m - 1, 15),
  );
}

function describe(bar: Placed, locale: Locale) {
  const start = monthName(bar.start, locale);
  const end = bar.end ? monthName(bar.end, locale) : t({ en: "now", tr: "bugün" }, locale);
  const remote = bar.remote ? t({ en: ", remote", tr: ", uzaktan" }, locale) : "";
  return `${t(bar.label, locale)}${remote}: ${start} – ${end}`;
}

export function PlanView({ locale }: { locale: Locale }) {
  const bars = placeBars(locale);
  const lanes = plan.lanes;
  const years: { label: string; at: number }[] = [];
  for (let i = 0; i < MONTHS; i++) {
    const month = (M0 - 1 + i) % 12;
    if (i === 0 || month === 0) years.push({ label: String(Y0 + Math.floor((M0 - 1 + i) / 12)), at: i });
  }
  const order = [...bars].sort((a, b) => a.x0 - b.x0).map((b) => b.id);

  return (
    <figure className={styles.plan} aria-labelledby="plan-title">
      <div className={styles.head}>
        <p className="eyebrow">{t(plan.label, locale)}</p>
        <h2 id="plan-title" className={styles.title}>
          {t(plan.title, locale)}
        </h2>
        <p className={styles.caption}>{t(plan.caption, locale)}</p>
      </div>

      <PlanScroller className={styles.scroller} label={t(plan.title, locale)} hint={t({ en: "Scroll the plan sideways", tr: "Planı yana kaydırın" }, locale)}>
        <div className={styles.grid} style={{ ["--months" as string]: MONTHS, ["--track-min" as string]: `${TRACK_MIN}px` }}>
          {/* lane names, pinned on narrow screens */}
          <div className={styles.labels} aria-hidden="true">
            <div className={styles.axisSpacer} />
            {lanes.map((lane) => (
              <div key={lane.id} className={styles.laneLabel} data-lane={lane.id} style={{ ["--rows" as string]: lane.rows ?? 3 }}>
                {t(lane.label, locale)}
              </div>
            ))}
          </div>

          <div className={styles.timeline}>
            <div className={styles.axis} aria-hidden="true">
              <div className={styles.years}>
                {years.map((y) => (
                  <span key={y.label} style={{ left: pct(y.at) }}>
                    {y.label}
                  </span>
                ))}
              </div>
              <div className={styles.months}>
                {Array.from({ length: MONTHS }, (_, i) => (
                  <span key={i} data-january={(M0 - 1 + i) % 12 === 0 || undefined}>
                    {plan.months[locale][(M0 - 1 + i) % 12]}
                  </span>
                ))}
              </div>
            </div>

            {years.slice(1).map((y) => (
              <div key={y.label} className={styles.yearLine} style={{ left: pct(y.at) }} aria-hidden="true" />
            ))}

            {lanes.map((lane) =>
              lane.id === "results" ? (
                <ul key={lane.id} className={styles.track} data-lane="results" style={{ ["--rows" as string]: 3 }}>
                  {plan.milestones.map((m) => (
                    <li key={m.id} className={styles.milestone} style={{ left: pct(dayPosition(m.date)), ["--line" as string]: m.line }}>
                      <a href={m.href}>
                        <span className={styles.diamond} aria-hidden="true" />
                        <span className={styles.milestoneLabel}>{t(m.label, locale)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul key={lane.id} className={styles.track} data-lane={lane.id} style={{ ["--rows" as string]: lane.rows ?? 1 }}>
                  {bars
                    .filter((b) => b.lane === lane.id)
                    .map((bar) => (
                      <li
                        key={bar.id}
                        className={styles.bar}
                        data-lane={bar.lane}
                        data-placement={bar.placement}
                        data-remote={bar.remote || undefined}
                        data-clipped={bar.clipped || undefined}
                        data-ongoing={bar.ongoing || undefined}
                        style={{
                          left: `calc(${pct(bar.x0)} + 1px)`,
                          width: `calc(${pct(bar.x1 - bar.x0)} - 2px)`,
                          ["--row" as string]: bar.row,
                          ["--delay" as string]: `${order.indexOf(bar.id) * 70}ms`,
                        }}
                      >
                        <a href={bar.href} aria-label={describe(bar, locale)}>
                          <span className={styles.fill} aria-hidden="true" />
                          <span className={styles.barLabel} aria-hidden="true">
                            {t(bar.label, locale)}
                          </span>
                        </a>
                      </li>
                    ))}
                </ul>
              ),
            )}

            <div className={styles.now} style={{ left: pct(NOW) }} aria-hidden="true">
              <span>{t(plan.now.label, locale)}</span>
            </div>
          </div>
        </div>
      </PlanScroller>

      <ul className={styles.legend} aria-label={t({ en: "Legend", tr: "Açıklama" }, locale)}>
        <li data-key="industry">{t({ en: "Industry", tr: "Sanayi" }, locale)}</li>
        <li data-key="builds">{t({ en: "Projects", tr: "Projeler" }, locale)}</li>
        <li data-key="programs">{t({ en: "Programs", tr: "Programlar" }, locale)}</li>
        <li data-key="remote">{t({ en: "Remote", tr: "Uzaktan" }, locale)}</li>
        <li data-key="result">{t({ en: "Result", tr: "Sonuç" }, locale)}</li>
      </ul>
    </figure>
  );
}
