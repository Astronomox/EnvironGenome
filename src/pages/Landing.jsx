import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { MODULES } from "../data/modules";
import { sites, standards, districts, species, symptoms } from "../data/platform";
import { contaminants } from "../data/contaminants";
import { computeGCS, computeAllGCS } from "../utils/gcs";
import Term from "../components/Term";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import "./landing.css";

// The landing page covers the whole platform: air, water, soil and land,
// habitats and species, human health, the genome and the law. Every number
// on it is read from the data files. Photos are licensed Wikimedia Commons
// images; their credits live behind the References toggle in the footer
// (keep that list complete if a photo changes, CC BY-SA requires it).
const IMG = "/images/landing/";
const SA4 = "https://creativecommons.org/licenses/by-sa/4.0";
const PHOTOS = {
  air:     { src: "air-gas-flare.webp", w: 1200, h: 1202, author: "Sara Leigh Lewis", license: "CC BY-SA 4.0", licenseUrl: SA4,
             page: "https://commons.wikimedia.org/wiki/File:Burning_Gas_Flare_Nembe_Creek,_Nigeria.tif",
             alt: "Black smoke rising from a gas flare over Nembe Creek", caption: "Gas flare at Nembe Creek, Bayelsa" },
  water:   { src: "lagos-lagoon-dusk.webp", w: 2400, h: 1368, author: "Obii Okongwu", license: "CC BY-SA 4.0", licenseUrl: SA4,
             page: "https://commons.wikimedia.org/wiki/File:Lagos_Lagoon_-_Brothers_at_Dusk.jpg",
             alt: "Two fishermen casting a net from a canoe on the Lagos Lagoon", caption: "Fishermen on the Lagos Lagoon" },
  land:    { src: "land-gully-erosion.webp", w: 1200, h: 1600, author: "Abdulazeez Taufeeq", license: "CC BY-SA 4.0", licenseUrl: SA4,
             page: "https://commons.wikimedia.org/wiki/File:Gully_erosion_in_Gombe_01.jpg",
             alt: "A deep erosion gully cutting through bare red soil beside houses", caption: "Gully erosion in Gombe" },
  habitat: { src: "habitat-forest-canopy.webp", w: 1200, h: 899, author: "Juganutt", license: "CC BY-SA 4.0", licenseUrl: SA4,
             page: "https://commons.wikimedia.org/wiki/File:Forest_Canopy_walkway.jpg",
             alt: "Aerial view of dense forest canopy meeting the edge of a city", caption: "Forest canopy at the Lekki Conservation Centre" },
  people:  { src: "people-clinic.webp", w: 1024, h: 768, author: "Susan Elden, DFID Nigeria", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
             page: "https://commons.wikimedia.org/wiki/File:Mother_and_child,_ante-natal_care_clinic,_Jigawa,_Nigeria,_December_2011_(8379199175).jpg",
             alt: "A mother and child at the door of an antenatal clinic", caption: "Antenatal care clinic in Jigawa" },
  genome:  { src: "dna-gel.webp", w: 1200, h: 900, author: "Mnolf", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
             page: "https://commons.wikimedia.org/wiki/File:Gel_electrophoresis_2.jpg",
             alt: "DNA bands glowing in an agarose gel under ultraviolet light", caption: "DNA fragments separated in an agarose gel" },
  field:   { src: "field-contamination-study.webp", w: 1600, h: 1200, author: "Moancho", license: "CC BY-SA 4.0", licenseUrl: SA4,
             page: "https://commons.wikimedia.org/wiki/File:Contamination_Studies_1,_Keffi,_Nigeria.jpg",
             alt: "A field scientist setting up survey equipment on a waste dump", caption: "Contamination study on a waste site in Keffi" },
};

function Credit({ p }) {
  return (
    <>
      {p.caption}. Photo: <a href={p.page} target="_blank" rel="noreferrer">{p.author}</a>, {p.licenseUrl
        ? <a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a>
        : p.license}.
    </>
  );
}

