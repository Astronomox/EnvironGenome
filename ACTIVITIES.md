# EnviroGenome Guardian — Complete Remaining Activities Register
**Version 1.0 — July 2026**
*Covers demo completion, production build, data, model, infrastructure, compliance, and growth*

---

## SECTION 1 — DEMO COMPLETION (Immediate)

### 1.1 Map Module
- [ ] Build new hazard site submission form (GPS pin drop, severity selector, photo uploader, credential field, chain-of-custody checklist)
- [ ] Wire submission form to add pin live to the map without page reload
- [ ] Add offline-capable form state so auditors in low-connectivity zones can fill and queue submission
- [ ] Add EXIF metadata extraction from uploaded photos (timestamp, device, coordinates verification)
- [ ] Add submission confirmation screen with generated case reference number
- [ ] Build 48-hour review queue UI showing pending, validated, and rejected submissions
- [ ] Add time-series slider for hazard evolution playback (PRD GM-009, up to 5 years back)
- [ ] Add area alert subscription button per map region
- [ ] Build print/export report from map view (courtroom-admissible format, certificate of authenticity watermark)
- [ ] Fix filter interaction so clicking L3 also dims map pins correctly on first render
- [ ] Add coordinate search (paste lat/lng and map pans to that location)
- [ ] Add cluster markers for zoomed-out view when many pins overlap

### 1.2 Registry Module
- [ ] Fix Cmd+K deep link so navigating to a contaminant actually selects it in the master-detail list
- [ ] Add peer review submission portal (authenticated scientists propose new compound-genome associations)
- [ ] Build moderation queue UI for submitted entries (approve, reject, request revision)
- [ ] Add CSV bulk importer for lab spreadsheet uploads
- [ ] Add citation export (APA, MLA, Vancouver, NLM formats with DOI resolution)
- [ ] Add visual pathway diagram per contaminant (SVG absorption route, metabolic breakdown, excretion)
- [ ] Add related substances recommendation panel (chemically similar analogues)
- [ ] Add download MSDS button per entry
- [ ] Add report correction link per entry
- [ ] Build compare two contaminants side-by-side view
- [ ] Add pagination or virtual scrolling for when registry grows beyond 50 entries

### 1.3 Therapeutic Module
- [ ] Add post-match confirmation state (results persist, form does not reset)
- [ ] Add referral letter generator (formal letter to LUTH occupational medicine citing etiology match)
- [ ] Build follow-up scheduling UI (set reminder date for re-evaluation)
- [ ] Add family counselling toolkit section (secondary prevention materials)
- [ ] Add previous cases panel (anonymised cohort showing similar symptom clusters)
- [ ] Build secure messaging mock (end-to-end encrypted channel to specialist toxicologist)
- [ ] Add IRB-compliant anonymised dataset export for research use
- [ ] Add proximity calculator (distance from patient address to nearest flagged hazard site)
- [ ] Wire symptom checklist to also filter contaminant registry in background

### 1.4 Conservation Module
- [ ] Add intervention tracking dashboard (adopted mitigation outcomes vs control baselines over time)
- [ ] Add grant opportunity finder (matching funding rounds to active proposals)
- [ ] Add expert locator directory (filter by taxonomic expertise and availability)
- [ ] Add policy brief generator (two-page condensed summary for ministerial circulation)
- [ ] Add early warning subscription (configure by keywords: invasive species, die-off, fire, flooding)
- [ ] Add collaborative annotation threads per conservation plan
- [ ] Add species detail modal with full profile, range map, and historical population data
- [ ] Build timeline visualization dashboard for multi-year trend patterns
- [ ] Add cross-border corridor protection planning tool (migration route mapping)

### 1.5 Standards Module
- [ ] Build side-by-side comparator view (visual diff highlighting between two instruments)
- [ ] Add revision history timeline per instrument (previous versions alongside latest amendments)
- [ ] Add compliance checklist builder (transform statutory language into actionable task list)
- [ ] Add jurisdiction overlap analyser (which laws apply given facility coordinates and industry code)
- [ ] Add enforcement precedent archive (judicial rulings and penalties)
- [ ] Add download bundle (ZIP of selected documents, alphabetically organized)
- [ ] Add glossary tooltip popovers for technical jargon throughout instrument text
- [ ] Add auto-update webhook notification UI (subscriber panel for when standards are revised)
- [ ] Add legislative calendar (upcoming review dates for indexed instruments)

