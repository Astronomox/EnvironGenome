import { useState } from "react";
import { PageHeader } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { symptoms } from "../data/platform";
import { sites, SEV_COLOR, SEV_LABEL } from "../data/platform";

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function ProximityCalc() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [results, setResults] = useState(null);
  function calc() {
    const la = parseFloat(lat), lo = parseFloat(lng);
    if (isNaN(la) || isNaN(lo)) return;
    const nearby = sites
      .map(s => ({ ...s, dist: haversine(la, lo, s.lat, s.lng) }))
      .filter(s => s.dist <= 10)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5);
    setResults(nearby);
  }
  return (
    <div>
      <div className="form-grid" style={{ marginBottom:12 }}>
        <div className="fg"><label>Patient latitude</label><input value={lat} onChange={e=>setLat(e.target.value)} placeholder="e.g. 6.5244" /></div>
        <div className="fg"><label>Patient longitude</label><input value={lng} onChange={e=>setLng(e.target.value)} placeholder="e.g. 3.3792" /></div>
      </div>
      <button className="btn btn-ghost" onClick={calc}>Find nearby hazard sites within 10 km</button>
      {results !== null && (
        <div style={{ marginTop:14 }}>
          {results.length === 0 ? (
            <div style={{ fontSize:13.5, color:"var(--graphite)" }}>No registered hazard sites within 10 km of these coordinates.</div>
          ) : (
            <div className="stack" style={{ gap:8 }}>
              {results.map(s => (
                <div key={s.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", border:"1px solid var(--hair)", borderRadius:9, background:"var(--panel)" }}>
                  <span style={{ width:9, height:9, borderRadius:2, background:SEV_COLOR[s.sev], flex:"none" }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:500 }}>{s.name}</div>
                    <div className="mono" style={{ fontSize:11, color:"var(--graphite)" }}>{s.sub}</div>
                  </div>
                  <div className="mono" style={{ fontSize:11, color:"var(--graphite)", textAlign:"right" }}>
                    <div>{s.dist.toFixed(2)} km</div>
                    <div className={"sev s"+s.sev} style={{ padding:"2px 6px", marginTop:3 }}><span className="sq" />L{s.sev}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

const Field = ({ label, children }) => <div className="fg"><label>{label}</label>{children}</div>;

export default function Therapeutic() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [sel, setSel] = useState([]);
  const [ai, setAi] = useState({ status: "idle", text: "" });
  const [refAi, setRefAi] = useState({ status: "idle", text: "" });
  const toggle = (s) => setSel(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  async function genReferral() {
    if (!key) { openKey(); return; }
    setRefAi({ status: "loading", text: "" });
    try {
      const t = await askGemini(key,
        `Draft a formal referral letter from an attending physician to the Department of Occupational and Environmental Medicine at Lagos University Teaching Hospital (LUTH). The patient (anonymised ID: EGX-4582) presents with: ${sel.join(", ")}. Based on preliminary environmental etiology matching, suspected environmental exposure is the likely cause. Request environmental testing verification for the suspected source location and recommend rehabilitation interventions matched to hazard elimination progress. Under 150 words, professional medical letter format. Bold the header and sign-off with **text**.`);
      setRefAi({ status: "done", text: t }); toast("Referral letter generated");
    } catch (e) { setRefAi({ status: "error", text: e.message }); }
  }

  async function match() {
    if (!sel.length) { setAi({ status: "error", text: "Select at least one presenting symptom first." }); return; }
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    try {
      const t = await askGemini(key,
        `You are a clinical decision-support aid for environmental medicine at Lagos University Teaching Hospital. A patient presents with: ${sel.join(", ")}. List the 3 most probable environmental or toxic etiologies in descending confidence. For each: name the pollutant class, one recommended confirmatory biomarker or lab test, and typical exposure source in the Lagos context. Under 150 words, plain prose with pollutant names in bold using **name**. Add a one-line note that this is decision-support, not diagnosis.`);
      setAi({ status: "done", text: t }); toast("Differential generated");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Clinical" title="Therapeutic rehabilitation"
        sub="Anonymised intake. Select presenting symptoms and rank probable environmental etiologies." />

      <div className="anon-note" style={{ marginBottom: 18 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
        Anonymised identifier <b style={{ color: "var(--ink)" }}>EGX-4582</b> generated automatically. No patient name is stored.
      </div>

      <div className="grid g2" style={{ alignItems: "start" }}>
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Patient intake</div>
          <div className="form-grid">
            <Field label="Age bracket"><select>{["Under 12", "13 to 17", "18 to 35", "36 to 55", "Over 56"].map(o => <option key={o}>{o}</option>)}</select></Field>
            <Field label="Sex assigned at birth"><select>{["Male", "Female", "Intersex", "Prefer not to say"].map(o => <option key={o}>{o}</option>)}</select></Field>
            <Field label="Residency near source"><input placeholder="Years / months" /></Field>
            <Field label="Distance to hazard"><input placeholder="Kilometres" /></Field>
          </div>
          <div className="eyebrow" style={{ margin: "20px 0 10px" }}>Presenting symptoms ({sel.length} selected)</div>
          <div className="checks">
            {symptoms.map(s => (
              <div key={s} className={"chk" + (sel.includes(s) ? " on" : "")} onClick={() => toggle(s)}><span className="box" />{s}</div>
            ))}
          </div>
          <button className="btn btn-dark" style={{ width: "100%", marginTop: 16 }} onClick={match}>
            <span className="ai-spark">✦</span> Match to environmental etiology
          </button>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Etiology matrix</div>
          {ai.status === "idle" ? (
            <div className="card card-pad" style={{ color: "var(--graphite)", fontSize: 13.5, lineHeight: 1.6 }}>
              Select symptoms and run the match to see ranked environmental causes, confirmatory biomarkers, and exposure sources.
            </div>
          ) : <AiPanel label="Gemini differential" state={ai} />}

          {/* post-match actions */}
          {ai.status === "done" && (
            <div className="card card-pad" style={{ marginTop: 14 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Case actions</div>
              <div className="stack" style={{ gap: 8 }}>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={genReferral}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 15, height: 15 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8" /></svg>
                  Generate referral letter to LUTH
                </button>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => toast("Follow-up scheduled for 30 days from today")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 15, height: 15 }}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  Schedule 30-day follow-up
                </button>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => { setSel([]); setAi({ status: "idle", text: "" }); toast("Form reset for next patient"); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 15, height: 15 }}><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" /></svg>
                  New patient intake
                </button>
              </div>
            </div>
          )}

          {/* referral letter */}
          {refAi.status !== "idle" && (
            <div style={{ marginTop: 14 }}><AiPanel label="Gemini referral letter" state={refAi} /></div>
          )}

          <div className="card card-pad" style={{ marginTop: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Referral</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
              Route to <b>Lagos University Teaching Hospital</b>, Occupational and Environmental Medicine. Secure channel active.
            </div>
          </div>
        </div>
      </div>
      <div className="sect-t">Proximity analysis</div>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom:12 }}>Nearest registered hazard sites to patient location</div>
        <ProximityCalc />
      </div>

      <div className="sect-t">Treatment pathway planner</div>
      <TreatmentPlanner sel={sel} />

      <div className="sect-t">Family counselling toolkit</div>
      <div className="grid g3">
        {[
          { title:"Reducing continued exposure", icon:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", items:["Remove child from affected area during remediation","Use certified water filters if mains supply is suspect","Ventilate indoor spaces, seal cracks near contaminated soil","Wash hands before meals; remove shoes at the door","Avoid homegrown produce near known hazard sites"] },
          { title:"Warning signs to watch", icon:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", items:["Unexplained fatigue or cognitive changes in children","Skin rashes or discolouration without clear cause","Recurring headaches or nausea near the hazard site","Elevated blood pressure in otherwise healthy adults","Unusual birth outcomes in the household"] },
          { title:"Community action steps", icon:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", items:["Report new symptoms to LUTH Occupational Medicine","Flag the hazard site on EnviroGenome for tracking","Request NESREA field inspection if site is unregistered","Connect with community advocacy groups for remediation","Keep records: dates, symptoms, and proximity to site"] },
        ].map(s => (
          <div className="card card-pad" key={s.title}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18, flex:"none" }}><path d={s.icon} /></svg>
              <div style={{ fontWeight:500, fontSize:14 }}>{s.title}</div>
            </div>
            <div className="stack" style={{ gap:6 }}>
              {s.items.map((item, i) => (
                <div key={i} style={{ display:"flex", gap:8, fontSize:13, lineHeight:1.5 }}>
                  <span style={{ color:"var(--graphite)", flex:"none" }}>{i+1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const PATHWAYS = {
  "Lead":{ phase1:"Chelation therapy (DMSA oral or CaNa2EDTA IV based on blood lead level)", phase2:"Nutritional supplementation: calcium, iron, zinc to compete with lead uptake", phase3:"Remove from exposure source and monitor blood lead every 3 months", monitor:"Blood lead level, haemoglobin, renal function panel" },
  "Mercury":{ phase1:"DMSA chelation for methylmercury; supportive care for acute inorganic exposure", phase2:"Selenium supplementation, high-protein diet to aid renal clearance", phase3:"Neurological assessment at 6 and 12 months post-exposure cessation", monitor:"Urine mercury, nerve conduction velocity, renal function" },
  "Arsenic":{ phase1:"DMSA or DMPS chelation; aggressive hydration to promote urinary excretion", phase2:"Antioxidant supplementation: Vitamins C and E, selenium, folate", phase3:"Dermatological surveillance (keratosis, Bowen disease risk) annually", monitor:"Urine arsenic speciation, skin examination, full blood count" },
  "Cadmium":{ phase1:"No specific antidote; stop exposure immediately; avoid further renal stress (NSAIDs, nephrotoxic drugs)", phase2:"Zinc supplementation to displace cadmium from MT binding sites", phase3:"Long-term renal function monitoring, bone density scan at 2 years", monitor:"Urine beta-2 microglobulin, serum creatinine, bone density" },
  "Benzene":{ phase1:"Remove from exposure; supportive bone marrow monitoring; G-CSF if neutropenia develops", phase2:"Full haematological workup every 6 months for 5 years", phase3:"Genetic counselling if chromosomal aberrations detected on blood smear", monitor:"Full blood count, liver enzymes, chromosome analysis" },
};

function TreatmentPlanner({ sel }) {
  const [pollutant, setPollutant] = useState("Lead");
  const pw = PATHWAYS[pollutant];
  return (
    <div className="card card-pad">
      <div className="fg" style={{ marginBottom:18 }}>
        <label>Suspected primary pollutant exposure</label>
        <select value={pollutant} onChange={e => setPollutant(e.target.value)}>
          {Object.keys(PATHWAYS).map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      {pw && (
        <div className="stack" style={{ gap:10 }}>
          {[["Phase 1 (Acute)", pw.phase1, "var(--sev3)"], ["Phase 2 (Subacute)", pw.phase2, "var(--sev2)"], ["Phase 3 (Long-term)", pw.phase3, "var(--sev1)"]].map(([label, text, color]) => (
            <div key={label} style={{ display:"flex", gap:14, padding:"12px 14px", border:"1px solid var(--hair)", borderRadius:10, background:"var(--panel)" }}>
              <div style={{ width:4, borderRadius:4, background:color, flex:"none" }} />
              <div>
                <div className="mono" style={{ fontSize:10.5, color:"var(--graphite)", marginBottom:4 }}>{label}</div>
                <div style={{ fontSize:13.5, lineHeight:1.6 }}>{text}</div>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", gap:10, alignItems:"center", padding:"10px 14px", background:"var(--smoke)", borderRadius:9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" style={{ width:16, height:16, flex:"none" }}><path d="M22 12A10 10 0 1112 2" /><path d="M22 2L12 12M22 2h-6M22 2v6" /></svg>
            <div><span className="mono" style={{ fontSize:10.5, color:"var(--graphite)" }}>MONITORING PARAMETERS</span><div style={{ fontSize:13 }}>{pw.monitor}</div></div>
          </div>
        </div>
      )}
      <div className="mono" style={{ fontSize:10, color:"var(--mute)", marginTop:14, lineHeight:1.6 }}>Treatment pathways are reference templates. All clinical decisions must be made by a licensed physician with access to the patient's full clinical picture. Refer to LUTH Occupational Medicine for specialist review.</div>
    </div>
  );
}
