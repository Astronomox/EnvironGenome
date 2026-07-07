import { useState, useMemo } from "react";
import { PageHeader, SearchInput, Segmented } from "../components/ui";
import { districts } from "../data/platform";
import { computeGCS, computeAllGCS } from "../utils/gcs";
import { toCSV, download } from "../utils/export";

function scoreColor(v) {
  return v >= 80 ? "#2f9e44" : v >= 65 ? "#5a7d3a" : v >= 50 ? "#8a8a83" : v >= 40 ? "#c77b3a" : "#D8442C";
}

function TrendArrow({ v }) {
  if (v >= 70) return <span style={{ color:"var(--ok)", fontSize:13 }}>↑</span>;
  if (v >= 50) return <span style={{ color:"var(--graphite)", fontSize:13 }}>→</span>;
  return <span style={{ color:"var(--sev3)", fontSize:13 }}>↓</span>;
}

function WeightBar({ label, raw, weight, weighted }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:4 }}>
        <span>{label}</span>
        <span className="mono" style={{ color:"var(--graphite)", display:"flex", gap:10 }}>
          <span>{raw}% raw</span>
          <span style={{ color:"var(--ink)" }}>x {weight}</span>
          <span style={{ fontWeight:500 }}>= {weighted}</span>
        </span>
      </div>
      <div style={{ height:6, background:"var(--smoke-2)", borderRadius:3, overflow:"hidden" }}>
        <div style={{ height:"100%", width:raw+"%", background: raw<50?"var(--sev3)":"var(--ink)", borderRadius:3 }} />
      </div>
    </div>
  );
}