function Photo({ p, className, eager }) {
  return (
    <img className={className} src={IMG + p.src} width={p.w} height={p.h} alt={p.alt}
      loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "auto"} />
  );
}

const Mark = () => (
  <svg className="lp-mark" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
    <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
  </svg>
);

const pct = (w) => Math.round(w * 100);

export default function Landing() {
  const weights = districts.length ? computeGCS(districts[0][0]).breakdown : [];
  const w = Object.fromEntries(weights.map(b => [b.label, b.weight]));
  const ranked = [...computeAllGCS(districts)].sort((a, b) => b[1] - a[1]);
  const best = ranked[0], worst = ranked[ranked.length - 1];
  const tiers = standards.reduce((acc, s) => ({ ...acc, [s.tier]: (acc[s.tier] || 0) + 1 }), {});

  const tiles = [
    { label: "Air", p: PHOTOS.air, to: "/app/scores" },
    { label: "Water", p: PHOTOS.water, to: "/app/map" },
    { label: "Soil and land", p: PHOTOS.land, to: "/app/scores" },
    { label: "Habitats", p: PHOTOS.habitat, to: "/app/conservation" },
    { label: "People", p: PHOTOS.people, to: "/app/therapeutic" },
    { label: "Genome", p: PHOTOS.genome, to: "/app/registry" },
  ];

  const domains = [
    { n: "Air", to: "/app/scores", link: "Habitability scores",
      body: <>Air quality carries {pct(w["Air quality index"] || 0)}% of every district's habitability score, drawn from cited AQI and particulate studies.</> },
    { n: "Water", to: "/app/map", link: "Hazard map",
      body: <>Water purity carries another {pct(w["Water purity"] || 0)}%. Mapped hazard sites record dissolved oxygen, COD and heavy metals where they were measured.</> },
    { n: "Soil and land", to: "/app/scores", link: "Habitability scores",
      body: <>Toxic elements in urban soil, waste sites and terrain stability feed the toxic-exposure and terrain parts of the score.</> },
    { n: "Habitats and species", to: "/app/conservation", link: "Conservation intelligence",
      body: <>{species.length} at-risk species tracked across wetland, coastal and marine habitats, with the threats they face and the interventions filed to protect them.</> },
    { n: "People and health", to: "/app/therapeutic", link: "Therapeutic module",
      body: <>Anonymised intake matches {symptoms.length} presenting symptoms to probable environmental causes, then lists registered hazard sites near the patient.</> },
    { n: "Genome", to: "/app/registry", link: "Contaminant registry",
      body: <>Each <Term name="Contaminant">contaminant</Term> carries its formula, its cited health effect and, where a study supports it, a <Term name="Genotoxic">genotoxic</Term> flag with the gene and organism affected.</> },
    { n: "Law and standards", to: "/app/standards", link: "Standards library",
      body: <>{standards.length} instruments, from {tiers.Global || 0} global treaties and guidelines to {tiers.Nigeria || 0} Nigerian and Lagos State laws, compared side by side.</> },
  ];

  const chain = [
    ["Record it", "An auditor pins the hazard on the map with its substance, photos and a severity rating.", "/app/map"],
    ["Profile it", "The registry holds the chemical's identity, formula and cited health effects.", "/app/registry"],
    ["Trace the damage", "Where the evidence exists, the entry links the chemical to genetic damage.", "/app/registry"],
    ["Score the place", "Air, water, soil and nature combine into a habitability grade for the district.", "/app/scores"],
    ["Protect what lives there", "Species at risk and the interventions protecting them are tracked in one place.", "/app/conservation"],
    ["Treat the people exposed", "Clinicians match symptoms to probable causes and draft referral letters.", "/app/therapeutic"],
    ["Hold it to the law", "The relevant treaties and Nigerian laws are compared for compliance gaps.", "/app/standards"],
  ];

  const personas = [
    ["Genomic researchers", "Query contaminants, read genome damage data and export it for analysis."],
    ["Environmental auditors", "Pin hazard sites, rate their severity and draft audit reports."],
    ["Conservation biologists", "Track at-risk species, flag new threats and draft mitigation briefs."],
    ["Clinical therapists", "Link a patient's symptoms to environmental causes and refer them on."],
    ["Policy makers", "Compare regulations, find compliance gaps and export evidence for testimony."],
  ];

  return (
    <div className="lp">
      <header className="lp-hero">
        <nav className="lp-nav" aria-label="Site">
          <Link to="/" className="lp-brand"><Mark /><span>Enviro<em>Genome</em></span></Link>
          <div className="lp-nav-links">
            <Link to="/app/registry">Registry</Link>
            <Link to="/app/map">Hazard map</Link>
            <Link to="/app/conservation">Conservation</Link>
            <Link to="/app/standards">Standards</Link>
          </div>
          <Button asChild size="sm" className="lp-nav-cta h-10 px-4 shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app">Enter platform</Link></Button>
        </nav>

        <div className="lp-hero-grid">
          <div className="lp-hero-body">
            <h1>Environmental hazards, traced from the air, water and soil to the <em>genome</em>.</h1>
            <p className="lp-lede">
              EnviroGenome Guardian keeps hazard sites, habitats and species, human health and environmental law in
              one record, and links a chemical to the <Term name="Mutation">mutations</Term> it leaves in a
              living <Term name="Genome">genome</Term> where the literature supports it. Built for researchers,
              auditors, conservationists, clinicians and the people who write the rules.
            </p>
            <div className="lp-actions">
              <Button asChild size="lg" className="h-12 px-6 text-[14.5px] shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app">Enter platform</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-army-tint/55 bg-transparent px-6 text-[14.5px] shadow-none hover:bg-white/10"><Link to="/app/map">See the hazard map</Link></Button>
            </div>
          </div>

          <ul className="lp-mosaic" aria-label="What the platform covers">
            {tiles.map((t, i) => (
              <li key={t.label}>
                <Link to={t.to} className="lp-tile">
                  <Photo p={t.p} className="lp-tile-img" eager={i < 3} />
                  <span className="lp-tile-label">{t.label}<ArrowUpRight aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <dl className="lp-counts">
          <div><dt>Contaminants</dt><dd>{contaminants.length}</dd></div>
          <div><dt>Hazard sites</dt><dd>{sites.length}</dd></div>
          <div><dt>Species tracked</dt><dd>{species.length}</dd></div>
          <div><dt>Instruments</dt><dd>{standards.length}</dd></div>
          <div><dt>Districts scored</dt><dd>{districts.length}</dd></div>
        </dl>
      </header>

      <main>
        <section className="lp-domains" aria-labelledby="domains-h">
          <div className="lp-head">
            <p className="lp-label">Scope</p>
            <h2 id="domains-h">Seven domains in one platform.</h2>
            <p className="lp-head-sub">Most environmental systems watch one thing. EnviroGenome follows a hazard across all of them.</p>
          </div>
          <ol className="lp-domain-grid">
            {domains.map((d, i) => (
              <li key={d.n}>
                <span className="lp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.n}</h3>
                <p>{d.body}</p>
                <Link to={d.to} className="lp-more">{d.link}</Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-chain" aria-labelledby="chain-h">
          <div className="lp-head">
            <p className="lp-label">How it connects</p>
            <h2 id="chain-h">One hazard, followed through every module.</h2>
          </div>
          <ol className="lp-chain-list">
            {chain.map(([t, d, to], i) => (
              <li key={t}>
                <Link to={to}>
                  <span className="lp-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-field" aria-labelledby="field-h">
          <figure className="lp-field-fig"><Photo p={PHOTOS.field} className="lp-cover" /></figure>
          <div className="lp-field-body">
            <p className="lp-label">Field evidence</p>
            <h2 id="field-h">Evidence starts on the ground.</h2>
            <p>
              Auditors pin a hazard anywhere on the map, name the substance, attach photo evidence and rate it from
              0 to 3. Every submission waits for review before it counts, and the full set exports as GeoJSON for
              other mapping tools.
            </p>
            <Link to="/app/map" className="lp-more">Flag a hazard site</Link>
          </div>
        </section>

        {weights.length > 0 && (
          <section className="lp-score" aria-labelledby="score-h">
            <div className="lp-score-in">
              <div>
                <p className="lp-label">Habitability</p>
                <h2 id="score-h">What makes a place safe to live in.</h2>
                <p className="lp-score-sub">
                  Every district gets one grade built from five parts. Today the {districts.length} Lagos districts run
                  from {best[0]} at {best[1]} down to {worst[0]} at {worst[1]}, as model estimates from cited studies.
                </p>
                <Link to="/app/scores" className="lp-more">See all district grades</Link>
              </div>
              <div className="lp-weights" role="img" aria-label={weights.map(b => `${b.label} ${pct(b.weight)} percent`).join(", ")}>
                <div className="lp-weights-bar">
                  {weights.map((b, i) => <span key={b.label} className={"lp-w" + i} style={{ flexGrow: b.weight }} />)}
                </div>
                <ul>
                  {weights.map((b, i) => (
                    <li key={b.label}><i className={"lp-w" + i} /><span>{b.label.replace("Toxic-exposure inverse", "Low toxic exposure")}</span><b>{pct(b.weight)}%</b></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="lp-people" aria-labelledby="people-h">
          <div className="lp-head">
            <p className="lp-label">Who it is for</p>
            <h2 id="people-h">Five professions, one shared record.</h2>
          </div>
          <ul className="lp-people-grid">
            {personas.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
        </section>

        <section className="lp-reach" aria-labelledby="reach-h">
          <div className="lp-head">
            <p className="lp-label">Reach</p>
            <h2 id="reach-h">Lagos first. Built for anywhere.</h2>
          </div>
          <div className="lp-reach-grid">
            <div>
              <h3>Today</h3>
              <p>Lagos is the first region loaded: {districts.length} districts scored, cited hazard sites on the map, and the wetland, coastal and marine species around the city.</p>
            </div>
            <div>
              <h3>Already wider</h3>
              <p>The standards library already runs from global treaties to Nigerian state law, and the research behind the platform spans Nigeria and beyond.</p>
            </div>
          </div>
        </section>

        <section className="lp-index" aria-labelledby="index-h">
          <div className="lp-head">
            <p className="lp-label">The platform</p>
            <h2 id="index-h">{MODULES.length} modules, one record of each hazard.</h2>
          </div>
          <ol className="lp-modules">
            {MODULES.map((m, i) => (
              <li key={m.id}>
                <Link to={m.path}>
                  <span className="lp-mod-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lp-mod-t">{m.title}</span>
                  <span className="lp-mod-d">{m.desc}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-cta" aria-labelledby="cta-h">
          <h2 id="cta-h">Start with a chemical, a place, a species or a patient.</h2>
          <div className="lp-actions">
            <Button asChild size="lg" className="h-12 px-6 text-[14.5px] shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app">Enter platform</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-army-tint/55 bg-transparent px-6 text-[14.5px] shadow-none hover:bg-white/10"><Link to="/app/registry">Search the registry</Link></Button>
          </div>
        </section>
      </main>

      <footer className="lp-foot">
        <div className="lp-foot-top">
          <Link to="/" className="lp-brand"><Mark /><span>Enviro<em>Genome</em></span></Link>
          <p>EnviroGenome, demo build v4.1.32. A project still in progress. Built by Astronomox.</p>
        </div>
        <Collapsible className="lp-refs">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="group -ml-2 font-mono text-xs uppercase tracking-[.14em] hover:bg-white/10">
              References <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="lp-refs-body">
            <p className="lp-label">Photography</p>
            <ul>
              {Object.values(PHOTOS).map(p => <li key={p.src}><Credit p={p} /></li>)}
            </ul>
            <p className="lp-foot-note">Photographs via Wikimedia Commons, resized for the web. The gel photograph is illustrative. Data sources for every module are listed under References inside the platform.</p>
          </CollapsibleContent>
        </Collapsible>
      </footer>
    </div>
  );
}
