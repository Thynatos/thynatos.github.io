import { Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

// Display: a DIN-like condensed grotesque, the lettering of engineering standards.
export const display = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

// Data: plan dates, results and labels.
export const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Body: TeX Gyre Pagella, the same face as the CV (GUST Font License).
export const body = localFont({
  src: [
    { path: "../fonts/pagella-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/pagella-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/pagella-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pagella",
  display: "swap",
});

export const fontClasses = `${display.variable} ${mono.variable} ${body.variable}`;
