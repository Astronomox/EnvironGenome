import { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import { PageHeader, Segmented, SearchInput } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { sites, SEV_COLOR, SEV_LABEL } from "../data/platform";
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

export default function MapView() {
  const mapEl = useRef(null);
  const mapObj = useRef(null);
  const markers = useRef([]);
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(-1);
  const [q, setQ] = useState("");
  const initId = parseInt(params.get("site") ?? "0", 10);
  const [selId, setSelId] = useState(Number.isNaN(initId) ? 0 : initId);
  const { key, openKey } = useKey();
  const toast = useToast();
  const [ai, setAi] = useState({ status: "idle", text: "" });

  const selected = sites.find(s => s.id === selId) || sites[0];

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sites.filter(s =>
      (filter < 0 || s.sev === filter) &&
      (!term || s.name.toLowerCase().includes(term) || s.sub.toLowerCase().includes(term)));
  }, [filter, q]);

  useEffect(() => {
    if (mapObj.current || !mapEl.current) return;
    const map = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false }).setView([6.52, 3.38], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(map);
    mapObj.current = map;
    markers.current = sites.map(s => {
      const r = s.sev === 3 ? 14 : s.sev === 2 ? 11 : s.sev === 1 ? 9 : 7;
      const m = L.circleMarker([s.lat, s.lng], { radius: r, fillColor: SEV_COLOR[s.sev], color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.92 });
      m.siteId = s.id;
      m.on("click", () => select(s.id, false));
      m.bindTooltip(`L${s.sev}, ${s.name}`, { direction: "top", offset: [0, -8] });
      m.addTo(map);
      return m;
    });
    setTimeout(() => { map.invalidateSize(); select(selId, true); }, 140);
    return () => { map.remove(); mapObj.current = null; };
  }, []);

  useEffect(() => {
    markers.current.forEach(m => {
      const s = sites[m.siteId];
      const vis = visible.some(v => v.id === s.id);
      m.setStyle({ opacity: vis ? 1 : 0.12, fillOpacity: vis ? 0.92 : 0.08 });
    });
  }, [visible]);

  function select(id, pan) {
    setSelId(id);
    const s = sites.find(x => x.id === id);
    if (pan && mapObj.current && s) mapObj.current.panTo([s.lat, s.lng], { animate: true, duration: 0.5 });
  }

  async function draftReport() {
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    const s = selected;
    try {
      const t = await askGemini(key,
        `Draft a concise environmental audit report for a hazard site, suitable for a legal filing. Site: ${s.name}. Coordinates: ${s.coord}. Substance: ${s.sub}. Severity: Level ${s.sev} (${SEV_LABEL[s.sev]}). Reported by: ${s.by} on ${s.date}. Status: ${s.status}. Under 180 words with these sections in plain prose: Summary, Findings, Recommended action, Regulatory reference (cite a relevant Nigerian standard such as NESREA effluent regulations). Bold each section label with **label**.`);
      setAi({ status: "done", text: t });
      toast("Audit report drafted");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  return (
    <>
      <PageHeader eyebrow="Field intelligence" title="Geolocation hazard map"
        sub="Geotagged hazard submissions across metropolitan Lagos, rated 0 to 3.">
        <SearchInput value={q} onChange={setQ} placeholder="Filter sites" />
      </PageHeader>

      <div className="maplayout">
        <div className="mapwrap">
          <div className="map-toolbar">
            <Segmented value={filter} onChange={setFilter}
              options={[{ value: -1, label: "All" }, { value: 0, label: "L0" }, { value: 1, label: "L1" }, { value: 2, label: "L2" }, { value: 3, label: "L3" }]} />
            <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--graphite)" }}>OSM, Lagos, {visible.length} shown</span>
          </div>
          <div ref={mapEl} className="leafmap" />
        </div>

        <div>
          <div className="site-list">
            {visible.map(s => (
              <div key={s.id} className={"site-li" + (s.id === selId ? " sel" : "")} onClick={() => select(s.id, true)}>
                <span className="dot" style={{ background: SEV_COLOR[s.sev] }} />
                <div style={{ minWidth: 0 }}>
                  <div className="t">{s.name}</div>
                  <div className="s">{s.sub}</div>
                </div>
                <span className="mono" style={{ marginLeft: "auto", fontSize: 10, color: "var(--graphite)" }}>L{s.sev}</span>
              </div>
            ))}
          </div>

          <div className="card card-pad" style={{ marginTop: 14 }}>
            <div className={"sev s" + selected.sev}><span className="sq" />Level {selected.sev}, {SEV_LABEL[selected.sev]}</div>
            <div className="serif" style={{ fontSize: 19, marginTop: 10 }}>{selected.name}</div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--graphite)" }}>{selected.sub}</div>
            <div className="site-meta" style={{ marginTop: 12 }}>
              <b>{selected.coord}</b><br />Reported {selected.date}<br />By {selected.by}<br />Status: <b>{selected.status}</b>
            </div>
            <div className="site-photos"><div className="ph">IMG 01</div><div className="ph">IMG 02</div><div className="ph">EXIF ok</div></div>
            <button className="btn btn-dark" style={{ width: "100%", marginTop: 14 }} onClick={draftReport}>
              <span className="ai-spark">✦</span> Draft audit report
            </button>
          </div>
        </div>
      </div>

      {ai.status !== "idle" && (
        <><div className="sect-t">Generated audit report</div><AiPanel label="Gemini audit draft" state={ai} /></>
      )}
    </>
  );
}
