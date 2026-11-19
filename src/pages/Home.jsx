import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/kit";
import Term from "../components/Term";
import { sites, districts, SEV_COLOR, SEV_LABEL } from "../data/platform";
import { contaminants } from "../data/contaminants";
import { askGemini } from "../utils/gemini";
import { Button } from "@/components/ui/button";

const Kpi = ({ lab, val, sub }) => (
  <div className="kpi"><div className="lab">{lab}</div><div className="val">{val}</div>{sub && <div className="sub"><b>{sub}</b></div>}</div>
);

export default function Home() {
  const nav = useNavigate();
  const [geminiStatus, setGeminiStatus] = useState({ state: "checking" }); // checking | not-configured | configured | active | down

  useEffect(() => {
    fetch("/api/gemini-status")
      .then(r => r.json())
      .then(d => setGeminiStatus({ state: d.configured ? "configured" : "not-configured" }))
      .catch(() => setGeminiStatus({ state: "not-configured" }));
  }, []);

  async function testGeminiConnection() {
    setGeminiStatus(s => ({ ...s, state: "testing" }));
    try {
      await askGemini("Reply with the single word OK.");
      setGeminiStatus({ state: "active" });
    } catch (e) {
      setGeminiStatus({ state: "down", reason: e.message });
    }
  }
  const counts = [0, 1, 2, 3].map(s => sites.filter(x => x.sev === s).length);
  const total = sites.length || 1;
  const pending = sites.filter(s => s.status === "Pending verification");

  return (
    <>
      <PageHeader eyebrow="Overview" title="Exposure and genetic risk"
        sub="Where pollutants are found in Lagos, and the genetic damage they are known to cause.">
        <Button variant="outline" onClick={() => nav("/app/map")}>Open map</Button>
        <Button onClick={() => nav("/app/registry")}>Search registry</Button>
      </PageHeader>

      <div className="grid g4">
        <Kpi lab="Genotoxic agents" val={contaminants.filter(c => c.genotoxic).length} sub="damage DNA directly or indirectly" />
        <Kpi lab="Group 1 carcinogens" val={contaminants.filter(c => /^Group 1\b/.test(c.iarc)).length} sub="IARC classification" />
        <Kpi lab="Hazard sites" val={sites.length} sub={pending.length + " pending verification"} />
        <Kpi lab="Districts scored" val={districts.length} sub="Lagos exposure-risk grades" />
      </div>

      <div className="card" style={{ marginTop:14, overflow:"hidden" }}>
        <div className="card-pad" style={{ paddingBottom:6, display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, flexWrap:"wrap" }}>
          <div className="eyebrow">From exposure to DNA damage</div>
          <Button variant="link" size="sm" className="h-auto px-0" onClick={() => nav("/app/registry")}>Open registry</Button>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="risk-tbl">
            <thead><tr><th>Agent</th><th>Where it comes from</th><th>IARC</th><th>Genetic signature</th></tr></thead>
            <tbody>
              {contaminants.map(c => (
                <tr key={c.cas}>
                  <td><b>{c.name}</b></td>
                  <td>{(c.props.find(([k]) => k === "Main sources") || [, ""])[1]}</td>
                  <td style={{ whiteSpace:"nowrap" }}>{(c.iarc.match(/^Group \w+/) || [""])[0]}</td>
                  <td>{c.mutations[0] ? <><b>{c.mutations[0][1]}</b>, {c.mutations[0][2].replace(/ \(.*\)$/, "")}</> : <span style={{ color:"var(--graphite)" }}>{(c.props.find(([k]) => k === "Mechanism") || [, "Not established"])[1]}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                    <Term name={"Level " + i}>L{i} {SEV_LABEL[i]}</Term>
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
          <Button variant="outline" style={{ width:"100%", marginTop:12 }} onClick={() => nav("/app/map")}>View all on map</Button>
        </div>

        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>About the data</div>
          <div style={{ fontSize:13.5, lineHeight:1.7, color:"var(--graphite)" }}>
            This is a demonstration build. Agent classifications and genetic
            signatures come from IARC Monographs and primary studies, cited on each
            registry entry. Site and district figures are model estimates from published
            Lagos studies.
          </div>
        </div>
      </div>

      <div className="sect-t">Quick access</div>
      <div className="grid g4">
        {[
          { label:"Flag a hazard site", sub:"Submit new field observation", path:"/app/map", icon:"M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z" },
          { label:"Look up an agent", sub:contaminants.length + " priority pollutants", path:"/app/registry", icon:"M4 4h16v4H4zM4 10h16v10H4z" },
          { label:"Check district risk", sub:districts.length + " districts graded", path:"/app/scores", icon:"M4 20V10M10 20V4M16 20v-8" },
          { label:"Screen a patient", sub:"Symptoms to likely exposures", path:"/app/therapeutic", icon:"M12 5v14M5 12h14" },
        ].map(({ label, sub, path, icon }) => (
          <div key={path} className="card card-pad" style={{ cursor:"pointer", transition:"border-color .15s" }}
            onClick={() => nav(path)}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--army)"}
            onMouseLeave={e => e.currentTarget.style.borderColor=""}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width:20, height:20, marginBottom:10 }}><path d={icon} /></svg>
            <div style={{ fontWeight:500, fontSize:13.5 }}>{label}</div>
            <div style={{ fontSize:12.5, color:"var(--graphite)", marginTop:4 }}>{sub}</div>
          </div>
        ))}
      </div>



      <div className="sect-t">Platform status</div>
      <div className="grid g3 g3-stack-mobile">
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>System</div>
          <div className="stack" style={{ gap:10 }}>
            {[
              ["Map tiles","OpenStreetMap, live","ok"],
            ].map(([l,v,t]) => (
              <div key={l} className="status-row" style={{ padding:"8px 0", borderBottom:"1px solid var(--hair)" }}>
                <span style={{ fontSize:13 }}>{l}</span>
                <span className="mono status-val" style={{ fontSize:10.5, padding:"2px 8px", borderRadius:5,
                  background: t==="ok"?"rgba(35,122,53,.08)":"var(--smoke)",
                  color: t==="ok"?"var(--ok)":"var(--graphite)" }}>{v}</span>
              </div>
            ))}
            <div className="status-row" style={{ padding:"8px 0", borderBottom: geminiStatus.state==="down" ? "none" : "1px solid var(--hair)" }}>
              <span style={{ fontSize:13 }}>Gemini integration</span>
              {(() => {
                const map = {
                  checking:  { text:"Checking...",           color:"var(--graphite)", bg:"var(--smoke)" },
                  testing:   { text:"Testing...",             color:"var(--graphite)", bg:"var(--smoke)" },
                  "not-configured": { text:"Not configured",  color:"var(--sev3)",     bg:"rgba(216,68,44,.08)" },
                  configured:{ text:"Configured, not tested", color:"var(--graphite)", bg:"var(--smoke)" },
                  active:    { text:"Active",                 color:"var(--ok)",       bg:"rgba(35,122,53,.08)" },
                  down:      { text:"Down",                   color:"var(--sev3)",     bg:"rgba(216,68,44,.08)" },
                };
                const s = map[geminiStatus.state] || map.checking;
                return <span className="mono status-val" style={{ fontSize:10.5, padding:"2px 8px", borderRadius:5, background:s.bg, color:s.color }}>{s.text}</span>;
              })()}
            </div>
            {geminiStatus.state === "down" && (
              <div style={{ fontSize:11.5, color:"var(--sev3)", paddingBottom:8, lineHeight:1.5 }}>{geminiStatus.reason}</div>
            )}
            {geminiStatus.state !== "checking" && geminiStatus.state !== "not-configured" && (
              <Button variant="outline" style={{ width:"100%", marginTop:2 }}
                onClick={testGeminiConnection} disabled={geminiStatus.state === "testing"}>
                {geminiStatus.state === "testing" ? "Testing..." : "Test connection"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
