import { Link } from "react-router-dom";
import { MODULES } from "../data/modules";
import { sites, standards, districts, SEV_LABEL } from "../data/platform";
import { contaminants } from "../data/contaminants";
import Term from "../components/Term";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import "./landing.css";

// Every photo is a real, licensed image from Wikimedia Commons. Credits and
// the data source live behind the References toggle in the footer, not beside
// the images. Keep that list complete if a photo changes (CC BY-SA).
const IMG = "/images/landing/";
const PHOTOS = {
  hero:     { src: "lagos-lagoon-dusk.webp",  w: 2400, h: 1368, author: "Obii Okongwu", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Lagos_Lagoon_-_Brothers_at_Dusk.jpg",
              alt: "Two fishermen in a canoe casting a net on the Lagos Lagoon at dusk", caption: "Fishermen on the Lagos Lagoon at dusk" },
  site:     { src: "ebute-metta-shore.webp",  w: 1600, h: 1200, author: "NestedBeing", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Ebute_Metta_coast_of_the_Lagos_Lagoon.jpg",
              alt: "The Ebute Metta waterfront of the Lagos Lagoon, with timber yards and shacks on reclaimed ground and the Third Mainland Bridge behind", caption: "The Ebute Metta shore of the Lagos Lagoon" },
  sample:   { src: "field-sampling.webp",     w: 1200, h: 798,  author: "US Environmental Protection Agency", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Scientists_collecting_water_samples_for_analysis._(15012086289).jpg",
              alt: "Two scientists in life jackets taking a water sample from a small boat", caption: "Water sampling from a survey boat" },
  lab:      { src: "lab-soil-pipette.webp",   w: 1200, h: 960,  author: "National Institute of Standards and Technology", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Laboratory_Technician_Pipettes_Dirt_(10714910404).jpg",
              alt: "A gloved hand pipetting a soil extract into a sample tube", caption: "Preparing a soil extract for analysis" },
  gel:      { src: "dna-gel.webp",            w: 1200, h: 900,  author: "Mnolf", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Gel_electrophoresis_2.jpg",
              alt: "DNA bands glowing pink in an agarose gel under ultraviolet light", caption: "DNA fragments separated in an agarose gel" },
  makoko:   { src: "makoko.webp",             w: 1920, h: 1280, author: "Ayorinde Ogundele", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Makoko_5.jpg",
              alt: "A woman paddling a canoe between wooden houses built on stilts over the water in Makoko", caption: "Makoko, a fishing community built over the lagoon" },
  mangrove: { src: "mangrove-clearance.webp", w: 1400, h: 1050, author: "Chinemerem Ibekwe", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Deforested_Red_mangrove_area_Port_Harcourt.jpg",
              alt: "A man standing on mudflats where red mangrove has been cut down, with stumps and debris around him", caption: "Cleared red mangrove near Port Harcourt" },
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

// Pull "label 1.23 unit" readings out of the cited site description so the
// numbers on this page always match the data file.
function readings(text) {
  return [...text.matchAll(/([A-Za-z][A-Za-z ]*?)\s+([\d.]+)\s*(mg\/L|ppm|µg\/m³)/g)]
    .map(([, label, value, unit]) => ({ label: label.trim(), value, unit }));
}

const Mark = () => (
  <svg className="lp-mark" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
    <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
  </svg>
);

export default function Landing() {
  const site = sites.find(s => /ebute/i.test(s.name)) || sites[0];
  const vals = site ? readings(site.sub) : [];
  const source = site ? site.sub.split(";")[0] : "";

  return (
    <div className="lp">
      <header className="lp-hero">
        <Photo p={PHOTOS.hero} className="lp-hero-img" eager />
        <div className="lp-hero-tint" aria-hidden="true" />
        <div className="lp-hero-shade" aria-hidden="true" />

        <nav className="lp-nav" aria-label="Site">
          <Link to="/" className="lp-brand"><Mark /><span>Enviro<em>Genome</em></span></Link>
          <div className="lp-nav-links">
            <Link to="/app/registry">Registry</Link>
            <Link to="/app/map">Hazard map</Link>
            <Link to="/app/standards">Standards</Link>
          </div>
          <Button asChild size="sm" className="lp-nav-cta h-10 px-4 shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app">Enter platform</Link></Button>
        </nav>

        <div className="lp-hero-body">
          <h1>Pollution in Lagos, traced from the water to the <em>genome</em>.</h1>
          <p className="lp-lede">
            EnviroGenome Guardian brings together cited <Term name="Contaminant">contaminant</Term> data,
            hazard sites on the Lagos map and, where the literature supports it, the <Term name="Mutation">mutations</Term> a
            chemical leaves in a living <Term name="Genome">genome</Term>. Built for researchers, auditors,
            clinicians and the people who write the rules.
          </p>
          <div className="lp-actions">
            <Button asChild size="lg" className="h-12 px-6 text-[14.5px] shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app">Enter platform</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-army-tint/55 bg-transparent px-6 text-[14.5px] shadow-none hover:bg-white/10"><Link to="/app/map">See the hazard map</Link></Button>
          </div>
        </div>

        <div className="lp-hero-foot">
          <dl className="lp-counts">
            <div><dt>Contaminants</dt><dd>{contaminants.length}</dd></div>
            <div><dt>Cited hazard sites</dt><dd>{sites.length}</dd></div>
            <div><dt>Instruments</dt><dd>{standards.length}</dd></div>
            <div><dt>Districts scored</dt><dd>{districts.length}</dd></div>
          </dl>
        </div>
      </header>

      <main>
        {site && (
          <section className="lp-record" aria-labelledby="record-h">
            <figure className="lp-record-fig">
              <Photo p={PHOTOS.site} className="lp-cover" />
            </figure>
            <div className="lp-record-body">
              <p className="lp-label">Field record {String(site.id + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {site.date}</p>
              <h2 id="record-h">{site.name}</h2>
              <p className="lp-record-src">{source}, measured at the activity point.</p>
              {vals.length > 0 && (
                <dl className="lp-readings">
                  {vals.map(v => (
                    <div key={v.label}><dt>{v.label}</dt><dd>{v.value}<span>{v.unit}</span></dd></div>
                  ))}
                </dl>
              )}
              <div className={"sev s" + site.sev} style={{ whiteSpace: "normal" }}>
                <span className="sq" /><Term name={"Level " + site.sev}>Level {site.sev}, {SEV_LABEL[site.sev]}</Term>
              </div>
              <Link to={"/app/map?site=" + site.id} className="lp-more">Open this site on the hazard map</Link>
            </div>
          </section>
        )}

        <section className="lp-method" aria-labelledby="method-h">
          <div className="lp-head">
            <p className="lp-label">Method</p>
            <h2 id="method-h">From a water sample to a finding in the genome.</h2>
          </div>
          <ol className="lp-steps">
            <li>
              <figure><Photo p={PHOTOS.sample} className="lp-cover" /></figure>
              <span className="lp-step-n">01</span>
              <h3>Record the site</h3>
              <p>Field teams log a hazard site with its coordinates, substance and a severity rating from 0 to 3, then submit it for review.</p>
              <Link to="/app/map" className="lp-more">Hazard map</Link>
            </li>
            <li>
              <figure><Photo p={PHOTOS.lab} className="lp-cover" /></figure>
              <span className="lp-step-n">02</span>
              <h3>Profile the chemical</h3>
              <p>Each registry entry carries its <Term name="CAS">CAS</Term> number, formula and the health effect reported by a cited source.</p>
              <Link to="/app/registry" className="lp-more">Contaminant registry</Link>
            </li>
            <li>
              <figure><Photo p={PHOTOS.gel} className="lp-cover" /></figure>
              <span className="lp-step-n">03</span>
              <h3>Look for genetic damage</h3>
              <p>Where a study links a compound to DNA damage, the entry is flagged <Term name="Genotoxic">genotoxic</Term> and the affected gene and organism are recorded.</p>
              <Link to="/app/registry" className="lp-more">Genotoxic entries</Link>
            </li>
          </ol>
        </section>

        <section className="lp-band" aria-labelledby="band-h">
          <Photo p={PHOTOS.makoko} className="lp-band-img" />
          <div className="lp-band-tint" aria-hidden="true" />
          <div className="lp-band-body">
            <p className="lp-label">Exposure</p>
            <h2 id="band-h">The lagoon is also a home, a workplace and a food source.</h2>
            <p>
              Makoko and the waterfront communities around it live, fish and build on the same water the hazard
              map tracks. The therapeutic module matches a patient's symptoms to probable environmental causes and
              lists registered hazard sites within 10 km of where they live.
            </p>
            <Button asChild size="lg" variant="outline" className="h-12 border-army-tint/55 bg-transparent px-6 text-[14.5px] shadow-none hover:bg-white/10"><Link to="/app/therapeutic">Therapeutic module</Link></Button>
          </div>
        </section>

        <section className="lp-split" aria-labelledby="mangrove-h">
          <div className="lp-split-body">
            <p className="lp-label">Conservation</p>
            <h2 id="mangrove-h">Mangrove loss is a hazard too.</h2>
            <p>
              Red mangrove fringes the lagoon and its creeks, holding sediment and sheltering fish nurseries. The
              conservation module tracks at-risk species around Lagos, the interventions filed to protect them, and
              drafts mitigation briefs for review.
            </p>
            <Link to="/app/conservation" className="lp-more">Conservation intelligence</Link>
          </div>
          <figure className="lp-split-fig">
            <Photo p={PHOTOS.mangrove} className="lp-cover" />
          </figure>
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
          <h2 id="cta-h">Start with a chemical, or start with a place.</h2>
          <div className="lp-actions">
            <Button asChild size="lg" className="h-12 px-6 text-[14.5px] shadow-[inset_0_0_0_1px_rgba(232,236,218,.28)] hover:bg-army-hover"><Link to="/app/registry">Search the registry</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-army-tint/55 bg-transparent px-6 text-[14.5px] shadow-none hover:bg-white/10"><Link to="/app/map">Open the hazard map</Link></Button>
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
            {site && (
              <>
                <p className="lp-label">Data</p>
                <ul><li>{site.name}: {site.source}.</li></ul>
              </>
            )}
            <p className="lp-label">Photography</p>
            <ul>
              {Object.values(PHOTOS).map(p => <li key={p.src}><Credit p={p} /></li>)}
            </ul>
            <p className="lp-foot-note">Photographs via Wikimedia Commons, resized for the web. The sampling, laboratory and gel photographs illustrate the method and were not taken in Lagos.</p>
          </CollapsibleContent>
        </Collapsible>
      </footer>
    </div>
  );
}
