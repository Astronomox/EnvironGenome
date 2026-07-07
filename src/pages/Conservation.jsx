import { useState } from "react";
import { PageHeader, Table, SearchInput } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { species } from "../data/platform";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

const INTERVENTIONS = [
  { id:1, species:"West African Manatee", action:"Lagoon exclusion zone established", date:"2026-04-10", outcome:"Monitoring", progress:42 },
  { id:2, species:"Niger Delta Red Colobus", action:"Forest corridor protection order filed", date:"2026-03-22", outcome:"In review", progress:28 },
  { id:3, species:"Sclater's Guenon", action:"Community sensitisation programme launched", date:"2026-02-14", outcome:"Active", progress:67 },
  { id:4, species:"African Slender-snouted Crocodile", action:"Wetland drainage halt injunction", date:"2025-12-01", outcome:"Upheld", progress:89 },
];

const INTV_COLS = [
  { key:"species", label:"Species", cls:"name" },
  { key:"action", label:"Intervention" },
  { key:"date", label:"Filed", cls:"g" },
  { key:"outcome", label:"Status", cls:"g", render: r => (
    <span style={{ fontFamily:"var(--mono)", fontSize:10.5, padding:"3px 8px", borderRadius:5,
      background: r.outcome==="Upheld"?"#f0fdf4":r.outcome==="Active"?"var(--smoke)":"var(--smoke-2)",
      border:`1px solid ${r.outcome==="Upheld"?"var(--ok)":"var(--hair)"}`,
      color: r.outcome==="Upheld"?"var(--ok)":"var(--graphite)" }}>{r.outcome}</span>
  )},
  { key:"progress", label:"Progress", align:"right", render: r => (
    <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end" }}>
      <div className={"meter"+(r.progress<50?" r":"")} style={{ width:60 }}><i style={{ width:r.progress+"%" }} /></div>
      <span className="mono" style={{ minWidth:30, fontSize:11 }}>{r.progress}%</span>
    </div>
  )}
];

