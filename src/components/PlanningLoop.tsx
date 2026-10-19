import { t, type Locale } from "@/content/types";
import styles from "./PlanningLoop.module.css";

const steps = [
  {
    title: { en: "Forecast", tr: "Tahmin" },
    detail: { en: "Company forecast and its monthly ranges", tr: "Şirket tahmini ve aylık sapma aralıkları" },
  },
  {
    title: { en: "Long-term model", tr: "Uzun vadeli model" },
    detail: { en: "12 months · two-stage stochastic · monthly stock targets", tr: "12 ay · iki aşamalı stokastik · aylık stok hedefleri" },
  },
  {
    title: { en: "Short-term model", tr: "Kısa vadeli model" },
    detail: { en: "48 days · MILP · which line makes what, each day", tr: "48 gün · MILP · hangi hat her gün ne üretecek" },
  },
  {
    title: { en: "Weekly plan", tr: "Haftalık plan" },
    detail: { en: "Line schedule and raw-material orders, reviewed on Monday", tr: "Hat çizelgesi ve hammadde siparişleri, pazartesi gözden geçiriliyor" },
  },
];

/** How the two BobaCo models connect, drawn as the weekly loop it runs in. */
export function PlanningLoop({ locale }: { locale: Locale }) {
  return (
    <figure className={styles.loop}>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title.en} className={styles.step} data-model={i === 1 || i === 2 || undefined}>
            <span className={styles.title}>{t(step.title, locale)}</span>
            <span className={styles.detail}>{t(step.detail, locale)}</span>
          </li>
        ))}
      </ol>
      <p className={styles.back}>
        <span aria-hidden="true">↺</span>{" "}
        {t({ en: "Every week the plan is re-run with the latest demand (rolling horizon).", tr: "Plan her hafta en güncel taleple yeniden çalıştırılıyor (kayan ufuk)." }, locale)}
      </p>
      <figcaption className="visually-hidden">
        {t({ en: "How the planning models connect", tr: "Planlama modellerinin birbirine bağlanışı" }, locale)}
      </figcaption>
    </figure>
  );
}
