import { person, ui } from "@/content/site";
import { t, type Locale } from "@/content/types";
import styles from "./Header.module.css";

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.name}>
          {person.name}
        </a>
        <nav className={styles.nav} aria-label={t({ en: "Sections", tr: "Bölümler" }, locale)}>
          <ul>
            {ui.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{t(item.label, locale)}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className={styles.lang} aria-label={t({ en: "Language", tr: "Dil" }, locale)}>
          {(["en", "tr"] as const).map((code) => (
            <li key={code}>
              <a
                href={ui.langSwitch[code].href}
                hrefLang={code}
                lang={code}
                aria-label={ui.langSwitch[code].aria}
                aria-current={code === locale ? "page" : undefined}
              >
                {ui.langSwitch[code].label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
