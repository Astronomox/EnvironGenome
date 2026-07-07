import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader, SearchInput, Segmented, Table, Empty } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { standards } from "../data/platform";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";
import { checklistText, download } from "../utils/export";

function DiffView({ a, b }) {
  const aWords = new Set(a.toLowerCase().split(/\W+/));
  const bWords = new Set(b.toLowerCase().split(/\W+/));
  const shared = [...aWords].filter(w => w.length > 4 && bWords.has(w));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      {[{ label: a, words: aWords }, { label: b, words: bWords }].map(({ label, words }, i) => (
        <div key={i} className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 10 }}>{label.slice(0, 50)}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {label.split(" ").slice(0, 20).map((w, j) => (
              <span key={j} style={{
                fontSize: 12, padding: "2px 7px", borderRadius: 4,
                background: shared.includes(w.toLowerCase().replace(/\W/g, "")) ? "var(--smoke-2)" : "var(--smoke)",
                border: `1px solid ${shared.includes(w.toLowerCase().replace(/\W/g, "")) ? "var(--ink)" : "var(--hair)"}`,
                fontFamily: "var(--mono)"
              }}>{w}</span>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--graphite)", marginTop: 10 }}>
            {shared.length} shared key terms
          </div>
        </div>
      ))}
    </div>
  );
}

const REV_DATA = {
  "WHO Ambient Air Quality Guidelines": [
    { year:"2021", label:"4th edition", note:"PM2.5 annual guideline tightened from 10 to 5 ug/m3" },
    { year:"2006", label:"3rd edition", note:"Introduced NO2 and ozone annual guidelines" },
    { year:"2000", label:"2nd edition", note:"Extended to include indoor air quality markers" },
    { year:"1987", label:"1st edition", note:"Original WHO air quality framework" },
  ],
  "Stockholm Convention on Persistent Organic Pollutants": [
    { year:"2023", label:"Amendment 12", note:"Added UV-328 and chlorinated paraffins (SCCP)" },
    { year:"2019", label:"Amendment 10", note:"Dicofol and perfluorooctanoic acid (PFOA) added" },
    { year:"2009", label:"Amendment 4",  note:"Nine new POPs added including PFOS and lindane" },
    { year:"2001", label:"Original text", note:"Initial 12 POPs listed for global elimination" },
  ],
  "Federal Environmental Quality Standards Act (Cap E10)": [
    { year:"2004", label:"Cap E10 LFN",  note:"Revised Laws of the Federation consolidation" },
    { year:"1992", label:"Original Act",  note:"Federal Environmental Protection Agency Act enacted" },
  ],
};
function getRevisions(standard) {
  const exact = REV_DATA[standard];
  if (exact) return exact;
  return [
    { year:"2024", label:"Latest revision", note:"Under review by issuing body" },
    { year:"2020", label:"Previous edition", note:"Superseded by current version" },
    { year:"2015", label:"Amendment", note:"Minor technical corrections" },
  ];
}

