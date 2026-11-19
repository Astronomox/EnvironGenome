import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { MODULES } from "../data/modules";
import { sites, districts } from "../data/platform";
import { contaminants } from "../data/contaminants";
import { computeGCS, computeAllGCS } from "../utils/gcs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import "./landing.css";

// The landing page tells one story: contaminated sites, the agents found
// there, the DNA damage those agents cause, and the resulting district risk.
// Every number is read from the data files. No photographs.
const Mark = () => (
  <svg className="lp-mark" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
    <circle cx="13" cy="13" r="1.5" fill="#A63D2F" stroke="none" />
  </svg>
);

const pct = (w) => Math.round(w * 100);

export default function Landing() {
  const weights = districts.length ? computeGCS(districts[0][0]).breakdown : [];
  const w = Object.fromEntries(weights.map(b => [b.label, b.weight]));
  const ranked = [...computeAllGCS(districts)].sort((a, b) => b[1] - a[1]);
  const best = ranked[0], worst = ranked[ranked.length - 1];

  const genotoxic = contaminants.filter(c => c.genotoxic);
  const group1 = contaminants.filter(c => /^Group 1\b/.test(c.iarc));
  const signatures = contaminants.filter(c => c.mutations.length);
  const core = MODULES.filter(m => m.group === "core" && m.id !== "home");
  const support = MODULES.filter(m => m.group === "support" && m.id !== "contact");

  const steps = [
    ["Locate the exposure", "Contaminated sites across Lagos are mapped with the agents measured there and a severity rating.", "/app/map"],
    ["Identify the agent", "Each pollutant carries its IARC classification, main sources and how it reaches people.", "/app/registry"],
    ["Trace the DNA damage", "Where a primary study supports it, the agent is linked to the gene and mutation it leaves behind.", "/app/registry"],
    ["Grade the risk", "Air, water, soil and toxic exposure combine into a risk grade for every district.", "/app/scores"],
  ];

  const audiences = [
    ["Researchers", "A cited starting point for exposure and mutation studies in Nigerian populations."],
    ["Regulators", "Evidence on which agents, sites and districts need monitoring first."],
    ["Public health teams", "Link presenting symptoms to likely exposures and the sites behind them."],
  ];

  return (
    <div className="lp">
      <header className="lp-hero">
        <nav className="lp-nav" aria-label="Site">
          <Link to="/" className="lp-brand"><Mark /><span>Enviro<em>Genome</em></span></Link>
          <div className="lp-nav-links">
            {core.map(m => <Link key={m.id} to={m.path}>{m.label}</Link>)}
          </div>
          <Button asChild size="sm" className="lp-btn-light h-10 px-4"><Link to="/app">Open platform</Link></Button>
        </nav>

        <div className="lp-hero-grid">
          <div className="lp-hero-body">
            <p className="lp-kicker">Pollution and genetic risk, Nigeria</p>
            <h1>Pollution leaves a mark on the genome. We map where it happens.</h1>
            <p className="lp-lede">
              EnviroGenome Guardian links contaminated sites in Lagos to the pollutants found there and the DNA damage
              those pollutants are known to cause, then grades the risk for every district.
            </p>
            <div className="lp-actions">
              <Button asChild size="lg" className="lp-btn-light h-12 px-6 text-[14.5px]"><Link to="/app">Open platform</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/30 bg-transparent px-6 text-[14.5px] text-white shadow-none hover:bg-white/10 hover:text-white"><Link to="/app/map">View hazard sites</Link></Button>
            </div>
          </div>
        </div>

        <dl className="lp-counts">
          <div><dt>Genotoxic agents</dt><dd>{genotoxic.length}</dd></div>
          <div><dt>Group 1 carcinogens</dt><dd>{group1.length}</dd></div>
          <div><dt>Hazard sites</dt><dd>{sites.length}</dd></div>
          <div><dt>Districts graded</dt><dd>{districts.length}</dd></div>
        </dl>
      </header>

      <main>
        <section className="lp-domains" aria-labelledby="problem-h">
          <div className="lp-head">
            <p className="lp-label">The gap</p>
            <h2 id="problem-h">Exposure data and genetic evidence sit in different places.</h2>
            <p className="lp-head-sub">
              Site surveys record what is in the water and soil. Toxicology records what those agents do to DNA.
              Health teams see the outcome. Nobody holds the chain in one place, so risk goes unranked.
            </p>
          </div>
        </section>

        <section className="lp-chain" aria-labelledby="chain-h">
          <div className="lp-head">
            <p className="lp-label">How it works</p>
            <h2 id="chain-h">From a contaminated site to a genetic risk grade.</h2>
          </div>
          <ol className="lp-chain-list lp-chain-4">
            {steps.map(([t, d, to], i) => (
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

        {signatures.length > 0 && (
          <section className="lp-sig" aria-labelledby="sig-h">
            <div className="lp-head">
              <p className="lp-label">The evidence</p>
              <h2 id="sig-h">Some pollutants leave a recognisable fingerprint in DNA.</h2>
              <p className="lp-head-sub">Both of these agents are present in the Nigerian environment, through oil and gas activity and poorly stored grain.</p>
            </div>
            <ul className="lp-sig-grid">
              {signatures.map(c => (
                <li key={c.cas}>
                  <p className="lp-sig-agent">{c.name}</p>
                  <p className="lp-sig-gene">{c.mutations[0][1]}</p>
                  <p className="lp-sig-pat">{c.mutations[0][2].replace(/ \(.*\)$/, "")}</p>
                  <p className="lp-sig-src">{(c.mutations[0][2].match(/\(([^)]*)\)$/) || [, ""])[1]}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {weights.length > 0 && (
          <section className="lp-score" aria-labelledby="score-h">
            <div className="lp-score-in">
              <div>
                <p className="lp-label">District risk</p>
                <h2 id="score-h">One grade for every district.</h2>
                <p className="lp-score-sub">
                  Five weighted parts make each grade. The {districts.length} Lagos districts run
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
            <p className="lp-label">Who it serves</p>
            <h2 id="people-h">Built for the people who act on risk.</h2>
          </div>
          <ul className="lp-people-grid lp-people-3">
            {audiences.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
        </section>

        <section className="lp-index" aria-labelledby="index-h">
          <div className="lp-head">
            <p className="lp-label">Supporting tools</p>
            <h2 id="index-h">Following the risk further.</h2>
          </div>
          <ol className="lp-modules">
            {support.map((m, i) => (
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
          <h2 id="cta-h">Start with a site, a pollutant or a district.</h2>
          <div className="lp-actions">
            <Button asChild size="lg" className="lp-btn-light h-12 px-6 text-[14.5px]"><Link to="/app">Open platform</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/30 bg-transparent px-6 text-[14.5px] text-white shadow-none hover:bg-white/10 hover:text-white"><Link to="/app/registry">Browse genotoxic agents</Link></Button>
          </div>
        </section>
      </main>

      <footer className="lp-foot">
        <div className="lp-foot-top">
          <Link to="/" className="lp-brand"><Mark /><span>Enviro<em>Genome</em></span></Link>
          <p>EnviroGenome Guardian. Demonstration platform built by Astronomox.</p>
        </div>
        <Collapsible className="lp-refs">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="group -ml-2 font-mono text-xs uppercase tracking-[.14em] hover:bg-white/10">
              References <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="lp-refs-body">
            <p className="lp-foot-note">Data sources for every module are listed under References inside the platform.</p>
          </CollapsibleContent>
        </Collapsible>
      </footer>
    </div>
  );
}
