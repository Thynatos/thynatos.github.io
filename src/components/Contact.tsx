import { contact, person } from "@/content/site";
import { t, type Locale } from "@/content/types";
import styles from "./Contact.module.css";

export function Contact({ locale }: { locale: Locale }) {
  return (
    <footer id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className="eyebrow">{t(contact.label, locale)}</p>
            <h2 id="contact-title" className="visually-hidden">
              {t(contact.title, locale)}
            </h2>
            <a className={styles.email} href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <p className={styles.text}>{t(contact.text, locale)}</p>
          </div>
          <ul className={styles.links}>
            <li>
              <a href={person.linkedin} rel="me noopener" target="_blank">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={person.github} rel="me noopener" target="_blank">
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.colophon}>
          <p>
            {t(contact.updatedLabel, locale)} {t(person.updated, locale)}
          </p>
          <p>{t(contact.footer, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
