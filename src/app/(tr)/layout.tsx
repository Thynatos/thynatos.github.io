import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { meta, person } from "@/content/site";
import { fontClasses } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  alternates: { canonical: "/tr/", languages: { en: "/", tr: "/tr/" } },
  title: meta.title.tr,
  description: meta.description.tr,
  icons: { icon: "/icon.svg" },
  openGraph: { title: meta.title.tr, description: meta.description.tr, type: "profile", locale: "tr_TR", url: "/tr/" },
};

export const viewport: Viewport = { themeColor: "#0f2233" };

export default function TurkishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
