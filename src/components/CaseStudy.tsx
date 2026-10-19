import { ui } from "@/content/site";
import { t, type CaseStudy as CaseStudyData, type Locale } from "@/content/types";
import { Gallery } from "./Gallery";
import { Ledger } from "./Ledger";
import { PlanningLoop } from "./PlanningLoop";
import styles from "./CaseStudy.module.css";

export function CaseStudy({ data, locale }: { data: CaseStudyData; locale: Locale }) {
  const figures = data.figures.map((f) => ({
    src: f.src,
    width: f.width,
    height: f.height,
    alt: t(f.alt, locale),
    caption: t(f.caption, locale),
    frame: f.frame ?? "plain",
  }));

  return (
    <article id={data.id} className={styles.case} data-lane={data.lane} aria-labelledby={`${data.id}-title`}>
      <header className={styles.head}>
        <p className={styles.kicker}>
          <span className={styles.tick} aria-hidden="true" />
          {t(data.kicker, locale)}
        </p>
        <h3 id={`${data.id}-title`} className={styles.title}>
          {t(data.title, locale)}
        </h3>
        {data.award ? (
          <p className={styles.award}>
            <span className={styles.diamond} aria-hidden="true" />
            {t(data.award, locale)}
          </p>
        ) : null}
        {data.status ? <p className={styles.status}>{t(data.status, locale)}</p> : null}
        <p className={styles.pitch}>{t(data.pitch, locale)}</p>
      </header>

      <div className={styles.body}>
        <aside className={styles.spec} aria-label={t(ui.results, locale)}>
          <Ledger groups={data.ledger} locale={locale} />
          <div className={styles.block}>
            <h4 className="eyebrow">{t(ui.myPart, locale)}</h4>
            <p>{t(data.role, locale)}</p>
          </div>
          <div className={styles.block}>
            <h4 className="eyebrow">{t(ui.builtWith, locale)}</h4>
            <ul className={styles.stack}>
              {data.stack.map((item) => (
                <li key={t(item, "en")}>{t(item, locale)}</li>
              ))}
            </ul>
          </div>
          {data.links.length > 0 ? (
            <div className={styles.block}>
              <h4 className="eyebrow">{t(ui.links, locale)}</h4>
              <ul className={styles.links}>
                {data.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener">
                      {t(link.label, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <div className={styles.story}>
          <Gallery figures={figures} showLabel={t(ui.show, locale)} />
          <div className={styles.text}>
            {data.body.map((paragraph, i) => (
              <p key={i}>{t(paragraph, locale)}</p>
            ))}
          </div>
          {data.diagram === "planning-loop" ? <PlanningLoop locale={locale} /> : null}
          {data.points?.length ? (
            <ul className={styles.points}>
              {data.points.map((point, i) => (
                <li key={i}>{t(point, locale)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
