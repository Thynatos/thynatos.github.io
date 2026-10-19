import { awards, awardsSection, programs, volunteering } from "@/content/site";
import { t, type AwardItem, type Locale } from "@/content/types";
import { Section } from "./Section";
import styles from "./Awards.module.css";

function Group({ title, items, kind, locale }: { title: string; items: AwardItem[]; kind: "award" | "other"; locale: Locale }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={t(item.title, "en") + t(item.date, "en")} className={styles.item} data-kind={kind}>
            {kind === "award" ? <span className={styles.diamond} aria-hidden="true" /> : null}
            <div className={styles.content}>
              <p className={styles.date}>{t(item.date, locale)}</p>
              <p className={styles.title}>{t(item.title, locale)}</p>
              {item.org ? <p className={styles.org}>{t(item.org, locale)}</p> : null}
              {item.note ? (
                <p className={styles.note}>
                  {item.href ? <a href={item.href}>{t(item.note, locale)} ↑</a> : t(item.note, locale)}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Awards({ locale }: { locale: Locale }) {
  return (
    <Section id="awards" label={t(awardsSection.label, locale)} title={t(awardsSection.title, locale)}>
      <div className={styles.grid}>
        <Group title={t(awardsSection.groups.awards, locale)} items={awards} kind="award" locale={locale} />
        <Group title={t(awardsSection.groups.programs, locale)} items={programs} kind="other" locale={locale} />
        <Group title={t(awardsSection.groups.volunteering, locale)} items={volunteering} kind="other" locale={locale} />
      </div>
    </Section>
  );
}
