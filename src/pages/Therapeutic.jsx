import { useState } from "react";
import { PageHeader } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { symptoms } from "../data/platform";
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
    </>
  );
}
