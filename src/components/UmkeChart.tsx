import { umkeChart } from "@/content/site";
import { t, type Locale } from "@/content/types";
import styles from "./UmkeChart.module.css";

const MAX_SITES = 5;
const fmt = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", { maximumFractionDigits: 1 }).format(value);

/** Facilities needed for full coverage at each service radius, with the coverage four sites reach. */
export function UmkeChart({ locale }: { locale: Locale }) {
  return (
    <figure className={styles.chart}>
      <figcaption className={styles.caption}>{t(umkeChart.title, locale)}</figcaption>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="row">{t(umkeChart.radiusLabel, locale)}</th>
            {umkeChart.rows.map((row) => (
              <th key={row.r} scope="col">
                {row.r} km
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.bars}>
            <th scope="row">{t({ en: "Sites", tr: "Tesis" }, locale)}</th>
            {umkeChart.rows.map((row) => (
              <td key={row.r}>
                <span className={styles.bar} style={{ height: `${(row.sites / MAX_SITES) * 80}%` }} data-over={row.sites > 4 || undefined}>
                  <span className={styles.value}>{row.sites}</span>
                </span>
              </td>
            ))}
          </tr>
          <tr className={styles.coverage}>
            <th scope="row">{t(umkeChart.coverageTitle, locale)}</th>
            {umkeChart.rows.map((row) => (
              <td key={row.r} data-full={row.coverage === 100 || undefined}>
                {locale === "tr" ? `%${fmt(row.coverage, locale)}` : `${fmt(row.coverage, locale)}%`}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </figure>
  );
}
