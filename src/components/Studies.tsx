import { buildsSection, studies, studiesSection } from "@/content/site";
import { t, type Locale } from "@/content/types";
import { Section } from "./Section";
import { UmkeChart } from "./UmkeChart";
import styles from "./Studies.module.css";

export function Studies({ locale }: { locale: Locale }) {
  return (
    <Section
      id="studies"
      label={t(studiesSection.label, locale)}
      title={t(studiesSection.title, locale)}
      intro={t(studiesSection.intro, locale)}
    >
      <ol className={styles.list}>
        {studies.map((study) => (
          <li key={study.id} id={study.id} className={styles.item}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                <span className={styles.course}>
                  {study.course}
                  <span className={styles.year}>{study.year}</span>
                </span>
                <span className={styles.titleBlock}>
                  <span className={styles.title}>{t(study.title, locale)}</span>
                  <span className={styles.methods}>{t(study.methods, locale)}</span>
                </span>
                <span className={styles.headline}>{t(study.headline, locale)}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>

              <div className={styles.body}>
                <ol className={styles.steps}>
                  {study.steps.map((step) => (
                    <li key={t(step.label, "en")} className={styles.step}>
                      <span className={styles.stepLabel}>{t(step.label, locale)}</span>
                      <p>{t(step.text, locale)}</p>
                    </li>
                  ))}
                </ol>
                <div className={styles.aside}>
                  {study.figure ? (
                    <figure className={styles.figure}>
                      <img
                        src={study.figure.src}
                        width={study.figure.width}
                        height={study.figure.height}
                        alt={t(study.figure.alt, locale)}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>{t(study.figure.caption, locale)}</figcaption>
                    </figure>
                  ) : null}
                  {study.chart === "umke-coverage" ? <UmkeChart locale={locale} /> : null}
                  <p className={styles.meta}>
                    {t(study.team, locale)}
                    {study.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener">
                        {t(link.label, locale)} ↗
                      </a>
                    ))}
                  </p>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>

      <div className={styles.builds}>
        <h3 className={styles.buildsTitle}>{t(buildsSection.title, locale)}</h3>
        <ul>
          {buildsSection.items.map((build) => (
            <li key={build.name}>
              <span className={styles.buildName}>{build.name}</span>
              <span className={styles.buildText}>
                {t(build.text, locale)}
                {build.link ? (
                  <>
                    {" "}
                    <a href={build.link.href} target="_blank" rel="noopener">
                      {t(build.link.label, locale)} ↗
                    </a>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
