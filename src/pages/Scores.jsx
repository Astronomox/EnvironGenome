import { useState, useMemo } from "react";
import { PageHeader, SearchInput, Segmented } from "../components/kit";
import { districts } from "../data/platform";
import { computeGCS, computeAllGCS } from "../utils/gcs";
import { toCSV, download } from "../utils/export";
import { Button } from "@/components/ui/button";

// Every band takes white text at 4.5:1 or better.
function scoreColor(v) {
  return v >= 80 ? "#1F3B44" : v >= 65 ? "#3E5F68" : v >= 50 ? "#5F7479" : v >= 40 ? "#9A6B4F" : "#A63D2F";
}

function scoreText(v) {
  return "#fff";
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
        <div style={{ height:"100%", width:raw+"%", background: raw<50?"var(--sev3)":"var(--army)", borderRadius:3 }} />
      </div>
    </div>
  );
}

export default function Scores() {
  const computed = useMemo(() => computeAllGCS(districts), []);
  const [pick, setPick] = useState(computed[0] || null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("score");

  const detail = useMemo(() => pick ? computeGCS(pick[0]) : null, [pick]);


  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    let d = computed.filter(([n]) => !term || n.toLowerCase().includes(term));
    if (sort === "score") d = [...d].sort((a, b) => b[1] - a[1]);
    else d = [...d].sort((a, b) => a[0].localeCompare(b[0]));
    return d;
  }, [q, sort, computed]);

  function exportScores() {
    const cols = [{ key:"name", label:"District" }, { key:"score", label:"GCS Score (0-100)" }, { key:"grade", label:"Grade" }];
    const rows = shown.map(([name, v, hist]) => ({ name, score: v, grade: v >= 80 ? "Optimal" : v >= 50 ? "Moderate" : "Poor" }));
    download(toCSV(rows, cols), "envirogenome-district-scores.csv", "text/csv");
  }

  function printScores() {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>EnviroGenome District Scores</title>
    <style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;} h1{font-size:22px;} table{width:100%;border-collapse:collapse;} th{text-align:left;border-bottom:2px solid #000;padding:8px;font-family:monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;} td{padding:8px;border-bottom:1px solid #ddd;} .score{font-weight:bold;} .foot{font-family:monospace;font-size:10px;color:#888;margin-top:24px;}</style>
    </head><body><h1>EnviroGenome Guardian</h1><p style="font-family:monospace;font-size:12px;color:#666;">Global Classification Score, District Report, ${new Date().toISOString().slice(0,10)}</p>
    <table><thead><tr><th>District</th><th>GCS Score</th><th>Grade</th><th>Trend</th></tr></thead><tbody>
    ${shown.map(([n,v]) => `<tr><td>${n}</td><td class="score">${v}%</td><td>${v>=80?"Optimal":v>=65?"Good":v>=50?"Moderate":v>=40?"Poor":"Critical"}</td><td>${v>=70?"Improving":v>=50?"Stable":"Declining"}</td></tr>`).join("")}
    </tbody></table><div class="foot">EnviroGenome Guardian</div></body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }

  return (
    <>
      <PageHeader eyebrow="Platform" title="District risk scores"
        sub="A composite exposure-risk grade for each Lagos district, from air quality, water purity, toxic exposure, natural features and terrain. Higher is safer.">
        <SearchInput value={q} onChange={setQ} placeholder="Find a district" />
        <Segmented value={sort} onChange={setSort}
          options={[{ value:"score", label:"By score" }, { value:"name", label:"A to Z" }]} />
        <Button variant="outline" onClick={exportScores}>Export CSV</Button>
        <Button variant="outline" onClick={printScores}>Print report</Button>
      </PageHeader>

      {shown.length === 0 && (
        <div className="empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20V10M10 20V4M16 20v-8" /></svg>
          No district data loaded.
        </div>
      )}

      {shown.length > 0 && (
      <div className="grid g2" style={{ alignItems:"start" }}>
        {/* grid + sparklines */}
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:14 }}>District grades ({shown.length})</div>
          <div className="scoregrid">
            {shown.map(([name, v]) => (
              <div key={name} className={"scell" + (pick && pick[0] === name ? " sel" : "")}
                style={{ background:scoreColor(v), color:scoreText(v) }} onClick={() => setPick([name, v])}>
                <span className="v">{v}</span><span className="n">{name}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:14, marginTop:18, flexWrap:"wrap", fontFamily:"var(--mono)", fontSize:10, color:"var(--graphite)" }}>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#1F3B44" }} />80 to 100 optimal</span>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#5F7479" }} />50 to 79 moderate</span>
            <span className="row" style={{ gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#A63D2F" }} />0 to 49 poor</span>
          </div>
        </div>

        {/* detail breakdown */}
        <div>
          <div className="card card-pad">
            <div className="eyebrow" style={{ marginBottom:6 }}>Composite breakdown</div>
            <div className="row" style={{ gap:10, marginBottom:18 }}>
              <div className="serif" style={{ fontSize:26 }}>{pick ? pick[0] : "--"}</div>
              {pick && (
                <div style={{ width:40, height:40, borderRadius:8, background:scoreColor(pick[1]), display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"var(--serif)", fontSize:17, color:scoreText(pick[1]) }}>{pick[1]}</span>
                </div>
              )}
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
      )}

    </>
  );
}