### 1.6 Scores Module
- [ ] Wire district scores to live computation using the formulas when received
- [ ] Add neighborhood comparability widget (side-by-side adjacent districts)
- [ ] Add trend projection arrows per district (improving, declining, stagnant)
- [ ] Add drill-through detail panel showing contributing factor breakdown with narrative
- [ ] Build export-grade cartography download (print-quality poster format)
- [ ] Add API endpoint mock showing raw score inputs and outputs
- [ ] Add Monte Carlo confidence interval display per score (not just a single number)
- [ ] Add historical score comparison (this district 6 months ago vs today)

### 1.7 Home Portal
- [ ] Add live feed ticker at top of page (recent alerts with less than 5-minute latency)
- [ ] Add featured research carousel (rotating peer-reviewed studies, weekly update)
- [ ] Add world map miniaturized view showing global hazard density heatmap with clickable zoom
- [ ] Add newsletter subscription opt-in field
- [ ] Add institutional partners logo section (NCBI-style credibility strip)
- [ ] Add customizable dashboard widget layout (drag-and-drop per user persona)
- [ ] Build drill-down geographic analytics panel
- [ ] Add citation-ready export formats for parliamentary testimony

### 1.8 Landing Page
- [ ] Add scroll-triggered reveal animations for the flow rail section
- [ ] Add scroll indicator arrow below hero pointing to flow rail
- [ ] Fix sensor strip animation to also work on reduced-motion preference gracefully
- [ ] Add video or animated walkthrough embed option
- [ ] Add social proof section with institutional partner logos
- [ ] Build mobile-optimized hero layout (sensor strip stacks below copy cleanly)

### 1.9 Global UI and Navigation
- [ ] Build 404 page (not found, with navigation back to platform)
- [ ] Build Contact page (inquiry routing form, emergency hotline, FAQ accordion, ticket number, SLA confirmation email mock)
- [ ] Add loading skeleton between module navigations on slow connections
- [ ] Add keyboard shortcut help modal (press ? to open)
- [ ] Test and fix Cmd+K command palette on touch devices
- [ ] Add breadcrumb navigation within modules that have sub-views
- [ ] Add user preferences panel (font size, contrast mode, screen reader shortcuts per PRD HP-008)
- [ ] Add high contrast mode toggle
- [ ] Build notification centre (bell icon, aggregated platform alerts)
- [ ] Add onboarding tooltip flow for first-time users per persona
- [ ] Add session persistence for Gemini key across page refreshes (localStorage with user consent)

---

## SECTION 2 — MODEL AND COMPUTATION

### 2.1 Global Classification Score Formula Implementation
- [ ] Receive and review formulas from domain expert
- [ ] Implement Natural Features sub-score: vegetation_coverage% x biodiversity_richness_index x water_purity_metric x terrain_stability_coefficient
- [ ] Implement Air Quality Index aggregation (rolling 72-hour average from monitoring station feeds)
- [ ] Implement Toxic Exposure Probability Monte Carlo simulation (10,000 iterations, uncertainty variance)
- [ ] Define and implement weighting coefficients (w1 through w4) from expert consensus
- [ ] Replace all 18 hardcoded district scores with live computed values
- [ ] Add confidence interval bands to every score output
- [ ] Build score recalculation trigger (fires when a new hazard site is validated in the map module)
- [ ] Add score versioning (log every recalculation with timestamp and input snapshot)

### 2.2 Severity Rating Threshold Engine
- [ ] Define permissible exposure limit thresholds per contaminant class (from NESREA, WHO, US EPA)
- [ ] Build automated severity assignment algorithm (reads sensor data against threshold table)
- [ ] Replace manual severity selector with algorithm-assisted suggestion (auditor can override with justification)
- [ ] Add multi-contaminant severity blending (when a site has lead AND PCB, how do they compound)
- [ ] Build threshold update pipeline (when WHO revises a guideline, thresholds auto-update)

### 2.3 Bayesian Symptom-Etiology Inference Engine
- [ ] Define prior probability table per pollutant class (baseline exposure rates in Lagos)
- [ ] Build conditional probability matrix (P(symptom | pollutant) for each symptom-pollutant pair)
- [ ] Implement Bayesian update algorithm replacing current Gemini-only approach
- [ ] Add confidence score display per ranked etiology (not just rank order)
- [ ] Add geographic prior adjustment (proximity to known hazard sites shifts priors)
- [ ] Validate model against published environmental medicine case data
- [ ] Keep Gemini as explanation layer only, not as the inference engine

