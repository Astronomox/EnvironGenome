import { useState } from "react";
import { PageHeader, Table } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { species } from "../data/platform";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

export default function Conservation() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [threat, setThreat] = useState("");
  const [ai, setAi] = useState({ status: "idle", text: "" });

  const columns = [
    { key: "name", label: "Species", cls: "name" },
    { key: "latin", label: "Scientific name", render: r => <span className="mono" style={{ fontStyle: "italic", color: "var(--graphite)" }}>{r.latin}</span> },
    { key: "risk", label: "Extinction risk", align: "right", render: r => (
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
        <div className={"meter" + (r.risk >= 70 ? " r" : "")} style={{ width: 80 }}><i style={{ width: r.risk + "%" }} /></div>
        <span className="mono" style={{ minWidth: 34 }}>{r.risk}%</span>
      </div>
    ) },
    { key: "note", label: "Driver", cls: "g" }
  ];

  async function forecast() {
    if (!threat.trim()) { setAi({ status: "error", text: "Describe the threat first." }); return; }
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    try {
      const t = await askGemini(key,
        `You are a conservation intelligence analyst. Threat described: "${threat}". Produce a concise mitigation brief for an approval committee, under 160 words: (1) likely trajectory if unaddressed, (2) two or three concrete mitigation actions with rough feasibility, (3) one measurable success indicator. Plain prose, bold key actions with **text**. Ministerial tone.`);
      setAi({ status: "done", text: t }); toast("Mitigation brief drafted");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Threat forecasting" title="Conservation intelligence"
        sub="Track at-risk species and let Gemini draft a mitigation brief the committee can act on." />

      <div className="sect-t">Species at risk, Lagos wetlands</div>
      <Table columns={columns} rows={species} rowKey={r => r.name} onRowClick={r => toast(`${r.name} profile opened`)} initialSort={{ key: "risk", dir: -1 }} />

      <div className="sect-t">Threat forecast</div>
      <div className="card card-pad">
        <div className="fg">
          <label>Describe the emerging threat</label>
          <textarea rows={4} value={threat} onChange={e => setThreat(e.target.value)}
            placeholder="e.g. Rising chromium levels in the Agege canal after new tannery discharge, mangroves showing dieback over 6 months" />
        </div>
        <button className="btn btn-dark" style={{ marginTop: 14 }} onClick={forecast}>
          <span className="ai-spark">✦</span> Forecast and draft mitigation
        </button>
        {ai.status !== "idle" && <div style={{ marginTop: 16 }}><AiPanel label="Gemini mitigation brief" state={ai} /></div>}
      </div>
    </>
  );
}
