import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader, SearchInput, Segmented, Table, Empty } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { standards } from "../data/platform";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

export default function Standards() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [params] = useSearchParams();
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState(params.get("q") || "");
  const [ja, setJa] = useState("WHO Ambient Air Quality Guidelines");
  const [jb, setJb] = useState("Federal Environmental Quality Standards Act (Cap E10)");
  const [ai, setAi] = useState({ status: "idle", text: "" });

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
    { key: "tag", label: "Type", cls: "g" }
  ];

  async function compare() {
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    try {
      const t = await askGemini(key,
        `You are a regulatory analyst. Compare these two environmental standards for a multinational operating in Lagos: "${ja}" and "${jb}". In under 170 words, give: the key difference in scope or strictness, one specific area where they conflict or create a compliance gap, and a practical recommendation to comply with both. Plain prose. Bold the two standard names with **name** on first mention.`);
      setAi({ status: "done", text: t }); toast("Gap analysis ready");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Regulation" title="Standards reference library"
        sub="Every active instrument from global treaty to Lagos State by-law. Sortable and comparable.">
        <SearchInput value={q} onChange={setQ} placeholder="Search instruments" />
        <Segmented value={tier} onChange={setTier}
          options={[{ value: "all", label: "All" }, { value: "Global", label: "Global" }, { value: "Regional", label: "Regional" }, { value: "Nigeria", label: "Nigeria" }]} />
      </PageHeader>

      {rows.length === 0 ? (
        <div className="tbl-wrap"><Empty text={`No instruments match "${q}"`} /></div>
      ) : (
        <Table columns={columns} rows={rows} rowKey={r => r.t} onRowClick={r => toast(`Opening ${r.t.slice(0, 30)}...`)} initialSort={{ key: "tier", dir: 1 }} />
      )}

      <div className="sect-t">Regulatory gap analyser</div>
      <div className="card card-pad">
        <div className="form-grid">
          <div className="fg"><label>Standard A</label>
            <select value={ja} onChange={e => setJa(e.target.value)}>{standards.map(s => <option key={s.t}>{s.t}</option>)}</select></div>
          <div className="fg"><label>Standard B</label>
            <select value={jb} onChange={e => setJb(e.target.value)}>{standards.map(s => <option key={s.t}>{s.t}</option>)}</select></div>
        </div>
        <button className="btn btn-dark" style={{ marginTop: 16 }} onClick={compare}>
          <span className="ai-spark">✦</span> Analyse compliance gap
        </button>
        {ai.status !== "idle" && <div style={{ marginTop: 16 }}><AiPanel label="Gemini gap analysis" state={ai} /></div>}
      </div>
    </>
  );
}
