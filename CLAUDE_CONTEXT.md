# EnviroGenome Guardian: Claude context

Paste or point Claude at this file at the start of a session on this repo.

## Project

- React 19 + Vite 8 + React Router 7 SPA, Leaflet for the map, deployed on Vercel. Serverless Gemini proxy in `api/`.
- Package manager: pnpm (`pnpm build`, `pnpm lint` via oxlint, `pnpm preview`).
- Routes: `/` landing, `/app` home, `/app/registry`, `/app/map`, `/app/conservation`, `/app/standards`, `/app/therapeutic`, `/app/scores`, `/app/contact`, plus a 404.
- Styling: shadcn/ui (Tailwind v4, new-york style, JSX) in `src/components/ui/`, themed in `src/index.css` (army tokens mapped to shadcn variables). Legacy layout CSS lives in `src/theme.css`, imported into the `app` cascade layer below Tailwind utilities; leaflet overrides stay unlayered in `index.css`. Shared helpers: `src/components/kit.jsx` (PageHeader, SearchInput, Segmented on ToggleGroup, sortable Table on shadcn Table). Toasts use Sonner through `useToast()`.
- References: no source lists on pages. All references sit behind the References collapsible in the app footer (`src/components/References.jsx`, data in `src/data/literature.js` and `src/data/references.js`) and in the landing footer. The Registry citation-export tool stays.

## House rules

- No em dashes or en dashes anywhere (code, copy, data, docs). Use a hyphen or rewrite.
- Do not change formulas (`src/utils/gcs.js`), cited data (`src/data/*`) or the API (`api/`) during interface work.
- The data is deliberately citation-only. Do not invent sites, figures or mutations.
- The project is described as "still in progress". The older student-project wording was removed on 2026-10-12.

## Theme (army green primary, applied 2026-10-12)

| Token | Hex | Use |
| --- | --- | --- |
| `--army` | #4B5320 | Button fills, active nav, selected segments and rows, focus rings, meters |
| `--army-hover` | #3F461A | Hover and pressed states of army fills |
| `--army-soft` | #8F9F5A | Text, heading accents and icons on dark surfaces only (landing hero, toasts) |
| `--army-tint` | #E8ECDA | Light surface tint for selected items (checkboxes, table rows, site rows, persona cards, shared diff words) |
| `--ink` | #0A0A0A | Body text and dark surfaces. Kept, no longer a primary fill |
| `--paper` | #FAFAF8 | Page background |
| `--graphite` | #6B6B6B | Secondary text |
| `--sev3` | #D8442C | Level 3 severity. Fixed, never recolour |
| `--ok` | #237A35 | Success text (darkened from #2f9e44 for contrast) |

Rules:
- Text on `--army` and `--army-hover` is white (#fff). Secondary text on army uses `rgba(255,255,255,.8)`, not .6.
- Never use `--army` as text or a focus ring on a dark surface. Use `--army-soft` (the landing hero and nav override the focus ring colour for this reason).
- Never use `--army-soft` as text on a light surface (2.76:1).
- On `--army-tint`, secondary text uses `--mute` (#59584F), not graphite (graphite is 4.43:1 there).
- Fonts: IBM Plex Mono, Fraunces, Inter.
- PWA `theme_color`, `background_color` and `<meta name="theme-color">` are #4B5320. Favicon, apple touch icon and the in-app logo stroke are army.
- Green presence pass (client asked for more green): army top bar (white crumb, white focus rings), army-tint sidebar, army eyebrows, section titles, KPI labels and values, army-tint pills and table headers, army outline buttons, army toasts, army landing footer, green hero grid and borders. It lives in the "green presence" block at the end of `src/theme.css` and `src/pages/landing.css`, so it can be tuned in one place.

Score grid colour scale (`src/pages/Scores.jsx`): 80+ #4B5320, 65+ #5E6B33, 50+ #6B6B6B, 40+ #A3561E, under 40 #D8442C. All bands take white text except the bottom band, which takes ink.

## Landing page (redesigned 2026-10-12)

- `src/pages/Landing.jsx` + `src/pages/landing.css` (all classes prefixed `lp-`). Field-journal layout on real Commons photography in `public/images/landing/` (credits in `CREDITS.md` there and on the page itself).
- Sections: deep green duotone hero (Lagos Lagoon fishermen, `--army-deep` #262B12, live counts from the data files); field record for the Ebute Meta site with readings parsed from `sites[].sub` in `src/data/platform.js`; three-step method (sampling, lab, DNA gel); Makoko exposure band; mangrove conservation split; module index from `MODULES`; closing call to action; army footer with photo credits.
- No scroll-hidden content and no fake live charts. Keep every photo caption and credit if images change.

## Bracketed definitions

- `docs/definitions.md` is the single source. It is a two-column markdown table (Term, Definition), imported as raw text by `src/components/Term.jsx` and parsed at build time. All definitions are currently "placeholder definition".
- Usage: `<Term name="Genotoxic" />` or `<Term name="Mutation">mutations</Term>` renders `term (definition)`. An unknown term or a blank definition renders the term alone.
- Applied to the first occurrence of each term per page in running text, list item names and table names. It is skipped in buttons, segmented controls, inputs, select options, headings, eyebrows, pills, SVG diagrams, citations and AI prompts.
- Current placements: Landing (contaminant, mutations, genome, CAS, genotoxic, Level 3 on the field record); Home (L0 to L3 severity rows, LGAs); Registry (the five contaminant names, CAS, Genotoxic, mutation); Map (severity level in the selected-site badge and the submit form); Standards (all 12 instrument names); Therapeutic (etiologies). Conservation, Scores and Contact have no placements yet.

## Known open items

- Level 3 red text (#D8442C) on paper is 4.20:1, under 4.5:1 for small text (sev badges, genotoxic flag, error and "Not configured" states). It is left as is because the colour is fixed. A darker text-only variant (for example #B83A24) would fix it if allowed.
- Other copy still says "coursework" without "student": sidebar footer, notification, Home "About this build", Contact subtitle and the Scores print footer.
- The landing flow rail reveals rows on scroll, so headless full-page screenshots show only the first rows.
