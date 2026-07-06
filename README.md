# EnviroGenome Guardian

**Environmental Health and Genomic Hazard Platform**

A comprehensive interdisciplinary platform bridging environmental science, genomic research, and public health. Built to document, track, analyse, and address environmental hazards and their biological impacts across Lagos and beyond.

Modelled after authoritative scientific databases, EnviroGenome connects pollutants, genotoxic agents, genome sequences, and geographical contamination hotspots in one unified interface.

---

## Demo build

> React 18 + Vite + pnpm. Monochrome precision console UI. All data is mock JSON. No backend required.

### Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`

### Build for production

```bash
pnpm build
pnpm preview
```

---

## Platform modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Home portal** | Live dashboard feed, KPI cards, sites by severity, featured research |
| 2 | **Contaminant registry** | 12 chemical profiles with physical properties, IARC classification, genome damage tables, and external resource links |
| 3 | **Geolocation hazard map** | Leaflet + OpenStreetMap, 15 Lagos sites rated 0 to 3 severity, synced searchable site list |
| 4 | **Conservation intelligence** | 8 at-risk Lagos wetland species, sortable risk table, threat forecasting |
| 5 | **Standards reference library** | 22 instruments from global treaty to Lagos State by-law, sortable and filterable by tier |
| 6 | **Therapeutic rehabilitation** | Anonymised patient intake, symptom selection, environmental etiology matching |
| 7 | **Global classification score** | 18 Lagos district habitability grades, composite breakdown, sortable grid |

---

## AI features

Five Gemini 1.5 Flash touchpoints, called directly from the browser. Click **Gemini key** in the top bar and paste a key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

| Feature | Module | What it does |
|---------|--------|--------------|
| Natural-language contaminant search | Registry | Ask "which solvents cause p53 mutations?" and get a toxicology answer |
| Auto-draft audit report | Map | Generates a court-admissible site report with NESREA regulatory references |
| Mitigation brief | Conservation | Turns a threat description into a ministerial-tone committee brief |
| Regulatory gap analyser | Standards | Compares two instruments and identifies compliance conflicts |
| Symptom to etiology match | Therapeutic | Ranks probable environmental causes from a symptom checklist |

Keys are held in memory for the session only. Never stored or sent anywhere but Google's API.

---

## UI

- **Left sidebar** on desktop with keyboard shortcut hints (1 through 7)
- **Bottom glassmorphic nav** on mobile
- **Global Cmd+K command palette** searches across all modules, contaminants, sites, and standards simultaneously with arrow-key navigation
- Sortable data tables with column headers
- Master-detail layout for the contaminant registry
- Skeleton loaders, toast feedback, empty states
- Monochrome black and white design system (finalized), one accent colour reserved for Level 3 hazard severity
- Responsive down to 390px

---

## Stack

| Layer | Demo | Production (planned) |
|-------|------|----------------------|
| Framework | React 18 + Vite | React 18 + Vite |
| Package manager | pnpm | pnpm |
| Routing | React Router v6 | React Router v6 |
| Styling | Plain CSS variables | Tailwind CSS v4 + shadcn/ui |
| Map library | Leaflet 1.9 | MapLibre GL JS (MIT) |
| Map tiles | OpenStreetMap (free, no key) | OpenFreeMap or MapTiler Cloud |
| AI model | Gemini 1.5 Flash (browser, user key) | Gemini 1.5 Pro (server-side) |
| Backend | None (mock JSON) | FastAPI (Python) |
| Database | None | PostgreSQL + PostGIS + Redis |
| Auth | None | Keycloak SSO + RBAC |
| Hosting | Static file | Kubernetes on GKE or AWS EKS |

---

## Mock data

- 12 contaminants with full property tables, IARC ratings, and genome mutation records
- 15 Lagos hazard sites at real coordinates, rated 0 to 3 severity
- 8 at-risk Lagos wetland species with extinction probability scores
- 22 environmental instruments from Stockholm Convention to Rivers State Board Rules 2025
- 18 Lagos district habitability scores with composite sub-scores
- Anchored to **University of Lagos (UNILAG)** and **Lagos University Teaching Hospital (LUTH)**

---

## Project context

EnviroGenome Guardian is designed to solve the siloed nature of current environmental monitoring systems:

- Genomic repositories rarely connect contaminant data to mutation signatures
- Geographic pollution mapping lacks integration with biological consequence analysis
- Healthcare practitioners have no centralised system linking patient conditions to environmental exposures
- Conservation initiatives proceed without standardised frameworks for documenting ecological threats
- Local environmental audits often lack alignment with international regulatory benchmarks

**Target users:** Genomic researchers, environmental auditors, conservation biologists, clinical therapists, and policy makers.

**Year 3 goals:** 50k contaminant entries, 100k geolocated hazards, 1M monthly active searches, 50+ regulatory agency partnerships, 100+ jurisdictions indexed.

---

## Repository structure

```
src/
  components/       # Shared UI: Layout, AiPanel, CommandPalette, ui primitives
  data/             # Mock JSON: contaminants, sites, species, standards, scores
  hooks/            # KeyContext (Gemini key), ToastContext
  pages/            # One file per module
  utils/            # gemini.js API client
  theme.css         # Full design system, monochrome, finalized
```

---

## Notes

- The map requires a network connection to load OpenStreetMap tiles. All other modules work offline.
- The Netlify `_redirects` file is included so the SPA router works on deploy without extra config.
- No `.env` file needed for the demo. The Gemini key is entered at runtime.

---

*EnviroGenome Guardian, demo build v1.0. University of Lagos and Lagos University Teaching Hospital.*
