import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader, SearchInput, Segmented, Empty } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { contaminants } from "../data/contaminants";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";
import { toCSV, download } from "../utils/export";
import PathwayDiagram from "../components/PathwayDiagram";

function PeerSubmit({ compound, toast }) {
  const [form, setForm] = useState({ organism:"", locus:"", pattern:"", evidence:"strong", notes:"" });
  const [done, setDone] = useState(false);
  function submit() {
    if (!form.organism || !form.locus) { toast("Organism and locus are required"); return; }
    setDone(true); toast(`Association submitted for moderation. Ref #PR-${Math.floor(10000+Math.random()*90000)}`);
  }
  if (done) return (
    <div className="card card-pad" style={{ display:"flex", alignItems:"center", gap:14 }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2" style={{ width:22, height:22, flex:"none" }}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
      <div><div style={{ fontWeight:500 }}>Association submitted for peer review</div>
        <div style={{ fontSize:13, color:"var(--graphite)" }}>A reviewer will be assigned within 48 hours.</div></div>
      <button className="btn btn-ghost" style={{ marginLeft:"auto" }} onClick={() => { setDone(false); setForm({ organism:"", locus:"", pattern:"", evidence:"strong", notes:"" }); }}>Submit another</button>
    </div>
  );
  return (
    <div className="card card-pad">
      <div className="eyebrow" style={{ marginBottom:14 }}>Propose genome association for {compound}</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <div className="fg"><label>Organism</label><input value={form.organism} onChange={e => setForm(p=>({...p,organism:e.target.value}))} placeholder="e.g. Homo sapiens" /></div>
        <div className="fg"><label>Gene locus</label><input value={form.locus} onChange={e => setForm(p=>({...p,locus:e.target.value}))} placeholder="e.g. TP53 / chr17" /></div>
        <div className="fg"><label>Damage pattern</label><input value={form.pattern} onChange={e => setForm(p=>({...p,pattern:e.target.value}))} placeholder="e.g. G to T transversion" /></div>
        <div className="fg"><label>Evidence grade</label>
          <select value={form.evidence} onChange={e => setForm(p=>({...p,evidence:e.target.value}))}>
            <option value="strong">Strong</option><option value="moderate">Moderate</option><option value="poor">Poor</option>
          </select>
        </div>
        <div className="fg" style={{ gridColumn:"span 2" }}><label>Supporting notes or DOI</label>
          <textarea rows={3} value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))} placeholder="Paste DOI or summarise evidence" /></div>
      </div>
      <button className="btn btn-dark" style={{ marginTop:14 }} onClick={submit}>Submit for peer review</button>
    </div>
  );
}