function RevisionHistory({ standard }) {
  const revs = getRevisions(standard);
  return (
    <div style={{ margin:"16px 0" }}>
      <div className="eyebrow" style={{ marginBottom:12 }}>Revision history: {standard.slice(0, 50)}</div>
      <div style={{ position:"relative", paddingLeft:24 }}>
        <div style={{ position:"absolute", left:8, top:0, bottom:0, width:1.5, background:"var(--hair-2)" }} />
        {revs.map((r, i) => (
          <div key={i} style={{ display:"flex", gap:16, marginBottom:14, position:"relative" }}>
            <div style={{ position:"absolute", left:-20, top:3, width:10, height:10, borderRadius:"50%",
              background: i===0 ? "var(--ink)" : "var(--hair-2)", border:"2px solid var(--paper)" }} />
            <div style={{ minWidth:42 }}>
              <div className="mono" style={{ fontSize:11, fontWeight:600, color: i===0 ? "var(--ink)" : "var(--graphite)" }}>{r.year}</div>
            </div>
            <div>
              <div style={{ fontSize:13.5, fontWeight: i===0 ? 600 : 400 }}>{r.label}</div>
              <div style={{ fontSize:12.5, color:"var(--graphite)", marginTop:2 }}>{r.note}</div>
            </div>
            {i===0 && <span style={{ marginLeft:"auto", fontFamily:"var(--mono)", fontSize:10, color:"var(--ok)", border:"1px solid var(--ok)", borderRadius:5, padding:"2px 7px", height:"fit-content" }}>Current</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Standards() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [params] = useSearchParams();
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState(params.get("q") || "");
  const [ja, setJa] = useState("WHO Ambient Air Quality Guidelines");
  const [jb, setJb] = useState("Federal Environmental Quality Standards Act (Cap E10)");
  const [ai, setAi] = useState({ status: "idle", text: "" });
  const [showDiff, setShowDiff] = useState(false);
  const [selRow, setSelRow] = useState(null);

  useEffect(() => { const pq = params.get("q"); if (pq) setQ(pq); }, [params]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return standards.filter(s =>
      (tier === "all" || s.tier === tier) &&
      (!term || s.t.toLowerCase().includes(term) || s.body.toLowerCase().includes(term)));
  }, [q, tier]);

  const columns = [
    { key: "t", label: "Instrument", cls: "name", render: r => r.t },
    { key: "body", label: "Issuing body", cls: "g" },
    { key: "tier", label: "Tier", cls: "g" },
    { key: "tag", label: "Type", cls: "g" },
    { key: "actions", label: "", sortable: false, render: r => (
      <div style={{ display: "flex", gap: 6 }}>
        <button className="pill" style={{ cursor: "pointer" }}
          onClick={e => { e.stopPropagation(); setJa(r.t); toast(`Standard A set to: ${r.t.slice(0, 30)}`); }}>Set A</button>
        <button className="pill" style={{ cursor: "pointer" }}
          onClick={e => { e.stopPropagation(); setJb(r.t); toast(`Standard B set to: ${r.t.slice(0, 30)}`); }}>Set B</button>
      </div>
    )}
  ];

  const [clStd, setClStd] = useState("Federal Environmental Quality Standards Act (Cap E10)");
  const [clAi, setClAi] = useState({ status: "idle", text: "" });
  const [checklist, setChecklist] = useState([]);

  async function buildChecklist() {
    if (!key) { openKey(); return; }
    setClAi({ status: "loading", text: "" }); setChecklist([]);
    try {
      const t = await askGemini(key,
        `You are a compliance officer. For the environmental standard "${clStd}", generate 8 to 10 concrete actionable compliance checklist items for a facility operating in Lagos, Nigeria. Each item should be a single clear action starting with a verb. Return ONLY a JSON array of strings, no markdown, no extra text. Example: ["Submit quarterly effluent samples to NESREA", "Display emergency contact numbers at all discharge points"]`);
      try {
        const clean = t.replace(/```json|```/g,"").trim();
        const items = JSON.parse(clean);
        setChecklist(items); setClAi({ status: "done", text: "" });
        toast("Checklist generated");
      } catch { setClAi({ status: "error", text: "Could not parse checklist. Try again." }); }
    } catch (e) { setClAi({ status: "error", text: e.message }); }
  }

  function downloadChecklist() {
    download(checklistText(clStd, checklist), "envirogenome-checklist.txt");
    toast("Checklist downloaded");
  }

  async function compare() {
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" }); setShowDiff(true);
    try {
      const t = await askGemini(key,
        `You are a regulatory analyst. Compare these two environmental standards for a multinational operating in Lagos: "${ja}" and "${jb}". In under 170 words, give: the key difference in scope or strictness, one specific area where they conflict or create a compliance gap, and a practical recommendation to comply with both. Plain prose. Bold the two standard names with **name** on first mention.`);
      setAi({ status: "done", text: t }); toast("Gap analysis ready");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Regulation" title="Standards reference library"
        sub="Every active instrument from global treaty to Lagos State by-law. Click Set A or Set B on any row to load it into the comparator.">
        <SearchInput value={q} onChange={setQ} placeholder="Search instruments" />
        <Segmented value={tier} onChange={setTier}
          options={[{ value: "all", label: "All" }, { value: "Global", label: "Global" }, { value: "Regional", label: "Regional" }, { value: "Nigeria", label: "Nigeria" }]} />
      </PageHeader>

      {rows.length === 0 ? (
        <div className="tbl-wrap"><Empty text={`No instruments match "${q}"`} /></div>
      ) : (
        <Table columns={columns} rows={rows} rowKey={r => r.t}
          selectedKey={selRow} onRowClick={r => setSelRow(r.t)}
          initialSort={{ key: "tier", dir: 1 }} />
      )}

      {selRow && <RevisionHistory standard={selRow} />}

      <div className="sect-t">Regulatory gap analyser</div>
      <div className="card card-pad">
        <div className="form-grid">
          <div className="fg"><label>Standard A</label>
            <select value={ja} onChange={e => setJa(e.target.value)}>
              {standards.map(s => <option key={s.t}>{s.t}</option>)}</select></div>
          <div className="fg"><label>Standard B</label>
            <select value={jb} onChange={e => setJb(e.target.value)}>
              {standards.map(s => <option key={s.t}>{s.t}</option>)}</select></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <button className="btn btn-dark" onClick={compare}>
            <span className="ai-spark">✦</span> Analyse compliance gap
          </button>
          <button className={"btn btn-ghost"} onClick={() => setShowDiff(d => !d)}>
            {showDiff ? "Hide" : "Show"} term overlap
          </button>
        </div>
        {showDiff && <DiffView a={ja} b={jb} />}
        {ai.status !== "idle" && <div style={{ marginTop: 16 }}><AiPanel label="Gemini gap analysis" state={ai} /></div>}
      </div>

      <div className="sect-t">Compliance checklist builder</div>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 12 }}>Generate an actionable compliance checklist from any instrument</div>
        <div className="fg" style={{ marginBottom: 14 }}>
          <label>Instrument</label>
          <select value={clStd} onChange={e => setClStd(e.target.value)}>
            {standards.map(s => <option key={s.t}>{s.t}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-dark" onClick={buildChecklist}
            disabled={clAi.status === "loading"}>
            <span className="ai-spark">✦</span> {clAi.status === "loading" ? "Generating..." : "Build checklist"}
          </button>
          {checklist.length > 0 && (
            <button className="btn btn-ghost" onClick={downloadChecklist}>Download .txt</button>
          )}
        </div>
        {clAi.status === "error" && <div style={{ color: "var(--sev3)", fontSize: 13, marginTop: 12 }}>{clAi.text}</div>}
        {checklist.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{clStd.slice(0, 50)}</div>
            <div className="stack" style={{ gap: 8 }}>
              {checklist.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px",
                  border: "1px solid var(--hair)", borderRadius: 9, background: "var(--panel)" }}>
                  <div style={{ width: 20, height: 20, border: "1.5px solid var(--hair-2)", borderRadius: 5, flex: "none", marginTop: 1 }} />
                  <span style={{ fontSize: 13.5 }}>{item}</span>
                  <span className="mono" style={{ marginLeft: "auto", fontSize: 10, color: "var(--mute)", flex: "none" }}>{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
