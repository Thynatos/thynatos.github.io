import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { meta, person } from "@/content/site";
import { fontClasses } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  alternates: { canonical: "/", languages: { en: "/", tr: "/tr/" } },
  title: meta.title.en,
  description: meta.description.en,
  icons: { icon: "/icon.svg" },
  openGraph: { title: meta.title.en, description: meta.description.en, type: "profile", locale: "en_GB", url: "/" },
};

export const viewport: Viewport = { themeColor: "#0f2233" };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
