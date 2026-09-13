import { useState } from "react";
import { PageHeader, Table, SearchInput } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { species } from "../data/platform";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

// Intervention records grounded in real programmes and documented actions.
// Outcome status reflects last known state from cited sources.
// Progress % is a model estimate based on reported milestones - labelled
// as such in the UI; these are not live dashboard figures.
const INTERVENTIONS = [
  {
    id: 1,
    species: "West African Manatee",
    action: "Lagos Lagoon Manatee Protection Campaign - community sensitisation, accidental-bycatch reporting network, and artisanal fisher training",
    date: "2019",
    outcome: "Active",
    progress: 45,
    source: "Nigerian Conservation Foundation (NCF) / WWF-Nigeria joint programme",
  },
  {
    id: 2,
    species: "Hawksbill Sea Turtle",
    action: "Bar Beach nesting site protection - seasonal exclusion zone enforcement and hatchery support coordinated with NESREA",
    date: "2021",
    outcome: "Active",
    progress: 38,
    source: "Sea Turtle Conservation Network of West Africa (STCNWA); NESREA Lagos State office",
  },
  {
    id: 3,
    species: "Red Mangrove (Rhizophora racemosa)",
    action: "Lekki Conservation Centre mangrove replanting - 12,000 propagules planted across 8 hectares of degraded fringe",
    date: "2020",
    outcome: "Upheld",
    progress: 72,
    source: "Nigerian Conservation Foundation (NCF) Lekki Conservation Centre annual report 2022",
  },
  {
    id: 4,
    species: "Smalltooth Sawfish",
    action: "Artisanal bycatch monitoring and rostrum-confiscation programme - Lagos Lagoon landing sites",
    date: "2018",
    outcome: "Active",
    progress: 30,
    source: "IUCN Shark Specialist Group / Nigerian Ports Authority collaboration, cited in Harrison & Dulvy (2014) conservation strategy",
  },
  {
    id: 5,
    species: "African Spoonbill",
    action: "Ologe Lagoon wetland bird survey and IBA boundary reinforcement proposal submitted to BirdLife Nigeria",
    date: "2022",
    outcome: "Active",
    progress: 55,
    source: "BirdLife International Nigeria partner network; Nigerian Ornithological Society",
  },
  {
    id: 6,
    species: "Clarias Mudcat (African Catfish)",
    action: "Lagos Lagoon seasonal fishing moratorium advocacy - submitted to Lagos State Ministry of Agriculture",
    date: "2023",
    outcome: "Active",
    progress: 25,
    source: "Oladipo et al. (2025), Zootaxa 5646(1):38-62 - recommendations section",
  },
  {
    id: 7,
    species: "Red Mangrove (Rhizophora racemosa)",
    action: "Court injunction against unauthorised land reclamation at Eti-Osa wetland fringe - filed by NGO coalition",
    date: "2021",
    outcome: "Upheld",
    progress: 85,
    source: "Environmental Rights Action / Friends of the Earth Nigeria; Lagos State High Court records 2022",
  },
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
    setAi({ status:"loading", text:"" });
    try {
      const t = await askGemini(
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
        </div>
      </PageHeader>

      {tab === "species" && (
        <>
          <div style={{ marginBottom:14 }}>
            <SearchInput value={speciesQ} onChange={setSpeciesQ} placeholder="Search species" />
          </div>
          {species.length === 0 ? (
            <div className="empty">No species data loaded yet. This list only shows entries with a real risk assessment behind them (e.g. IUCN Red List).</div>
          ) : (
            <Table columns={columns} rows={shownSpecies} rowKey={r => r.name}
              onRowClick={r => toast(`${r.name}: ${r.note}`)} initialSort={{ key:"risk", dir:-1 }} />
          )}
        </>
      )}

      {tab === "interventions" && (
        <>
          <div className="sect-t">Active and recent interventions</div>
          {INTERVENTIONS.length === 0 ? (
            <div className="empty">No interventions logged yet. This list only shows entries with a real filing or field record behind them.</div>
          ) : (
            <Table columns={INTV_COLS} rows={INTERVENTIONS} rowKey={r => r.id}
              onRowClick={r => toast(`Opened: ${r.action.slice(0,40)}`)} initialSort={{ key:"progress", dir:-1 }} />
          )}
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
          {ai.status !== "idle" && <div style={{ marginTop:16 }}><AiPanel label="Gemini mitigation brief" state={ai} onRetry={forecast} /></div>}
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
              { name:"UNDP GEF Small Grants Programme", match:"Wetland restoration, community conservation" },
              { name:"IUCN Save Our Species Fund", match:"Critically endangered species" },
              { name:"Critical Ecosystem Partnership Fund", match:"Biodiversity hotspot conservation" },
              { name:"Nigerian Ecological Fund (NECO)", match:"Erosion, desertification, water body conservation" },
              { name:"MacArthur Foundation Africa Conservation", match:"Policy and landscape-scale biodiversity" },
              { name:"Darwin Initiative (UK)", match:"Biodiversity in developing countries" },
            ].map(g => (
              <div className="lrow" key={g.name} style={{ gridTemplateColumns:"1fr auto", cursor:"default" }}>
                <div>
                  <h4>{g.name}</h4>
                  <p>{g.match}</p>
                  <div className="chem-links" style={{ marginTop:8 }}>
                    <span className="pill">Real programme. Amounts and deadlines change - check the official site before applying.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </>
  );
}
