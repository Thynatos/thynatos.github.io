import { hero } from "@/content/site";
import { t, type Locale } from "@/content/types";
import { PlanView } from "./PlanView";
import styles from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className="eyebrow">{t(hero.eyebrow, locale)}</p>
            <h1 id="hero-title" className={styles.headline}>
              {t(hero.headline, locale)}
            </h1>
            <p className={styles.intro}>{t(hero.intro, locale)}</p>
            <ul className={styles.links}>
              {hero.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel={link.href.startsWith("http") ? "me noopener" : undefined}>
                    {t(link.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className={styles.facts}>
            {hero.facts.map((fact) => (
              <div key={t(fact.label, "en")} className={styles.fact}>
                <dt>{t(fact.label, locale)}</dt>
                <dd>
                  {t(fact.value, locale)}
                  {fact.note ? <span className={styles.note}>{t(fact.note, locale)}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.plan}>
          <PlanView locale={locale} />
        </div>
      </div>
    </section>
  );
}