function ChemDetail({ c, onCite }) {
  return (
    <div className="chem-detail">
      <div className="chem-hd">
        <div>
          <h2>{c.name}</h2>
          <div className="formula">{c.formula} / CAS {c.cas}</div>
        </div>
        {c.genotoxic && <div className="geno-flag">Genotoxic, {c.iarc}</div>}
      </div>
      <div className="chem-body">
        <div className="chem-col brd">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Physical and toxicological</div>
          <table className="proptbl"><tbody>
            {c.props.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}
          </tbody></table>
        </div>
        <div className="chem-col">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Associated mutations</div>
          <table className="muttbl">
            <thead><tr><th>Organism</th><th>Locus</th><th>Damage pattern</th></tr></thead>
            <tbody>
              {c.mutations.map((m, i) => (
                <tr key={i}><td style={{ fontStyle: "italic" }}>{m[0]}</td><td className="g">{m[1]}</td><td>{m[2]}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="eyebrow" style={{ margin: "18px 0 10px" }}>External resources</div>
          <div className="chem-links">{c.links.map(l => <span className="pill" key={l}>{l}</span>)}</div>
          <PathwayDiagram cas={c.cas} />
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={onCite}>Cite this entry</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareView({ filtered, selCas, compareCas, setSelCas, setCompareCas, onCite }) {
  const a = contaminants.find(c => c.cas === selCas);
  const b = contaminants.find(c => c.cas === compareCas);
  function CompareCol({ c, role, setFn }) {
    return (
      <div>
        <div className="fg" style={{ marginBottom: 14 }}>
          <label>{role}</label>
          <select value={c?.cas || ""} onChange={e => setFn(e.target.value)}>
            <option value="">Select compound</option>
            {filtered.map(x => <option key={x.cas} value={x.cas}>{x.name}</option>)}
          </select>
        </div>
        {c ? (
          <div className="chem-detail">
            <div className="chem-hd">
              <div><h2>{c.name}</h2><div className="formula">{c.formula} / CAS {c.cas}</div></div>
              {c.genotoxic && <div className="geno-flag">Genotoxic, {c.iarc}</div>}
            </div>
            <div className="chem-col" style={{ padding: "18px 22px" }}>
              <table className="proptbl"><tbody>
                {c.props.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
              </tbody></table>
              <div style={{ marginTop: 16 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Mutations</div>
                {c.mutations.map((m, i) => (
                  <div key={i} style={{ fontSize: 12.5, padding: "6px 0", borderBottom: "1px solid var(--hair)", display: "flex", gap: 10 }}>
                    <span style={{ fontStyle: "italic", minWidth: 100, color: "var(--graphite)" }}>{m[0]}</span>
                    <span className="mono" style={{ color: "var(--graphite)", minWidth: 80 }}>{m[1]}</span>
                    <span>{m[2]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card card-pad" style={{ color: "var(--mute)", fontSize: 13 }}>Select a compound above to load it here.</div>
        )}
      </div>
    );
  }

  const sharedProps = a && b ? a.props.filter(([k]) => b.props.find(([k2]) => k2 === k)).map(([k]) => {
    const av = a.props.find(([k2]) => k2 === k)?.[1];
    const bv = b.props.find(([k2]) => k2 === k)?.[1];
    return { k, av, bv, diff: av !== bv };
  }) : [];

  return (
    <div>
      <div className="grid g2" style={{ gap: 18 }}>
        <CompareCol c={a} role="Compound A" setFn={setSelCas} />
        <CompareCol c={b} role="Compound B" setFn={setCompareCas} />
      </div>
      {sharedProps.length > 0 && (
        <>
          <div className="sect-t">Side-by-side property diff</div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Property</th><th>A: {a?.name}</th><th>B: {b?.name}</th><th>Match</th></tr></thead>
              <tbody>
                {sharedProps.map(({ k, av, bv, diff }) => (
                  <tr key={k} style={{ background: diff ? "rgba(216,68,44,.04)" : "transparent" }}>
                    <td className="g">{k}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{av}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{bv}</td>
                    <td>{diff
                      ? <span style={{ color: "var(--sev3)", fontFamily: "var(--mono)", fontSize: 10 }}>DIFFERS</span>
                      : <span style={{ color: "var(--ok)", fontFamily: "var(--mono)", fontSize: 10 }}>SAME</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function BulkUpload({ toast }) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const TEMPLATE_CSV = `name,cas,formula,iarc,genotoxic\nBenzene,71-43-2,C6H6,Group 1 Carcinogen,true\nToluene,108-88-3,C7H8,Group 3,false`;

  function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    return lines.slice(1).map(line => {
      const vals = line.split(",");
      return Object.fromEntries(headers.map((h, i) => [h, vals[i]?.trim() || ""]));
    });
  }

  function handleFile(f) {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCSV(e.target.result);
      setPreview(rows.slice(0, 5));
    };
    reader.readAsText(f);
  }

  function submit() {
    if (!file) return;
    toast(`${preview.length} entries (preview) queued for moderation review`);
    setFile(null); setPreview([]);
  }

  return (
    <div className="card card-pad">
      <div className="eyebrow" style={{ marginBottom: 12 }}>CSV bulk importer</div>
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        style={{ border: `2px dashed ${drag ? "var(--ink)" : "var(--hair-2)"}`, borderRadius: 10,
          padding: "28px 20px", textAlign: "center", transition: "border-color .2s", cursor: "pointer",
          background: drag ? "var(--smoke)" : "transparent" }}
        onClick={() => document.getElementById("csv-input").click()}>
        <input id="csv-input" type="file" accept=".csv" style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])} />
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.6" style={{ width: 24, height: 24, margin: "0 auto 10px" }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{file ? file.name : "Drop CSV or click to upload"}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--graphite)", marginTop: 4 }}>
          Required columns: name, cas, formula, iarc, genotoxic
        </div>
      </div>

      {preview.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Preview (first {preview.length} rows)</div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Name</th><th>CAS</th><th>Formula</th><th>IARC</th><th>Genotoxic</th></tr></thead>
              <tbody>
                {preview.map((r, i) => (
                  <tr key={i}>
                    <td className="name">{r.name}</td>
                    <td className="g">{r.cas}</td>
                    <td className="g">{r.formula}</td>
                    <td style={{ fontSize: 12 }}>{r.iarc}</td>
                    <td><span style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "2px 7px", borderRadius: 4, background: r.genotoxic === "true" ? "rgba(216,68,44,.08)" : "var(--smoke)", color: r.genotoxic === "true" ? "var(--sev3)" : "var(--graphite)" }}>{r.genotoxic === "true" ? "Yes" : "No"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn btn-dark" onClick={submit}>Submit for review</button>
            <button className="btn btn-ghost" onClick={() => { setFile(null); setPreview([]); }}>Clear</button>
          </div>
        </div>
      )}

      <button className="btn btn-ghost" style={{ marginTop: 14 }}
        onClick={() => { const blob = new Blob([TEMPLATE_CSV], { type: "text/csv" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "envirogenome-template.csv"; a.click(); toast("Template downloaded"); }}>
        Download CSV template
      </button>
    </div>
  );
}

export default function Registry() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState("all");
  const [selCas, setSelCas] = useState(contaminants[0].cas);
  const [compareCas, setCompareCas] = useState(null);
  const [view, setView] = useState("detail"); // detail | compare
  const [ai, setAi] = useState({ status: "idle", text: "" });

  function exportCSV() {
    const cols = [
      { key:"name", label:"Name" }, { key:"cas", label:"CAS" },
      { key:"formula", label:"Formula" }, { key:"iarc", label:"IARC"},
      { key:"genotoxic", label:"Genotoxic" }
    ];
    const rows = filtered.map(c => ({ ...c, genotoxic: c.genotoxic ? "Yes" : "No" }));
    download(toCSV(rows, cols), "envirogenome-contaminants.csv", "text/csv");
    toast(`Exported ${rows.length} entries as CSV`);
  }

  useEffect(() => {
    const pq = params.get("q");
    if (pq) {
      setQ(pq);
      const match = contaminants.find(c => c.name.toLowerCase().includes(pq.toLowerCase()));
      if (match) setSelCas(match.cas);
    }
  }, [params]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return contaminants.filter(c => {
      const matchTerm = !term || c.name.toLowerCase().includes(term) || c.cas.includes(term) || c.formula.toLowerCase().includes(term);
      const matchCat = cat === "all" || (cat === "geno" ? c.genotoxic : !c.genotoxic);
      return matchTerm && matchCat;
    });
  }, [q, cat]);

  useEffect(() => {
    if (filtered.length && !filtered.find(c => c.cas === selCas)) setSelCas(filtered[0].cas);
  }, [filtered, selCas]);

  const selected = contaminants.find(c => c.cas === selCas);

  async function ask() {
    if (!q.trim()) { toast("Type a question or compound first"); return; }
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    try {
      const t = await askGemini(key,
        `You are a toxicology database assistant for the EnviroGenome platform. A user searched: "${q}". Respond in under 130 words. If it is a CAS number, formula or chemical name, summarise the contaminant key toxicological profile and any known genotoxic or mutagenic effects on specific genes. If it is a question, answer it precisely, naming relevant compounds and affected genes. Plain prose, no headers.`);
      setAi({ status: "done", text: t });
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Chemistry and genome" title="Contaminant registry"
        sub="Filter the registry, or ask a question in plain language and let Gemini interpret.">
        <SearchInput value={q} onChange={setQ} onEnter={ask} placeholder="Name, CAS, formula, or a question" />
        <Segmented value={cat} onChange={setCat}
          options={[{ value: "all", label: "All" }, { value: "geno", label: "Genotoxic" }, { value: "other", label: "Other" }]} />
        <Segmented value={view} onChange={setView}
          options={[{ value: "detail", label: "Detail" }, { value: "compare", label: "Compare" }]} />
        <button className="btn btn-ghost" onClick={exportCSV}>Export CSV</button>
        <button className="btn btn-dark" onClick={ask}><span className="ai-spark">✦</span> Ask Gemini</button>
      </PageHeader>

      {ai.status !== "idle" && <div style={{ marginBottom: 18 }}><AiPanel label="Gemini interpretation" state={ai} /></div>}

      {view === "compare" ? (
        <CompareView
          filtered={filtered} selCas={selCas} compareCas={compareCas}
          setSelCas={setSelCas} setCompareCas={setCompareCas}
          onCite={c => toast(`Citation for ${c.name} copied`)} />
      ) : (
        <div className="md">
          <div className="md-list">
            {filtered.length === 0 ? <Empty text={`No compounds match "${q}"`} /> : filtered.map(c => (
              <div key={c.cas} className={"li" + (c.cas === selCas ? " sel" : "")} onClick={() => setSelCas(c.cas)}>
                <div style={{ minWidth: 0 }}>
                  <div className="t">{c.name}</div>
                  <div className="s">{c.formula} / {c.cas}</div>
                </div>
                {c.genotoxic && <span className="badge sev s3" style={{ padding: "2px 6px" }}><span className="sq" /></span>}
              </div>
            ))}
          </div>
          {selected && <ChemDetail c={selected} onCite={() => toast(`Citation for ${selected.name} copied`)} />}
        </div>
      )}

      {/* citation export */}
      {selected && (
        <>
          <div className="sect-t">Citation export</div>
          <div className="card card-pad">
            <div className="grid g2" style={{ alignItems:"start", gap:14 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom:10 }}>APA</div>
                <div className="mono" style={{ fontSize:12, lineHeight:1.8, background:"var(--smoke)", padding:"12px 14px", borderRadius:8 }}>
                  EnviroGenome Guardian. (2026). {selected.name} (CAS {selected.cas}). EnviroGenome Contaminant Registry. University of Lagos. https://envirogenome.unilag.edu.ng/registry/{selected.cas}
                </div>
                <button className="btn btn-ghost" style={{ marginTop:10 }} onClick={() => { navigator.clipboard?.writeText(`EnviroGenome Guardian. (2026). ${selected.name} (CAS ${selected.cas}). EnviroGenome Contaminant Registry.`); toast("APA citation copied"); }}>Copy APA</button>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom:10 }}>Vancouver / NLM</div>
                <div className="mono" style={{ fontSize:12, lineHeight:1.8, background:"var(--smoke)", padding:"12px 14px", borderRadius:8 }}>
                  EnviroGenome Guardian. {selected.name} [{selected.formula}]. CAS {selected.cas}. Lagos: EnviroGenome Contaminant Registry, University of Lagos; 2026. Available from: https://envirogenome.unilag.edu.ng/registry/{selected.cas}
                </div>
                <button className="btn btn-ghost" style={{ marginTop:10 }} onClick={() => { navigator.clipboard?.writeText(`EnviroGenome Guardian. ${selected.name} [${selected.formula}]. CAS ${selected.cas}.`); toast("Vancouver citation copied"); }}>Copy Vancouver</button>
              </div>
            </div>
          </div>

          <div className="sect-t">Propose a compound association</div>
          <PeerSubmit compound={selected.name} toast={toast} />

          <div className="sect-t">Bulk upload</div>
          <BulkUpload toast={toast} />
        </>
      )}
    </>
  );
}
