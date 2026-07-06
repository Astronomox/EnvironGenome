# EnviroGenome Guardian, demo build

Environmental health and genomic hazard platform. React + Vite single-page demo.
Monochrome design system, anchored to University of Lagos (UNILAG) and Lagos University Teaching Hospital (LUTH).

## Run it

```bash
pnpm install
pnpm dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build a production bundle:

```bash
pnpm build
pnpm preview
```

## What is inside

Seven modules plus a landing page, reachable from the left sidebar (desktop) or the bottom glass nav (mobile):

1. Home portal, live dashboard feed
2. Contaminant registry, 12 chemical profiles with genome damage tables
3. Geolocation hazard map, Leaflet + OpenStreetMap, 15 Lagos sites rated 0 to 3
4. Conservation intelligence, 8 species at risk plus threat forecasting
5. Standards reference library, 22 instruments from global treaty to Lagos by-law
6. Therapeutic rehabilitation, anonymised intake plus symptom matching
7. Global classification score, 18 district habitability grades

## AI features (Gemini)

Five AI touchpoints run on Google Gemini 1.5 Flash, called directly from the browser.
Click "Gemini key" in the top bar and paste a key from https://aistudio.google.com/apikey

1. Registry, natural-language contaminant search
2. Map, auto-draft auditor report from a site
3. Conservation, threat to mitigation brief
4. Standards, regulatory gap analyser between two jurisdictions
5. Therapeutic, symptom to environmental etiology match

The key is held in memory for the session only. It is never stored or sent anywhere but Google's API.

## Notes

- The map needs a network connection to load OpenStreetMap tiles. Tiles are greyscaled in CSS to match the theme.
- All other data is mock JSON in src/data/. No backend, no auth.
- This is a demo. See the stack comparison for the production technology plan.

## Stack (demo)

React 18, Vite, React Router, Leaflet, OpenStreetMap tiles, Google Gemini API. All free.
