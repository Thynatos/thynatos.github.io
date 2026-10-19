import { education, experienceSection, roles } from "@/content/site";
import { t, type Locale } from "@/content/types";
import { Section } from "./Section";
import styles from "./Experience.module.css";

export function Experience({ locale }: { locale: Locale }) {
  return (
    <Section id="experience" label={t(experienceSection.label, locale)} title={t(experienceSection.title, locale)}>
      <ol className={styles.list}>
        {roles.map((role) => (
          <li key={role.id} id={role.id} className={styles.role}>
            <p className={styles.dates}>{t(role.dates, locale)}</p>
            <div className={styles.who}>
              <h3 className={styles.org}>{role.org}</h3>
              <p className={styles.title}>{t(role.title, locale)}</p>
              <p className={styles.place}>{t(role.place, locale)}</p>
            </div>
            <div className={styles.what}>
              <ul>
                {role.points.map((point, i) => (
                  <li key={i}>{t(point, locale)}</li>
                ))}
              </ul>
              {role.see ? (
                <a className={styles.see} href={role.see.href}>
                  {t(role.see.label, locale)} ↑
                </a>
              ) : null}
            </div>
          </li>
        ))}
        <li id={education.id} className={styles.role} data-kind="education">
          <p className={styles.dates}>{t(education.dates, locale)}</p>
          <div className={styles.who}>
            <h3 className={styles.org}>{t(education.org, locale)}</h3>
            <p className={styles.title}>{t(education.title, locale)}</p>
            <p className={styles.place}>{t(education.place, locale)}</p>
          </div>
          <div className={styles.what}>
            <ul>
              {education.points.map((point, i) => (
                <li key={i}>{t(point, locale)}</li>
              ))}
            </ul>
          </div>
        </li>
      </ol>
    </Section>
  );
}
