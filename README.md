# Portfolio site · Bahadır Maral

A one-page portfolio in English (`/`) and Turkish (`/tr/`). Static Next.js export: `npm run build` writes plain HTML to `out/`.

## Design

The page is laid out like an industrial engineer's planning documents. Keep these rules when adding things:

| Element | Rule |
|---|---|
| **Plan view** (hero) | Years drawn as a Gantt chart. |
| **Lane colours** | Cobalt = industry, teal = projects, plum = programs, grey = education. They mean the same thing everywhere. |
| **Diamonds** | Results (awards). |
| **Hatched bars** | Remote work. |
| **Results ledger** | Each project shows *before → after* numbers and the basis they were measured on. |
| **Skills** | A "where-used" list, as in a bill of materials. Every skill links to the work that shows it. |
| **Type** | Barlow Condensed (DIN-like) for headings, TeX Gyre Pagella (the CV's face) for text, IBM Plex Mono for data. |

All tokens live in `src/app/globals.css`.

## Editing content

All copy is in **`src/content/site.ts`**. English and Turkish sit side by side as `l("English", "Türkçe")`.

Content rules, the same as the CVs:

- **Facts:** only verified facts; every number traces to a report, repository or test log.
- **Academic signal:** no CGPA; use ALES. Mark remote internships as remote.
- **Turkish formatting:** decimal comma (`28,2`) and a leading percent sign (`%0,08`).

## Images

1. Screenshots and figures are listed in `scripts/prepare_media.py`. It copies sources into `media-src/`, converts them to WebP in `public/media/` and writes `src/content/media.json`.
2. A figure whose image is missing is skipped automatically.
3. Rerun after changing any image:

```bash
python scripts/prepare_media.py
```

Other scripts:

| Script | What it does |
|---|---|
| `scripts/plot_sabanci.py` | Draws the Sabancı route figure from the challenge repository. |
| `scripts/emu.py` | adb helper used to capture the Eşik screens. They were taken from the emulator with networking off, so no Gemini call was made. |
| `scripts/shoot.py` | Full-page QA screenshots into `qa/` (needs the dev server running). |
| `scripts/build_fonts.py` | Subsets Pagella from MiKTeX into `src/fonts/`. |

## Run and build

```bash
npm install
npm run dev
npm run build
```

- `npm run dev` serves the site at http://localhost:3000.
- `npm run build` writes the static site to `out/`.

## Publishing

The site is live at **https://thynatos.github.io** (repository `Thynatos/thynatos.github.io`).

- Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, then the `out/` folder is deployed to GitHub Pages.
- `media-src/` (raw captures and copies of source artifacts) stays local and is not in the repository. The finished images in `public/media/` are committed.

To move to a custom domain later:

1. Add the domain in the repository's Pages settings.
2. Point the DNS to GitHub Pages.
3. Change `person.siteUrl` in `src/content/site.ts` and the URLs in `public/robots.txt` and `public/sitemap.xml`.
