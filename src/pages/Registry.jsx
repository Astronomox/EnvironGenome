import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader, SearchInput, Segmented, Empty } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { contaminants } from "../data/contaminants";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

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
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={onCite}>Cite this entry</button>
          </div>
        </div>
      </div>
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
  const [ai, setAi] = useState({ status: "idle", text: "" });

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
        <button className="btn btn-dark" onClick={ask}><span className="ai-spark">✦</span> Ask Gemini</button>
      </PageHeader>

      {ai.status !== "idle" && <div style={{ marginBottom: 18 }}><AiPanel label="Gemini interpretation" state={ai} /></div>}

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
    </>
  );
}