export default function Conservation() {
  const { key, openKey } = useKey();
  const toast = useToast();
  const [threat, setThreat] = useState("");
  const [ai, setAi] = useState({ status: "idle", text: "" });
  const [tab, setTab] = useState("species");
  const [speciesQ, setSpeciesQ] = useState("");

  const shownSpecies = species.filter(s =>
    !speciesQ || s.name.toLowerCase().includes(speciesQ.toLowerCase()) || s.latin.toLowerCase().includes(speciesQ.toLowerCase()));

  const columns = [
    { key: "name", label: "Species", cls: "name" },
    { key: "latin", label: "Scientific name", render: r => <span className="mono" style={{ fontStyle:"italic", color:"var(--graphite)" }}>{r.latin}</span> },
    { key: "risk", label: "Extinction risk", align:"right", sortVal: r => r.risk, render: r => (
      <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"flex-end" }}>
        <div className={"meter"+(r.risk>=70?" r":"")} style={{ width:80 }}><i style={{ width:r.risk+"%" }} /></div>
        <span className="mono" style={{ minWidth:34 }}>{r.risk}%</span>
      </div>
    )},
    { key:"note", label:"Driver", cls:"g" }
  ];

  async function forecast() {
    if (!threat.trim()) { setAi({ status:"error", text:"Describe the threat first." }); return; }
    if (!key) { openKey(); return; }
    setAi({ status:"loading", text:"" });
    try {
      const t = await askGemini(key,
        `You are a conservation intelligence analyst. Threat described: "${threat}". Produce a concise mitigation brief for an approval committee, under 160 words: (1) likely trajectory if unaddressed, (2) two or three concrete mitigation actions with rough feasibility, (3) one measurable success indicator. Plain prose, bold key actions with **text**. Ministerial tone.`);
      setAi({ status:"done", text:t }); toast("Mitigation brief drafted");
    } catch(e) { setAi({ status:"error", text:e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Threat forecasting" title="Conservation intelligence"
        sub="Track at-risk species, monitor live interventions, and draft mitigation briefs the committee can act on.">
        <div className="seg">
          <button className={tab==="species"?"on":""} onClick={() => setTab("species")}>Species</button>
          <button className={tab==="interventions"?"on":""} onClick={() => setTab("interventions")}>Interventions</button>
          <button className={tab==="forecast"?"on":""} onClick={() => setTab("forecast")}>Forecast</button>
          <button className={tab==="grants"?"on":""} onClick={() => setTab("grants")}>Grants</button>
          <button className={tab==="experts"?"on":""} onClick={() => setTab("experts")}>Experts</button>
        </div>
      </PageHeader>

      {tab === "species" && (
        <>
          <div style={{ marginBottom:14 }}>
            <SearchInput value={speciesQ} onChange={setSpeciesQ} placeholder="Search species" />
          </div>
          <Table columns={columns} rows={shownSpecies} rowKey={r => r.name}
            onRowClick={r => toast(`${r.name}: ${r.note}`)} initialSort={{ key:"risk", dir:-1 }} />
        </>
      )}

      {tab === "interventions" && (
        <>
          <div className="sect-t">Active and recent interventions</div>
          <Table columns={INTV_COLS} rows={INTERVENTIONS} rowKey={r => r.id}
            onRowClick={r => toast(`Opened: ${r.action.slice(0,40)}`)} initialSort={{ key:"progress", dir:-1 }} />
          <div className="grid g3" style={{ marginTop:18 }}>
            {[["4","Total interventions"],["2","Active"],["1","Upheld in court"]].map(([n,l]) => (
              <div className="kpi" key={l}><div className="lab">{l}</div><div className="val" style={{ fontSize:28 }}>{n}</div></div>
            ))}
          </div>
        </>
      )}

      {tab === "forecast" && (
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:12 }}>Describe the emerging threat</div>
          <div className="fg" style={{ marginBottom:14 }}>
            <textarea rows={5} value={threat} onChange={e => setThreat(e.target.value)}
              placeholder="e.g. Rising chromium levels in the Agege canal after new tannery discharge, mangroves showing dieback over 6 months" />
          </div>
          <button className="btn btn-dark" onClick={forecast}>
            <span className="ai-spark">✦</span> Forecast and draft mitigation
          </button>
          {ai.status !== "idle" && <div style={{ marginTop:16 }}><AiPanel label="Gemini mitigation brief" state={ai} /></div>}
          {ai.status === "done" && (
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <button className="btn btn-ghost" onClick={() => toast("Brief sent to committee portal")}>Send to committee</button>
              <button className="btn btn-ghost" onClick={() => { setThreat(""); setAi({ status:"idle", text:"" }); }}>Clear</button>
            </div>
          )}
        </div>
      )}

      {tab === "grants" && (
        <>
          <div className="sect-t">Biodiversity preservation funding</div>
          <div className="stack">
            {[
              { name:"UNDP GEF Small Grants Programme", amount:"Up to $50,000", deadline:"Rolling quarterly", match:"Wetland restoration, community conservation", status:"Open" },
              { name:"IUCN Save Our Species Fund", amount:"Up to EUR 250,000", deadline:"2026-09-01", match:"Critically endangered species, Lagos wetlands", status:"Open" },
              { name:"Critical Ecosystem Partnership Fund", amount:"Up to $200,000", deadline:"2026-10-15", match:"Biodiversity hotspot conservation, Nigeria", status:"Open" },
              { name:"Nigerian Ecological Fund (NECO)", amount:"Variable", deadline:"Annual, Q1", match:"Erosion, desertification, water body conservation", status:"Check portal" },
              { name:"MacArthur Foundation Africa Conservation", amount:"Up to $500,000", deadline:"By invitation", match:"Policy and landscape-scale biodiversity", status:"By invitation" },
              { name:"Darwin Initiative (UK)", amount:"Up to GBP 300,000", deadline:"2026-11-20", match:"Biodiversity in developing countries incl. Nigeria", status:"Open" },
            ].map(g => (
              <div className="lrow" key={g.name} style={{ gridTemplateColumns:"1fr auto", cursor:"default" }}>
                <div>
                  <h4>{g.name}</h4>
                  <p>{g.match}</p>
                  <div className="chem-links" style={{ marginTop:8 }}>
                    <span className="pill">{g.amount}</span>
                    <span className="pill">Deadline: {g.deadline}</span>
                    <span className="pill" style={{ borderColor: g.status==="Open"?"var(--ok)":"var(--hair)", color: g.status==="Open"?"var(--ok)":"var(--graphite)" }}>{g.status}</span>
                  </div>
                </div>
                <button className="btn btn-ghost" onClick={() => toast(`Opening ${g.name}`)}>Apply</button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "experts" && (
        <>
          <div className="sect-t">Expert locator</div>
          <div className="stack">
            {[
              { name:"Prof. Ayodele Adesanya", inst:"University of Lagos", specialty:"Marine mammal ecology, West African manatee", avail:"Available for consultation", contact:"a.adesanya@unilag.edu.ng" },
              { name:"Dr. Chioma Nwosu", inst:"LUTH Environmental Medicine", specialty:"Heavy metal toxicology, clinical ecology", avail:"Limited availability", contact:"c.nwosu@luth.gov.ng" },
              { name:"Dr. Ibrahim Garba", inst:"Ahmadu Bello University", specialty:"Avian ecology, Sahel-forest transition species", avail:"Available for field work", contact:"i.garba@abu.edu.ng" },
              { name:"Dr. Emeka Okafor", inst:"Niger Delta University", specialty:"Oil spill ecology, mangrove rehabilitation", avail:"Available for consultation", contact:"e.okafor@ndu.edu.ng" },
              { name:"Prof. Ngozi Adeyemi", inst:"University of Ibadan", specialty:"Herpetology, crocodilian conservation", avail:"Field season active", contact:"n.adeyemi@ui.edu.ng" },
              { name:"Dr. Fatima Al-Hassan", inst:"NESREA Lagos Office", specialty:"Regulatory compliance, EIA auditing", avail:"Government liaison available", contact:"f.alhassan@nesrea.gov.ng" },
            ].map(e => (
              <div className="lrow" key={e.name} style={{ gridTemplateColumns:"1fr auto", cursor:"default" }}>
                <div>
                  <h4>{e.name}</h4>
                  <p className="mono" style={{ fontSize:11.5, color:"var(--graphite)" }}>{e.inst}</p>
                  <p style={{ marginTop:4 }}>{e.specialty}</p>
                  <span className="pill" style={{ marginTop:8, display:"inline-block",
                    borderColor: e.avail.includes("Available")?"var(--ok)":"var(--hair)",
                    color: e.avail.includes("Available")?"var(--ok)":"var(--graphite)" }}>{e.avail}</span>
                </div>
                <button className="btn btn-ghost" onClick={() => { navigator.clipboard?.writeText(e.contact); toast(`Email copied: ${e.contact}`); }}>Copy email</button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
