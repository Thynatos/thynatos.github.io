import type { ReactNode } from "react";
import styles from "./Section.module.css";

/** A page section with the shared header: eyebrow (the section's name), title and optional intro. */
export function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{label}</p>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
