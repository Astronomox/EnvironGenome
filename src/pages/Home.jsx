import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui";
import { feed, sites, districts, SEV_COLOR, SEV_LABEL } from "../data/platform";
import { contaminants } from "../data/contaminants";
import { literature } from "../data/literature";

const Kpi = ({ lab, val, sub }) => (
  <div className="kpi"><div className="lab">{lab}</div><div className="val">{val}</div>{sub && <div className="sub"><b>{sub}</b></div>}</div>
);

export default function Home() {
  const nav = useNavigate();
  const [openLit, setOpenLit] = useState(-1);
  const counts = [0, 1, 2, 3].map(s => sites.filter(x => x.sev === s).length);
  const total = sites.length || 1;
  const pending = sites.filter(s => s.status === "Pending verification");

  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Home portal"
        sub="A snapshot of the registry, hazard map, and regulatory data currently in the system.">
        <button className="btn btn-ghost" onClick={() => nav("/app/map")}>Open map</button>
        <button className="btn btn-dark" onClick={() => nav("/app/registry")}>Search registry</button>
      </PageHeader>

      <div style={{ borderRadius:"var(--r)", border:"1px solid var(--hair)", overflow:"hidden", marginBottom:18 }}>
        <div style={{ padding:"14px 18px", background:"var(--panel)" }}>
          <div className="eyebrow" style={{ marginBottom:14 }}>Recent activity</div>
          {feed.length === 0 ? (
            <div style={{ fontSize:13.5, color:"var(--graphite)" }}>
              No activity feed yet. This module isn't wired to a real event source, so it stays empty rather than showing invented events.
            </div>
          ) : (
            feed.map(([t, x], i) => (
              <div key={i} style={{ display:"flex", gap:14, padding:"10px 0", borderBottom: i < feed.length-1 ? "1px solid var(--hair)" : "none", alignItems:"baseline" }}>
                <span className="mono" style={{ fontSize:11, color:"var(--graphite)", minWidth:48 }}>{t}</span>
                <span style={{ fontSize:13.5 }} dangerouslySetInnerHTML={{ __html:x }} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid g4">
        <Kpi lab="Contaminants" val={contaminants.length} sub="cited entries only" />
        <Kpi lab="Hazard sites" val={sites.length} sub="published sources only" />
        <Kpi lab="District scores" val={districts.length} sub="no data loaded yet" />
        <Kpi lab="Pending review" val={pending.length} />
      </div>

      <div className="grid g2" style={{ marginTop:14, alignItems:"start" }}>
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>Sites by severity</div>
          {sites.length === 0 ? (
            <div style={{ fontSize:13.5, color:"var(--graphite)" }}>No hazard sites loaded.</div>
          ) : (
            counts.map((c, i) => (
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
            ))
          )}
          <div className="mono" style={{ fontSize:11, color:"var(--graphite)", marginTop:14 }}>
            {pending.length} sites pending verification
          </div>
          <button className="btn btn-ghost" style={{ width:"100%", marginTop:12 }} onClick={() => nav("/app/map")}>View all on map</button>
        </div>

        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>About this build</div>
          <div style={{ fontSize:13.5, lineHeight:1.7, color:"var(--graphite)" }}>
            This is a coursework demo. Numbers on this page reflect what's actually
            loaded in the app's data files, not simulated activity. Modules with no
            cited data behind them show an empty state instead of placeholder figures.
          </div>
        </div>
      </div>

      <div className="sect-t">Quick access</div>
      <div className="grid g4">
        {[
          { label:"Flag a hazard site", sub:"Submit new field observation", path:"/app/map", icon:"M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z" },
          { label:"Look up a contaminant", sub:contaminants.length + " compounds loaded", path:"/app/registry", icon:"M4 4h16v4H4zM4 10h16v10H4z" },
          { label:"Check district scores", sub:districts.length + " districts scored", path:"/app/scores", icon:"M4 20V10M10 20V4M16 20v-8" },
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

      <div className="sect-t">Cited research ({literature.length})</div>
      <div className="stack">
        {literature.map((l, i) => (
          <div className="card" key={i} style={{ cursor:"pointer" }} onClick={() => setOpenLit(openLit === i ? -1 : i)}>
            <div className="card-pad lit-row">
              <span className="pill lit-tag">{l.tag}</span>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, lineHeight:1.5 }}>{l.cite}</div>
                {openLit === i && <div style={{ fontSize:12.5, color:"var(--graphite)", lineHeight:1.6, marginTop:8 }}>{l.finding}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sect-t">Platform status</div>
      <div className="grid g3">
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>System</div>
          <div className="stack" style={{ gap:10 }}>
            {[
              ["Map tiles","OpenStreetMap, live","ok"],
              ["Gemini integration","Server-side, no key needed","ok"],
              ["Build version","4.1.32","info"],
            ].map(([l,v,t]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--hair)" }}>
                <span style={{ fontSize:13 }}>{l}</span>
                <span className="mono" style={{ fontSize:10.5, padding:"2px 8px", borderRadius:5,
                  background: t==="ok"?"rgba(47,158,68,.08)":"var(--smoke)",
                  color: t==="ok"?"var(--ok)":"var(--graphite)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