### 2.4 Species Extinction Probability Model
- [ ] Define formula: f(habitat_loss_velocity, population_count, fragmentation_index, contamination_pressure)
- [ ] Wire model to update when new hazard sites are logged in affected habitats
- [ ] Add population trend data inputs (annual count data per species)
- [ ] Add climate variable inputs (temperature anomaly, precipitation deviation)
- [ ] Build uncertainty range display (not just a single percentage)
- [ ] Add intervention impact projection (what does the score become if mitigation X is adopted)

### 2.5 Genome-Contaminant Correlation Engine
- [ ] Define confidence grading system for each association (strong, moderate, poor per PRD CR-003)
- [ ] Build evidence-based scoring for each compound-genome pair
- [ ] Add exposure concentration variable (damage pattern at low vs high dose)
- [ ] Add organism-specific pathway maps
- [ ] Plan NCBI BLAST API integration for sequence similarity search
- [ ] Build mutation signature similarity search (find compounds with similar damage profiles)

---

## SECTION 3 — DATA LAYER

### 3.1 Contaminant Registry Data Expansion
- [ ] Expand from 12 to 50+ validated contaminant entries
- [ ] Add at minimum: trichloroethylene, vinyl chloride, dioxins, furans, hexavalent chromium compounds, organophosphate pesticides, polycyclic aromatic hydrocarbons full series, PFAS compounds, asbestos, silica
- [ ] Add exposure pathway diagrams for each entry
- [ ] Add metabolic breakdown product chains
- [ ] Add literature citations archive (minimum 3 peer-reviewed sources per entry)
- [ ] Source and add real LD50, LC50, NOAEL, and LOAEL values from TOXNET
- [ ] Add occupational exposure data (industry sectors most at risk per contaminant)
- [ ] Add environmental fate data (half-life in soil, water, air per compound)

### 3.2 Hazard Site Data Expansion
- [ ] Expand from 15 to 50+ Lagos sites with real historical contamination records
- [ ] Add sites beyond Lagos: Port Harcourt (oil spill zones), Kano (tannery district), Abuja (construction dust), Nnewi (auto recycling)
- [ ] Add historical incident data per site (dates, severity changes over time)
- [ ] Add remediation status field (not started, in progress, completed, verified clean)
- [ ] Add responsible party field (company, government agency, unknown)
- [ ] Add community impact data (population within 1km, 5km, 10km)
- [ ] Source and add real photo evidence for at least anchor sites

### 3.3 Standards Data Expansion
- [ ] Expand from 22 to 100+ jurisdictional instruments as per PRD year 3 target
- [ ] Add full text or abstract for each instrument (not just title and metadata)
- [ ] Add US EPA full regulatory suite
- [ ] Add UK Environment Agency standards
- [ ] Add EU environmental directives series
- [ ] Add ASEAN environmental framework
- [ ] Add all remaining Nigerian state-level instruments beyond Lagos and Rivers
- [ ] Add effective date, last amended date, and next review date per instrument
- [ ] Add implementing authority contact information per instrument

### 3.4 Species and Ecosystem Data
- [ ] Expand from 8 to 30+ at-risk species covering terrestrial, aquatic, and marine
- [ ] Add historical population count data per species (minimum 5 years)
- [ ] Add range map data (GeoJSON polygons for habitat zones)
- [ ] Add IUCN Red List category per species with last assessment date
- [ ] Add threat driver weighting per species
- [ ] Add intervention history (what has been tried, what worked)

### 3.5 Clinical and Epidemiological Data
- [ ] Build anonymised patient case repository (minimum 20 seed cases covering major exposure scenarios in Lagos)
- [ ] Add syndrome-toxin matching reference table (clinically validated, not Gemini-generated)
- [ ] Add treatment pathway templates per major contaminant class
- [ ] Add rehabilitation milestone benchmarks (expected recovery timeline per exposure type)
- [ ] Add referral network directory (LUTH departments, UNILAG research contacts, NESREA field offices)

---

## SECTION 4 — PRODUCTION BACKEND

