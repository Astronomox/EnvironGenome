import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui";
import { feed, sites, SEV_COLOR, SEV_LABEL } from "../data/platform";

const Kpi = ({ lab, val, sub }) => (
  <div className="kpi"><div className="lab">{lab}</div><div className="val">{val}</div><div className="sub"><b>{sub}</b></div></div>
);

export default function Home() {
  const nav = useNavigate();
  const counts = [0, 1, 2, 3].map(s => sites.filter(x => x.sev === s).length);
  const total = sites.length;
  const pending = sites.filter(s => s.status === "Pending verification");

  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Home portal"
        sub="A real-time read on everything moving through the platform today.">
        <button className="btn btn-ghost" onClick={() => nav("/app/map")}>Open map</button>
        <button className="btn btn-dark" onClick={() => nav("/app/registry")}>Search registry</button>
      </PageHeader>

      <div className="grid g4">
        <Kpi lab="Contaminants" val="42,150" sub="+128 this week" />
        <Kpi lab="Hazard sites" val="89,733" sub="+43 pending review" />
        <Kpi lab="Genome pairings" val="6,847" sub="+12 validated" />
        <Kpi lab="Active alerts" val="7" sub="3 at Level 3" />
      </div>

      <div className="grid g3" style={{ marginTop: 14, alignItems: "start" }}>
        <div className="card card-pad" style={{ gridColumn: "span 2" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Recent activity</div>
          <div>
            {feed.map(([t, x], i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: i < feed.length - 1 ? "1px solid var(--hair)" : "none", alignItems: "baseline" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--graphite)", minWidth: 48 }}>{t}</span>
                <span style={{ fontSize: 13.5 }} dangerouslySetInnerHTML={{ __html: x }} />
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Sites by severity</div>
          {counts.map((c, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                <span className="row" style={{ gap: 7 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: SEV_COLOR[i] }} />
                  L{i} {SEV_LABEL[i]}
                </span>
                <span className="mono" style={{ color: "var(--graphite)" }}>{c}</span>
              </div>
              <div className={"meter" + (i === 3 ? " r" : "")}><i style={{ width: (c / total * 100) + "%" }} /></div>
            </div>
          ))}
          <div className="mono" style={{ fontSize: 11, color: "var(--graphite)", marginTop: 14 }}>
            {pending.length} sites pending verification
          </div>
        </div>
      </div>

      <div className="sect-t">Featured research</div>
      <div className="card card-pad">
        <div className="serif" style={{ fontSize: 21, lineHeight: 1.25, letterSpacing: "-.01em", maxWidth: "48ch" }}>
          Linking petroleum PAH profiles to p53 mutation spectra in Niger Delta cohorts
        </div>
        <div className="mono" style={{ fontSize: 11.5, color: "var(--graphite)", marginTop: 12 }}>J. Environmental Molecular Toxicology, 2026</div>
        <div style={{ fontSize: 13.5, color: "var(--graphite)", marginTop: 12, lineHeight: 1.6, maxWidth: "70ch" }}>
          Cross-referenced against 1,240 registry entries and 18 Lagos hazard sites. Demonstrates platform data supporting peer-reviewed causal inference.
        </div>
        <div className="chem-links" style={{ marginTop: 14 }}>
          <span className="pill">DOI resolved</span><span className="pill">42 citations</span><span className="pill">Open access</span>
        </div>
      </div>
    </>
  );
}
