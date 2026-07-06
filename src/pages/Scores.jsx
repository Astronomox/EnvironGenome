import { useState, useMemo } from "react";
import { PageHeader, SearchInput, Segmented } from "../components/ui";
import { districts, scoreBreakdown } from "../data/platform";

function scoreColor(v) {
  return v >= 80 ? "#2f9e44" : v >= 65 ? "#5a7d3a" : v >= 50 ? "#8a8a83" : v >= 40 ? "#c77b3a" : "#D8442C";
}

export default function Scores() {
  const [pick, setPick] = useState(districts[3]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("score");

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    let d = districts.filter(([n]) => !term || n.toLowerCase().includes(term));
    if (sort === "score") d = [...d].sort((a, b) => b[1] - a[1]);
    else d = [...d].sort((a, b) => a[0].localeCompare(b[0]));
    return d;
  }, [q, sort]);

  return (
    <>
      <PageHeader eyebrow="Habitability" title="Global classification score"
        sub="Composite district grades blending air quality, natural features and toxic-exposure probability.">
        <SearchInput value={q} onChange={setQ} placeholder="Find a district" />
        <Segmented value={sort} onChange={setSort}
          options={[{ value: "score", label: "By score" }, { value: "name", label: "A to Z" }]} />
      </PageHeader>

      <div className="grid g2" style={{ alignItems: "start" }}>
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 14 }}>District grades ({shown.length})</div>
          <div className="scoregrid">
            {shown.map(([name, v]) => (
              <div key={name} className={"scell" + (pick[0] === name ? " sel" : "")} style={{ background: scoreColor(v) }} onClick={() => setPick([name, v])}>
                <span className="v">{v}</span><span className="n">{name}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 18, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 10, color: "var(--graphite)" }}>
            <span className="row" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#2f9e44" }} />80 to 100 optimal</span>
            <span className="row" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#8a8a83" }} />50 to 79 moderate</span>
            <span className="row" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#D8442C" }} />0 to 49 poor</span>
          </div>
        </div>

        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 6 }}>Composite breakdown</div>
          <div className="serif" style={{ fontSize: 22, marginBottom: 16 }}>{pick[0]} <span className="mono" style={{ fontSize: 13, color: "var(--graphite)" }}>{pick[1]}%</span></div>
          {scoreBreakdown.map(([l, v]) => (
            <div className="scorebar" key={l}>
              <div className="lab"><span>{l}</span><span>{v}%</span></div>
              <div className={"meter" + (v < 50 ? " r" : "")}><i style={{ width: v + "%" }} /></div>
            </div>
          ))}
          <div style={{ fontSize: 13, color: "var(--graphite)", marginTop: 16, lineHeight: 1.6 }}>
            Weighted composite reflects proximity to the Ojota industrial belt (Level 3) offset by terrain stability and moderate air readings. Click any district to inspect.
          </div>
        </div>
      </div>
    </>
  );
}