### 4.1 API Design and Build
- [ ] Design full REST API specification (OpenAPI 3.1)
- [ ] Build FastAPI application skeleton with async endpoints
- [ ] Implement contaminant CRUD endpoints
- [ ] Implement hazard site CRUD endpoints with PostGIS spatial queries
- [ ] Implement standards search endpoints with full-text indexing
- [ ] Implement species and conservation endpoints
- [ ] Implement patient case endpoints with anonymisation middleware
- [ ] Implement score computation endpoints (triggers Monte Carlo on demand)
- [ ] Implement WebSocket endpoint for live alert feeds (less than 5-minute latency per PRD HP-003)
- [ ] Build API key generation and management system
- [ ] Add rate limiting per API key tier
- [ ] Add request/response logging with audit trail
- [ ] Build batch processing endpoint for bulk contaminant uploads
- [ ] Build async job queue for long-running computations (Monte Carlo, BLAST queries)

### 4.2 Database
- [ ] Set up PostgreSQL with PostGIS extension
- [ ] Design and implement full schema (contaminants, sites, species, standards, cases, users, audit_log)
- [ ] Implement spatial indexes for all coordinate-based queries
- [ ] Build full-text search indexes for contaminant names, standard titles, symptom descriptions
- [ ] Set up Redis for caching (score results, frequent queries) and pub/sub (live alert feeds)
- [ ] Implement database migrations system (Alembic)
- [ ] Build seed data pipeline (import all current mock JSON into real database)
- [ ] Set up automated backup schedule (daily snapshots, 30-day retention)
- [ ] Build blockchain provenance layer for critical hazard records (Hyperledger Fabric per PRD)
- [ ] Implement GDPR-compliant data retention and deletion policies

### 4.3 Authentication and Authorisation
- [ ] Set up Keycloak for institutional SSO
- [ ] Implement role-based access control: Researcher, Environmental Auditor, Conservation Biologist, Clinical Therapist, Policy Maker, Administrator
- [ ] Build role-gated views (clinicians see patient data, auditors see submission forms, policy makers see aggregated analytics)
- [ ] Implement .edu, .gov, .org email verification for auditor submissions per PRD GM-006
- [ ] Add professional certification upload and verification flow
- [ ] Build API key scoping per role (read-only vs read-write vs admin)
- [ ] Implement session management and refresh token rotation
- [ ] Add multi-factor authentication for admin and clinical roles
- [ ] Build account management portal (profile, credentials, API keys, notification preferences)

