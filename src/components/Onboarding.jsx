import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PERSONAS = [
  { id:"researcher", label:"Genomic Researcher", desc:"Query toxins, retrieve mutation data, export for meta-analysis", icon:"M4 4h16v4H4zM4 10h16v10H4z", path:"/app/registry" },
  { id:"auditor", label:"Environmental Auditor", desc:"GPS-tag hazard zones, assign severity ratings, generate audit reports", icon:"M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z", path:"/app/map" },
  { id:"biologist", label:"Conservation Biologist", desc:"Track at-risk species, flag threats, draft mitigation briefs", icon:"M12 2C7 7 7 13 12 22c5-9 5-15 0-20z", path:"/app/conservation" },
  { id:"clinician", label:"Clinical Therapist", desc:"Link patient symptoms to environmental causes, generate referral letters", icon:"M12 5v14M5 12h14", path:"/app/therapeutic" },
  { id:"policy", label:"Policy Maker", desc:"Monitor violation heatmaps, compare regulations, export for testimony", icon:"M6 3h9l3 3v15H6z", path:"/app/standards" },
];

export default function Onboarding({ onDone }) {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [persona, setPersona] = useState(null);

  function finish(path) {
    try { localStorage.setItem("eg_onboarded", "1"); } catch {}
    onDone();
    nav(path || "/app");
  }

  if (step === 0) return (
    <div className="modal-bg" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div className="modal" style={{ maxWidth:560 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <svg viewBox="0 0 26 26" fill="none" stroke="#0A0A0A" strokeWidth="1.6" style={{ width:28, height:28 }}>
            <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
            <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
          </svg>
          <h3 style={{ margin:0 }}>Welcome to EnviroGenome</h3>
        </div>
        <p style={{ marginBottom:20 }}>The interdisciplinary platform connecting environmental toxicity data, genomic impact signatures, and spatial hazard intelligence. Who are you here as?</p>
        <div className="stack" style={{ gap:8, marginBottom:20 }}>
          {PERSONAS.map(p => (
            <div key={p.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
              border:`1.5px solid ${persona?.id===p.id?"var(--ink)":"var(--hair)"}`,
              borderRadius:10, cursor:"pointer", background:persona?.id===p.id?"var(--smoke)":"var(--panel)",
              transition:"all .15s" }} onClick={() => setPersona(p)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width:20, height:20, flex:"none" }}><path d={p.icon} /></svg>
              <div>
                <div style={{ fontWeight:500, fontSize:14 }}>{p.label}</div>
                <div style={{ fontSize:12.5, color:"var(--graphite)", marginTop:2 }}>{p.desc}</div>
              </div>
              {persona?.id===p.id && <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" style={{ width:16, height:16, marginLeft:"auto", flex:"none" }}><path d="M5 12l5 5L20 7" /></svg>}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => finish()}>Skip</button>
          <button className="btn btn-dark" style={{ flex:1 }} disabled={!persona} onClick={() => setStep(1)}>Continue</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-bg" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div className="modal" style={{ maxWidth:480 }}>
        <h3>Keyboard shortcuts</h3>
        <p style={{ marginBottom:16 }}>You can navigate the entire platform without a mouse.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 20px", marginBottom:20 }}>
          {[["⌘ K","Search everything"],["?","Show shortcuts"],["1 to 8","Jump to module"],["Esc","Close any modal"]].map(([k,l]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid var(--hair)" }}>
              <span style={{ fontSize:13 }}>{l}</span>
              <kbd style={{ fontFamily:"var(--mono)", fontSize:10.5, border:"1px solid var(--hair-2)", borderRadius:5, padding:"2px 7px", background:"var(--smoke)" }}>{k}</kbd>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setStep(0)}>Back</button>
          <button className="btn btn-dark" style={{ flex:1 }} onClick={() => finish(persona?.path)}>
            Go to {persona?.label.split(" ")[0]} view
          </button>
        </div>
      </div>
    </div>
  );
}
