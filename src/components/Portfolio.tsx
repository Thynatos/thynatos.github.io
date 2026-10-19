import { cases, ui, workSection } from "@/content/site";
import { t, type Locale } from "@/content/types";
import { Awards } from "./Awards";
import { CaseStudy } from "./CaseStudy";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { HashOpener } from "./HashOpener";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { Skills } from "./Skills";
import { Studies } from "./Studies";

export function Portfolio({ locale }: { locale: Locale }) {
  return (
    <>
      <a className="skip-link" href="#main">
        {t(ui.skip, locale)}
      </a>
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <Section id="work" label={t(workSection.label, locale)} title={t(workSection.title, locale)} intro={t(workSection.intro, locale)}>
          {cases.map((c) => (
            <CaseStudy key={c.id} data={c} locale={locale} />
          ))}
        </Section>
        <Studies locale={locale} />
        <Experience locale={locale} />
        <Awards locale={locale} />
        <Skills locale={locale} />
      </main>
      <Contact locale={locale} />
      <HashOpener />
    </>
  );
}