### 4.4 External Integrations
- [ ] PubChem REST API (live chemical data pull by CAS number)
- [ ] NCBI eUtils API (GenBank sequence retrieval)
- [ ] UniProt API (protein cross-references)
- [ ] NCBI BLAST API (sequence similarity search)
- [ ] WHO air quality monitoring station API feeds
- [ ] NESREA data portal integration
- [ ] OpenStreetMap Nominatim for geocoding (self-hosted in production)
- [ ] Webhook watchers for WHO, EPA, NESREA publication feeds (standards auto-update)
- [ ] Email service integration (SendGrid or AWS SES) for submission acknowledgements and SLA confirmations
- [ ] SMS alert integration (Twilio or Africa's Talking) for emergency Level 3 notifications

---

## SECTION 5 — INFRASTRUCTURE AND DEVOPS

### 5.1 CI/CD Pipeline
- [ ] Set up GitHub Actions workflow for lint and type-check on every PR
- [ ] Add automated build and test step on every push to main
- [ ] Add Playwright end-to-end tests for all 7 modules
- [ ] Add unit tests for all model computation functions (GCS, severity, Bayesian, extinction probability)
- [ ] Set up staging environment auto-deploy on merge to main
- [ ] Set up production deploy on tagged release only
- [ ] Add bundle size check (fail CI if JS bundle exceeds threshold)
- [ ] Add accessibility audit step (axe-core automated checks)
- [ ] Add lighthouse performance score gate

### 5.2 Hosting and Deployment
- [ ] Set up Netlify or Vercel for demo/staging (automatic from repo, already has _redirects file)
- [ ] Plan Kubernetes cluster (GKE or AWS EKS) for production
- [ ] Set up Cloudflare CDN and WAF in front of production
- [ ] Configure DDoS protection
- [ ] Set up auto-scaling policies (scale on CPU and request rate)
- [ ] Configure multi-region deployment for sub-100ms response globally
- [ ] Set up SSL certificates and HSTS
- [ ] Build zero-downtime deployment pipeline (rolling update strategy)

### 5.3 Monitoring and Observability
- [ ] Set up Grafana dashboards (request rate, error rate, latency, score computation time)
- [ ] Set up Prometheus metrics collection
- [ ] Integrate Sentry for error tracking (frontend and backend)
- [ ] Set up OpenTelemetry distributed tracing
- [ ] Configure uptime monitoring with PagerDuty or equivalent alerting
- [ ] Build admin audit log viewer (who did what, when, from where)
- [ ] Set up log aggregation (ELK stack or Grafana Loki)
- [ ] Add real user monitoring (Core Web Vitals tracking in production)

### 5.4 Security
- [ ] Conduct OWASP Top 10 audit against the API
- [ ] Implement SQL injection protection (parameterised queries throughout)
- [ ] Add CORS policy configuration
- [ ] Add Content Security Policy headers
- [ ] Implement input sanitisation on all form fields
- [ ] Add file upload validation (type, size, malware scan for photo evidence uploads)
- [ ] Conduct penetration test before production launch
- [ ] Set up secrets management (AWS Secrets Manager or HashiCorp Vault, no secrets in code)
- [ ] Implement API request signing for webhook integrations
- [ ] Add HIPAA-compliant encryption for patient data at rest and in transit

---

## SECTION 6 — COMPLIANCE AND GOVERNANCE

### 6.1 Data Privacy
- [ ] Draft and publish Privacy Policy
- [ ] Draft and publish Terms of Service
- [ ] Implement GDPR consent management (cookie banner, data processing agreements)
- [ ] Implement HIPAA anonymisation pipeline for all patient-linked data
- [ ] Build data subject access request (DSAR) workflow
- [ ] Build right to deletion workflow
- [ ] Conduct Data Protection Impact Assessment (DPIA)
- [ ] Appoint Data Protection Officer or designate responsible party

### 6.2 Accessibility
- [ ] Full WCAG 2.1 AA audit across all 7 modules
- [ ] Fix any colour contrast failures (monochrome palette is mostly safe but needs formal check)
- [ ] Add skip-to-content link on every page
- [ ] Ensure all interactive elements have visible focus rings
- [ ] Add ARIA labels to all icon-only buttons
- [ ] Test with NVDA and VoiceOver screen readers
- [ ] Add alt text to all non-decorative images
- [ ] Ensure all form fields have programmatically associated labels
- [ ] Test keyboard-only navigation through every workflow
- [ ] Add reduced-motion alternatives for all animations

### 6.3 Internationalisation
- [ ] Add multilingual framework (i18n) to the React app
- [ ] Implement English (complete), French (priority for West Africa), and Yoruba (local relevance)
- [ ] Add Spanish, Arabic, Mandarin, and Hindi as per PRD vision
- [ ] Ensure all date, number, and coordinate formats localise correctly
- [ ] Add right-to-left layout support for Arabic
- [ ] Localise all Gemini prompts per language (not just the UI)

### 6.4 Scientific Peer Review
- [ ] Set up peer review workflow for contaminant submissions (two-reviewer minimum before publication)
- [ ] Build reviewer assignment system (match by expertise area)
- [ ] Build review decision record (accept, reject, revise with comments)
- [ ] Add evidence grading system (strong, moderate, poor) per genome-contaminant association
- [ ] Establish editorial board (minimum 3 domain experts from UNILAG, LUTH, and external)
- [ ] Define data quality standards document
- [ ] Build data provenance display (every record shows who submitted, who reviewed, when)

---

## SECTION 7 — PARTNERSHIPS AND INTEGRATIONS

### 7.1 Regulatory Agency Partnerships (PRD target: 50+)
- [ ] Initiate formal MOU with NESREA (Nigeria)
- [ ] Initiate data sharing agreement with NOSDRA (Nigeria)
- [ ] Engage Lagos State Environmental Protection Agency (LASEPA)
- [ ] Engage US EPA for data indexing permission
- [ ] Engage WHO for standards data licensing
- [ ] Engage UNEP for treaty text indexing
- [ ] Engage ECOWAS Secretariat for regional instrument data
- [ ] Build agency portal login (agencies can push updates directly to the platform)

### 7.2 Academic Partnerships
- [ ] Formalise University of Lagos partnership (UNILAG is already the anchor institution)
- [ ] Formalise Lagos University Teaching Hospital partnership (LUTH clinical data pipeline)
- [ ] Engage UNILAG genomics and environmental science departments for data contribution
- [ ] Engage LUTH occupational medicine for clinical case repository seeding
- [ ] Build institutional submission portal (universities submit validated research data)
- [ ] Set up citation tracking (how many publications cite platform data)

### 7.3 Technology Partnerships
- [ ] Evaluate Mapbox vs MapLibre vs Google Maps for production map (confirmed MapLibre in stack)
- [ ] Evaluate OpenFreeMap vs MapTiler Cloud for production tiles
- [ ] Finalise Gemini vs Claude API decision for production AI layer
- [ ] Evaluate NCBI BLAST API quotas and pricing for production usage
- [ ] Set up PubChem API access credentials
- [ ] Evaluate Africa's Talking vs Twilio for SMS alerting in Nigeria

---

## SECTION 8 — PRODUCT AND UX

### 8.1 User Research and Testing
- [ ] Conduct usability testing with at least one environmental auditor
- [ ] Conduct usability testing with at least one genomic researcher
- [ ] Conduct usability testing with at least one clinical therapist
- [ ] Conduct usability testing with at least one policy maker
- [ ] Conduct usability testing with at least one conservation biologist
- [ ] Document findings and prioritise fixes
- [ ] Run mobile usability test in low-connectivity conditions (2G simulation)

### 8.2 Analytics
- [ ] Integrate privacy-respecting analytics (Plausible or Fathom, not Google Analytics)
- [ ] Track module visit frequency, search queries, AI feature usage rates
- [ ] Track most-searched contaminants, most-viewed hazard sites
- [ ] Set up funnel analysis (how many users who land on registry actually use AI search)
- [ ] Build internal analytics dashboard for platform administrators

### 8.3 Success Metrics (from PRD)
- [ ] Instrument platform to track: total registered contaminants, mapped hazard locations, monthly active searches, genome-contaminant pairs, therapeutic referrals
- [ ] Build metrics dashboard for institutional reporting
- [ ] Define baseline measurements before launch
- [ ] Set up quarterly reporting cadence against PRD year 3 targets

### 8.4 Documentation
- [ ] Write full API documentation (auto-generated from OpenAPI spec)
- [ ] Write user guide per persona (5 guides total)
- [ ] Write data submission guidelines
- [ ] Write peer review process documentation
- [ ] Write administrator handbook
- [ ] Write onboarding guide for new institutional partners
- [ ] Build in-app help centre (searchable, contextual)

---

## SECTION 9 — LAUNCH PREPARATION

### 9.1 Pre-launch
- [ ] Seed database with minimum viable data (50 contaminants, 100 sites, 50 standards)
- [ ] Onboard founding institutional partners (UNILAG, LUTH minimum)
- [ ] Complete security penetration test
- [ ] Complete accessibility audit
- [ ] Complete performance audit (Lighthouse score above 90)
- [ ] Complete legal review (privacy policy, terms of service, data sharing agreements)
- [ ] Set up support ticket system
- [ ] Set up emergency hazard reporting hotline (PRD CP-006)
- [ ] Train initial editorial board on peer review workflow
- [ ] Brief NESREA and LASEPA on the platform

### 9.2 Launch
- [ ] Soft launch to invited researchers and auditors only
- [ ] Monitor error rates and performance for 2 weeks
- [ ] Gather structured feedback from initial users
- [ ] Address critical issues before public launch
- [ ] Public launch announcement
- [ ] Submit platform to relevant scientific journal as a data resource paper
- [ ] Submit to NCBI for cross-linking consideration

### 9.3 Post-launch
- [ ] Set up monthly platform health review
- [ ] Set up quarterly data quality audit
- [ ] Set up annual PRD targets review
- [ ] Plan version 2.0 feature roadmap based on user feedback
- [ ] Pursue funding for production infrastructure (grants, institutional support, government contracts)

---

## SUMMARY COUNTS

| Section | Total activities |
|---------|-----------------|
| 1. Demo completion | 89 |
| 2. Model and computation | 31 |
| 3. Data layer | 43 |
| 4. Production backend | 44 |
| 5. Infrastructure and DevOps | 34 |
| 6. Compliance and governance | 36 |
| 7. Partnerships and integrations | 24 |
| 8. Product and UX | 24 |
| 9. Launch preparation | 19 |
| **Total** | **344** |

---

## IMMEDIATE NEXT ACTIONS (this week)

1. Receive and implement the scoring formulas from the domain expert
2. Build the hazard site submission form (highest demo impact)
3. Fix the Cmd+K registry deep link
4. Build the Contact page
5. Build the 404 page
6. Deploy demo to Netlify from the EnvironGenome repo
7. Begin expanding contaminant data from 12 to 50 entries

---

*EnviroGenome Guardian, remaining activities register. Generated July 2026.*
