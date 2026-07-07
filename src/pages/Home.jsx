import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PageHeader } from "../components/ui";
import { feed, sites, SEV_COLOR, SEV_LABEL } from "../data/platform";

const PAPERS = [
  { title:"Linking petroleum PAH profiles to p53 mutation spectra in Niger Delta cohorts", journal:"J. Environmental Molecular Toxicology", year:2026, tags:["DOI resolved","42 citations","Open access"], link:"/app/registry?q=Benzo" },
  { title:"Cadmium exposure and GCN4 dysregulation in Lagos industrial zone workers", journal:"Environmental Health Perspectives", year:2026, tags:["Peer reviewed","18 data points","UNILAG authored"], link:"/app/registry?q=Cadmium" },
  { title:"Chromium VI effluent and chromosomal aberrations in Ikeja factory cohort", journal:"Mutation Research", year:2025, tags:["Open access","LUTH clinical data","12 citations"], link:"/app/map?site=2" },
  { title:"Species vulnerability index for Lagos wetland manatee under anthropogenic pressure", journal:"Aquatic Conservation", year:2025, tags:["Conservation data","IUCN aligned","Field verified"], link:"/app/conservation" },
  { title:"Bayesian etiology mapping of respiratory presentations in high-PM2.5 Lagos zones", journal:"International Journal of Epidemiology", year:2026, tags:["Clinical data","LUTH cohort","Model validated"], link:"/app/therapeutic" },
];

function ResearchCarousel({ nav }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % PAPERS.length); setFading(false); }, 350);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  const p = PAPERS[idx];
  return (
    <div className="card card-pad" style={{ display:"flex", flexDirection:"column", minHeight:240 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div className="eyebrow">Featured research</div>
        <div style={{ display:"flex", gap:5 }}>
          {PAPERS.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width:6, height:6, borderRadius:"50%", cursor:"pointer",
              background: i===idx ? "var(--ink)" : "var(--hair-2)", transition:"background .2s" }} />
          ))}
        </div>
      </div>
      <div style={{ flex:1, opacity: fading ? 0 : 1, transition:"opacity .35s" }}>
        <div className="serif" style={{ fontSize:19, lineHeight:1.28, letterSpacing:"-.01em", maxWidth:"44ch" }}>{p.title}</div>
        <div className="mono" style={{ fontSize:11.5, color:"var(--graphite)", marginTop:12 }}>{p.journal}, {p.year}</div>
        <div className="chem-links" style={{ marginTop:12, flexWrap:"wrap" }}>
          {p.tags.map(t => <span className="pill" key={t}>{t}</span>)}
        </div>
      </div>
      <button className="btn btn-ghost" style={{ marginTop:16, alignSelf:"flex-start" }} onClick={() => nav(p.link)}>View in platform</button>
    </div>
  );
}

const Kpi = ({ lab, val, sub }) => (
  <div className="kpi"><div className="lab">{lab}</div><div className="val">{val}</div><div className="sub"><b>{sub}</b></div></div>
);

const LIVE_ALERTS = [
  "NEW: Level 3 alert at Iddo Terminus, pending verification",
  "UPDATED: Apapa Port Fringe substance confirmed as Benzo[a]pyrene",
  "VALIDATED: Ikeja Effluent Channel Chromium VI, LASEPA audit",
  "NEW: Cadmium to GCN4 disruption link peer-approved",
  "ALERT: 3 sites in Lagos Island above WHO PM2.5 threshold",
  "UPDATED: WHO Ambient Air Quality Guidelines revision indexed",
  "NEW: Therapy referral #4583 opened at LUTH",
];

function LiveTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % LIVE_ALERTS.length); setVisible(true); }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ background:"var(--ink)", color:"var(--paper)", padding:"10px 20px", display:"flex", alignItems:"center", gap:14, fontSize:13, borderRadius: "var(--r) var(--r) 0 0", overflow:"hidden" }}>
      <span className="mono" style={{ fontSize:10, letterSpacing:".12em", background:"var(--sev3)", padding:"3px 7px", borderRadius:4, flexShrink:0 }}>LIVE</span>
      <span style={{ opacity: visible ? 1 : 0, transition:"opacity .35s", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
        {LIVE_ALERTS[idx]}
      </span>
      <span className="mono" style={{ marginLeft:"auto", fontSize:10, color:"rgba(250,250,248,.5)", flexShrink:0 }}>
        {idx+1}/{LIVE_ALERTS.length}
      </span>
    </div>
  );
}

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

      {/* live ticker */}
      <div style={{ borderRadius:"var(--r)", border:"1px solid var(--hair)", overflow:"hidden", marginBottom:18 }}>
        <LiveTicker />
        <div style={{ padding:"14px 18px", background:"var(--panel)" }}>
          <div className="eyebrow" style={{ marginBottom:14 }}>Recent activity</div>
          {feed.map(([t, x], i) => (
            <div key={i} style={{ display:"flex", gap:14, padding:"10px 0", borderBottom: i < feed.length-1 ? "1px solid var(--hair)" : "none", alignItems:"baseline" }}>
              <span className="mono" style={{ fontSize:11, color:"var(--graphite)", minWidth:48 }}>{t}</span>
              <span style={{ fontSize:13.5 }} dangerouslySetInnerHTML={{ __html:x }} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid g4">
        <Kpi lab="Contaminants" val="42,150" sub="+128 this week" />
        <Kpi lab="Hazard sites" val={sites.length + " (demo)"} sub="+43 in production" />
        <Kpi lab="Genome pairings" val="6,847" sub="+12 validated" />
        <Kpi lab="Active alerts" val="7" sub="3 at Level 3" />
      </div>

      <div className="grid g2" style={{ marginTop:14, alignItems:"start" }}>
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>Sites by severity</div>
          {counts.map((c, i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:5 }}>
                <span className="row" style={{ gap:7 }}>
                  <span style={{ width:9, height:9, borderRadius:2, background:SEV_COLOR[i] }} />
                  L{i} {SEV_LABEL[i]}
                </span>
                <span className="mono" style={{ color:"var(--graphite)" }}>{c}</span>
              </div>
              <div className={"meter"+(i===3?" r":"")}><i style={{ width:(c/total*100)+"%" }} /></div>
            </div>
          ))}
          <div className="mono" style={{ fontSize:11, color:"var(--graphite)", marginTop:14 }}>
            {pending.length} sites pending verification
          </div>
          <button className="btn btn-ghost" style={{ width:"100%", marginTop:12 }} onClick={() => nav("/app/map")}>View all on map</button>
        </div>

        <ResearchCarousel nav={nav} />
      </div>

      {/* quick nav cards */}
      <div className="sect-t">Quick access</div>
      <div className="grid g4">
        {[
          { label:"Flag a hazard site", sub:"Submit new field observation", path:"/app/map", icon:"M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z" },
          { label:"Look up a contaminant", sub:"49 compounds with genome data", path:"/app/registry", icon:"M4 4h16v4H4zM4 10h16v10H4z" },
          { label:"Check district scores", sub:"24 Lagos habitability grades", path:"/app/scores", icon:"M4 20V10M10 20V4M16 20v-8" },
          { label:"File a clinical case", sub:"Anonymised therapeutic intake", path:"/app/therapeutic", icon:"M12 5v14M5 12h14" },
        ].map(({ label, sub, path, icon }) => (
          <div key={path} className="card card-pad" style={{ cursor:"pointer", transition:"border-color .15s" }}
            onClick={() => nav(path)}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--ink)"}
            onMouseLeave={e => e.currentTarget.style.borderColor=""}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width:20, height:20, marginBottom:10 }}><path d={icon} /></svg>
            <div style={{ fontWeight:500, fontSize:13.5 }}>{label}</div>
            <div style={{ fontSize:12.5, color:"var(--graphite)", marginTop:4 }}>{sub}</div>
          </div>
        ))}
      </div>
    </>
  );
}
