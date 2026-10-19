import { skills, skillsSection, ui } from "@/content/site";
import { t, type Locale } from "@/content/types";
import { Section } from "./Section";
import styles from "./Skills.module.css";

export function Skills({ locale }: { locale: Locale }) {
  return (
    <Section
      id="skills"
      label={t(skillsSection.label, locale)}
      title={t(skillsSection.title, locale)}
      intro={t(skillsSection.intro, locale)}
    >
      <div className={styles.groups}>
        {skills.map((group) => (
          <table key={t(group.name, "en")} className={styles.table}>
            <caption className={styles.caption}>{t(group.name, locale)}</caption>
            <thead className="visually-hidden">
              <tr>
                <th scope="col">{t(ui.skill, locale)}</th>
                <th scope="col">{t(ui.usedIn, locale)}</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={t(row.name, "en")}>
                  <th scope="row">{t(row.name, locale)}</th>
                  <td>
                    <ul className={styles.where}>
                      {row.where.map((w) => (
                        <li key={t(w.label, "en")}>
                          {w.href ? <a href={w.href}>{t(w.label, locale)}</a> : <span>{t(w.label, locale)}</span>}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
      <dl className={styles.extra}>
        <div>
          <dt>{t(skillsSection.tools.label, locale)}</dt>
          <dd>{t(skillsSection.tools.text, locale)}</dd>
        </div>
        <div>
          <dt>{t(skillsSection.languages.label, locale)}</dt>
          <dd>{t(skillsSection.languages.text, locale)}</dd>
        </div>
      </dl>
    </Section>
  );
}