function MiniSparkline({ vals, color }) {
  const max = Math.max(...vals, 100), min = Math.min(...vals, 0);
  const W = 80, H = 24, pad = 2;
  const pts = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={W} height={H} style={{ overflow:"visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Scores() {
  const computed = useMemo(() => computeAllGCS(districts), []);
  const [pick, setPick] = useState(computed.find(([n]) => n === "Yaba") || computed[3]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("score");

  const detail = useMemo(() => computeGCS(pick[0]), [pick]);

  // mock 6-month trend per district
  const trend = useMemo(() => {
    return computed.map(([name, v]) => {
      const hist = [Math.max(0,v-8), Math.max(0,v-5), Math.max(0,v-3), v, Math.min(100,v+2), Math.min(100,v+1)];
      return [name, v, hist];
    });
  }, [computed]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    let d = trend.filter(([n]) => !term || n.toLowerCase().includes(term));
    if (sort === "score") d = [...d].sort((a, b) => b[1] - a[1]);
    else d = [...d].sort((a, b) => a[0].localeCompare(b[0]));
    return d;
  }, [q, sort, trend]);

  function exportScores() {
    const cols = [{ key:"name", label:"District" }, { key:"score", label:"GCS Score (0-100)" }, { key:"trend", label:"6-month trend" }];
    const rows = shown.map(([name, v, hist]) => ({ name, score: v, trend: v >= 70 ? "Improving" : v >= 50 ? "Stable" : "Declining" }));
    download(toCSV(rows, cols), "envirogenome-district-scores.csv", "text/csv");
  }

  function printScores() {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>EnviroGenome District Scores</title>
    <style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;} h1{font-size:22px;} table{width:100%;border-collapse:collapse;} th{text-align:left;border-bottom:2px solid #000;padding:8px;font-family:monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;} td{padding:8px;border-bottom:1px solid #ddd;} .score{font-weight:bold;} .foot{font-family:monospace;font-size:10px;color:#888;margin-top:24px;}</style>
    </head><body><h1>EnviroGenome Guardian</h1><p style="font-family:monospace;font-size:12px;color:#666;">Global Classification Score, District Report, ${new Date().toISOString().slice(0,10)}</p>
    <table><thead><tr><th>District</th><th>GCS Score</th><th>Grade</th><th>Trend</th></tr></thead><tbody>
    ${shown.map(([n,v]) => `<tr><td>${n}</td><td class="score">${v}%</td><td>${v>=80?"Optimal":v>=65?"Good":v>=50?"Moderate":v>=40?"Poor":"Critical"}</td><td>${v>=70?"Improving":v>=50?"Stable":"Declining"}</td></tr>`).join("")}
    </tbody></table><div class="foot">EnviroGenome Guardian, University of Lagos and LUTH, Demo build v1.0, Built by Astronomox</div></body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }

  return (
    <>
      <PageHeader eyebrow="Habitability" title="Global classification score"
        sub="Live-computed composite district grades. Scores are calculated from air quality, natural features, water purity, toxic-exposure probability, and terrain stability.">
        <SearchInput value={q} onChange={setQ} placeholder="Find a district" />
        <Segmented value={sort} onChange={setSort}
          options={[{ value:"score", label:"By score" }, { value:"name", label:"A to Z" }]} />
        <button className="btn btn-ghost" onClick={exportScores}>Export CSV</button>
        <button className="btn btn-ghost" onClick={printScores}>Print report</button>
      </PageHeader>

      <div className="grid g2" style={{ alignItems:"start" }}>
        {/* grid + sparklines */}
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>District grades ({shown.length}), live computed</div>
          <div className="scoregrid">
            {shown.map(([name, v]) => (
              <div key={name} className={"scell" + (pick[0] === name ? " sel" : "")}
                style={{ background:scoreColor(v) }} onClick={() => setPick([name, v])}>
                <span className="v">{v}</span><span className="n">{name}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:14, marginTop:18, flexWrap:"wrap", fontFamily:"var(--mono)", fontSize:10, color:"var(--graphite)" }}>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#2f9e44" }} />80 to 100 optimal</span>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#8a8a83" }} />50 to 79 moderate</span>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#D8442C" }} />0 to 49 poor</span>
          </div>
          <div className="sect-t" style={{ marginTop:18 }}>6-month trend</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {shown.slice(0, 8).map(([name, v, hist]) => (
              <div key={name} style={{ display:"flex", alignItems:"center", gap:12, padding:"6px 0", borderBottom:"1px solid var(--hair)" }}>
                <span style={{ width:130, fontSize:12.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
                <MiniSparkline vals={hist} color={scoreColor(v)} />
                <TrendArrow v={v} />
                <span className="mono" style={{ fontSize:11, color:"var(--graphite)", marginLeft:"auto" }}>{v}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* detail breakdown */}
        <div>
          <div className="card card-pad">
            <div className="eyebrow" style={{ marginBottom:6 }}>Composite breakdown</div>
            <div className="row" style={{ gap:10, marginBottom:18 }}>
              <div className="serif" style={{ fontSize:26 }}>{pick[0]}</div>
              <div style={{ width:40, height:40, borderRadius:8, background:scoreColor(pick[1]), display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"var(--serif)", fontSize:17, color:"#fff" }}>{pick[1]}</span>
              </div>
            </div>
            {detail && detail.breakdown.map(({ label, value, weight }, i) => (
              <WeightBar key={label} label={label} raw={value} weight={weight} weighted={detail.weighted[i].value} />
            ))}
            <div style={{ marginTop:14, padding:"10px 12px", background:"var(--smoke)", borderRadius:8, fontFamily:"var(--mono)", fontSize:11, color:"var(--graphite)", lineHeight:1.6 }}>
              Formula: GCS = SUM(sub-score x weight)<br />
              Weights: Air 0.30, Nature 0.25, Water 0.25, Toxic-inverse 0.15, Terrain 0.05
            </div>
          </div>
          <div className="card card-pad" style={{ marginTop:14 }}>
            <div className="eyebrow" style={{ marginBottom:10 }}>Neighbourhood comparison</div>
            {shown.slice(0, 6).map(([name, v]) => (
              <div key={name} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid var(--hair)", cursor:"pointer" }} onClick={() => setPick([name, v])}>
                <span style={{ width:9, height:9, borderRadius:2, background:scoreColor(v), flex:"none" }} />
                <span style={{ fontSize:13, flex:1 }}>{name}</span>
                <div style={{ width:80, height:5, background:"var(--smoke-2)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ width:v+"%", height:"100%", background:scoreColor(v), borderRadius:3 }} />
                </div>
                <span className="mono" style={{ fontSize:11, minWidth:28 }}>{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
