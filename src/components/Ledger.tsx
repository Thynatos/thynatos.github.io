import { ui } from "@/content/site";
import { t, type LedgerGroup, type Locale } from "@/content/types";
import styles from "./Ledger.module.css";

/** Results as a before → after ledger, each group with the basis it was measured on. */
export function Ledger({ groups, locale }: { groups: LedgerGroup[]; locale: Locale }) {
  return (
    <div className={styles.ledger}>
      <h4 className="eyebrow">{t(ui.results, locale)}</h4>
      {groups.map((group) => (
        <div key={t(group.basis, "en")} className={styles.group}>
          <p className={styles.basis}>{t(group.basis, locale)}</p>
          <dl>
            {group.rows.map((row) => {
              const before = row.before ? t(row.before, locale) : undefined;
              const after = t(row.after, locale);
              const spoken = before ? (locale === "tr" ? `${before}, sonra ${after}` : `${before} to ${after}`) : after;
              return (
                <div key={t(row.label, "en")} className={styles.row}>
                  <dt>
                    {t(row.label, locale)}
                    {row.note ? <span className={styles.note}>{t(row.note, locale)}</span> : null}
                  </dt>
                  <dd aria-label={spoken}>
                    {before ? (
                      <>
                        <span className={styles.before} aria-hidden="true">
                          {before}
                        </span>
                        <span className={styles.arrow} aria-hidden="true">
                          →
                        </span>
                      </>
                    ) : null}
                    <span className={styles.after} aria-hidden="true">
                      {after}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
