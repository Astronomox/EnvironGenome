import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import { PageHeader, Segmented, SearchInput } from "../components/ui";
import AiPanel from "../components/AiPanel";
import { sites as initialSites, SEV_COLOR, SEV_LABEL, siteHistory } from "../data/platform";
import { sitesToGeoJSON, download, auditReportHTML } from "../utils/export";

const MONTHS = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"];

function TimeSlider({ siteId, siteName }) {
  const [pos, setPos] = useState(11);
  const hist = siteHistory[siteId] || [];
  const val = hist[pos] ?? 0;
  return (
    <div>
      <div style={{ display:"flex", gap:4, alignItems:"flex-end", height:60, marginBottom:8 }}>
        {hist.map((v, i) => (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }} onClick={() => setPos(i)}>
            <div style={{ width:"100%", background: i===pos ? SEV_COLOR[v] : "var(--smoke-2)", borderRadius:"3px 3px 0 0",
              height: (v+1)/4*48+"px", transition:"height .25s, background .2s",
              border: i===pos ? `2px solid ${SEV_COLOR[v]}` : "none" }} />
          </div>
        ))}
      </div>
      <input type="range" min={0} max={11} value={pos} onChange={e => setPos(+e.target.value)}
        style={{ width:"100%", accentColor:"var(--ink)" }} />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
        {MONTHS.map((m, i) => (
          <span key={m} className="mono" style={{ fontSize:9, color: i===pos ? "var(--ink)" : "var(--graphite)", fontWeight: i===pos ? 600 : 400 }}>{m}</span>
        ))}
      </div>
      <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10 }}>
        <div className={"sev s"+val}><span className="sq" />Level {val}</div>
        <span style={{ fontSize:13, color:"var(--graphite)" }}>{siteName} in {MONTHS[pos]} 2025-26: <b>{SEV_LABEL[val]}</b></span>
      </div>
    </div>
  );
}
import { useKey } from "../hooks/KeyContext";
import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";

const today = () => new Date().toISOString().slice(0, 10);

export default function MapView() {
  const mapEl = useRef(null);
  const mapObj = useRef(null);
  const markersRef = useRef([]);
  const dropPinRef = useRef(null);
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(-1);
  const [q, setQ] = useState("");
  const initId = parseInt(params.get("site") ?? "0", 10);
  const [selId, setSelId] = useState(Number.isNaN(initId) ? 0 : initId);
  const { key, openKey } = useKey();
  const toast = useToast();
  const [ai, setAi] = useState({ status: "idle", text: "" });
  const [sites, setSites] = useState(initialSites);
  const [tab, setTab] = useState("sites"); // sites | submit
  const [sub, setSub] = useState({ name: "", substance: "", sev: 1, lat: "", lng: "", reporter: "", notes: "" });

  const selected = sites.find(s => s.id === selId) || sites[0];

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sites.filter(s =>
      (filter < 0 || s.sev === filter) &&
      (!term || s.name.toLowerCase().includes(term) || s.sub.toLowerCase().includes(term)));
  }, [filter, q, sites]);

  const addMarkerToMap = useCallback((s) => {
    if (!mapObj.current) return;
    const r = s.sev === 3 ? 14 : s.sev === 2 ? 11 : s.sev === 1 ? 9 : 7;
    const m = L.circleMarker([s.lat, s.lng], { radius: r, fillColor: SEV_COLOR[s.sev], color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.92 });
    m.siteId = s.id;
    m.on("click", () => selectSite(s.id, false));
    m.bindTooltip(`L${s.sev}, ${s.name}`, { direction: "top", offset: [0, -8] });
    m.addTo(mapObj.current);
    markersRef.current.push(m);
  }, []);

  const clusterLayerRef = useRef(null);

  function updateClusters(map, visibleSites) {
    const zoom = map.getZoom();
    // at zoom >= 13 show individual markers; below that show cluster circles
    if (zoom >= 13) {
      if (clusterLayerRef.current) { map.removeLayer(clusterLayerRef.current); clusterLayerRef.current = null; }
      markersRef.current.forEach(m => { if (!map.hasLayer(m)) m.addTo(map); });
      return;
    }
    // hide individual markers
    markersRef.current.forEach(m => { if (map.hasLayer(m)) map.removeLayer(m); });
    if (clusterLayerRef.current) { map.removeLayer(clusterLayerRef.current); }
    // simple grid clustering: 0.05 degree cells
    const cells = {};
    visibleSites.forEach(s => {
      const ck = `${Math.floor(s.lat / 0.05)}_${Math.floor(s.lng / 0.05)}`;
      if (!cells[ck]) cells[ck] = [];
      cells[ck].push(s);
    });
    const group = L.layerGroup();
    Object.values(cells).forEach(cell => {
      const lat = cell.reduce((a, s) => a + s.lat, 0) / cell.length;
      const lng = cell.reduce((a, s) => a + s.lng, 0) / cell.length;
      const maxSev = Math.max(...cell.map(s => s.sev));
      const r = Math.min(22, 12 + cell.length * 2);
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:${r*2}px;height:${r*2}px;border-radius:50%;background:${SEV_COLOR[maxSev]};border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:11px;font-weight:600;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.25)">${cell.length}</div>`,
        iconSize: [r * 2, r * 2], iconAnchor: [r, r]
      });
      const m = L.marker([lat, lng], { icon });
      m.on("click", () => map.setView([lat, lng], 13));
      m.bindTooltip(`${cell.length} site${cell.length > 1 ? "s" : ""}, click to zoom`, { direction: "top" });
      group.addLayer(m);
    });
    group.addTo(map);
    clusterLayerRef.current = group;
  }

  useEffect(() => {
    if (mapObj.current || !mapEl.current) return;
    const map = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false }).setView([6.52, 3.38], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "OpenStreetMap contributors" }).addTo(map);
    mapObj.current = map;
    sites.forEach(s => addMarkerToMap(s));
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setSub(p => ({ ...p, lat: lat.toFixed(5), lng: lng.toFixed(5) }));
      if (dropPinRef.current) map.removeLayer(dropPinRef.current);
      dropPinRef.current = L.circleMarker([lat, lng], {
        radius: 10, fillColor: "#D8442C", color: "#fff", weight: 2.5, opacity: 1, fillOpacity: 0.7
      }).addTo(map);
      setTab("submit");
    });
    map.on("zoomend", () => updateClusters(map, sites));
    setTimeout(() => { map.invalidateSize(); selectSite(selId, true); updateClusters(map, sites); }, 140);
    return () => { map.remove(); mapObj.current = null; };
  }, []);

  useEffect(() => {
    markersRef.current.forEach(m => {
      const s = sites.find(x => x.id === m.siteId);
      if (!s) return;
      const vis = visible.some(v => v.id === s.id);
      m.setStyle({ opacity: vis ? 1 : 0.12, fillOpacity: vis ? 0.92 : 0.08 });
    });
  }, [visible, sites]);

  function selectSite(id, pan) {
    setSelId(id);
    setTab("sites");
    const s = sites.find(x => x.id === id);
    if (pan && mapObj.current && s) mapObj.current.panTo([s.lat, s.lng], { animate: true, duration: 0.5 });
  }

  function handleSubmit() {
    if (!sub.name.trim() || !sub.lat || !sub.lng) { toast("Name and coordinates required. Click the map to set a pin."); return; }
    const id = sites.length + Math.floor(Math.random() * 1000);
    const newSite = {
      id, lat: parseFloat(sub.lat), lng: parseFloat(sub.lng), sev: sub.sev,
      name: sub.name, coord: `${sub.lat} N, ${sub.lng} E`, sub: sub.substance || "Unspecified",
      by: sub.reporter || "Anonymous", date: today(), status: "Pending verification"
    };
    setSites(prev => [...prev, newSite]);
    addMarkerToMap(newSite);
    if (dropPinRef.current) { mapObj.current.removeLayer(dropPinRef.current); dropPinRef.current = null; }
    setSub({ name: "", substance: "", sev: 1, lat: "", lng: "", reporter: "", notes: "" });
    setSelId(id);
    setTab("sites");
    toast(`Site "${newSite.name}" submitted for review (ref #EG-${id})`);
  }

  async function draftReport() {
    if (!key) { openKey(); return; }
    setAi({ status: "loading", text: "" });
    const s = selected;
    try {
      const t = await askGemini(key,
        `Draft a concise environmental audit report for a hazard site, suitable for a legal filing. Site: ${s.name}. Coordinates: ${s.coord}. Substance: ${s.sub}. Severity: Level ${s.sev} (${SEV_LABEL[s.sev]}). Reported by: ${s.by} on ${s.date}. Status: ${s.status}. Under 180 words with these sections in plain prose: Summary, Findings, Recommended action, Regulatory reference (cite a relevant Nigerian standard such as NESREA effluent regulations). Bold each section label with **label**.`);
      setAi({ status: "done", text: t }); toast("Audit report drafted");
    } catch (e) { setAi({ status: "error", text: e.message }); }
  }

  function exportGeoJSON() {
    download(sitesToGeoJSON(sites), "envirogenome-lagos-sites.geojson", "application/json");
    toast("GeoJSON downloaded");
  }

  function printReport() {
    if (ai.status !== "done") { toast("Draft an audit report first, then print"); return; }
    const html = auditReportHTML(selected, ai.text);
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }

  return (
    <>
      <PageHeader eyebrow="Field intelligence" title="Geolocation hazard map"
        sub="Geotagged hazard submissions across metropolitan Lagos, rated 0 to 3.">
        <SearchInput value={q} onChange={setQ} placeholder="Filter sites" />
        <button className="btn btn-ghost" onClick={exportGeoJSON}>Export GeoJSON</button>
        <button className="btn btn-ghost" onClick={printReport}>Print report</button>
        <button className={"btn " + (tab === "submit" ? "btn-dark" : "btn-ghost")} onClick={() => setTab(t => t === "submit" ? "sites" : "submit")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><path d="M12 5v14M5 12h14" /></svg>
          Flag site
        </button>
      </PageHeader>

      <div className="maplayout">
        <div className="mapwrap">
          <div className="map-toolbar">
            <Segmented value={filter} onChange={setFilter}
              options={[{ value: -1, label: "All" }, { value: 0, label: "L0" }, { value: 1, label: "L1" }, { value: 2, label: "L2" }, { value: 3, label: "L3" }]} />
            <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--graphite)" }}>
              {tab === "submit" ? "Click map to drop pin" : `OSM, Lagos, ${visible.length} shown`}
            </span>
          </div>
          <div ref={mapEl} className="leafmap" />
        </div>

        <div>
          {/* tab toggle */}
          <div className="seg" style={{ width: "100%", marginBottom: 14 }}>
            <button className={tab === "sites" ? "on" : ""} style={{ flex: 1 }} onClick={() => setTab("sites")}>Sites ({visible.length})</button>
            <button className={tab === "submit" ? "on" : ""} style={{ flex: 1 }} onClick={() => setTab("submit")}>Submit new</button>
          </div>

          {tab === "sites" ? (
            <>
              <div className="site-list">
                {visible.map(s => (
                  <div key={s.id} className={"site-li" + (s.id === selId ? " sel" : "")} onClick={() => selectSite(s.id, true)}>
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
            </>
          ) : (
            <div className="card card-pad">
              <div className="eyebrow" style={{ marginBottom: 14 }}>Flag new hazard site</div>
              <div className="anon-note" style={{ marginBottom: 14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                Click anywhere on the map to set coordinates, or enter them manually.
              </div>
              <div className="stack" style={{ gap: 12 }}>
                <div className="fg"><label>Site name</label><input value={sub.name} onChange={e => setSub(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Ojota Industrial Belt" /></div>
                <div className="form-grid">
                  <div className="fg"><label>Latitude</label><input value={sub.lat} onChange={e => setSub(p => ({ ...p, lat: e.target.value }))} placeholder="6.5883" /></div>
                  <div className="fg"><label>Longitude</label><input value={sub.lng} onChange={e => setSub(p => ({ ...p, lng: e.target.value }))} placeholder="3.3792" /></div>
                </div>
                <div className="fg"><label>Substance / contaminant</label><input value={sub.substance} onChange={e => setSub(p => ({ ...p, substance: e.target.value }))} placeholder="e.g. Lead and PCB mixture" /></div>
                <div className="fg"><label>Severity rating</label>
                  <div className="seg" style={{ width: "100%" }}>
                    {[0,1,2,3].map(s => <button key={s} className={sub.sev === s ? "on" : ""} style={{ flex: 1 }} onClick={() => setSub(p => ({ ...p, sev: s }))}>{`L${s}`}</button>)}
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--graphite)", marginTop: 6 }}>{SEV_LABEL[sub.sev]}</div>
                </div>
                <div className="fg"><label>Reporter name / institution</label><input value={sub.reporter} onChange={e => setSub(p => ({ ...p, reporter: e.target.value }))} placeholder="e.g. Dr. Adebayo, UNILAG" /></div>
                <div className="fg"><label>Notes / observations</label><textarea rows={3} value={sub.notes} onChange={e => setSub(p => ({ ...p, notes: e.target.value }))} placeholder="Chain-of-custody notes, containment observations" /></div>
                <div className="fg"><label>Photo evidence</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div className="site-photos" style={{ flex: 1, margin: 0 }}><div className="ph" style={{ height: 64 }}>+ Upload</div><div className="ph" style={{ height: 64 }}>+ Upload</div></div>
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--graphite)", marginTop: 4 }}>JPEG, PNG, TIFF. EXIF metadata preserved.</div>
                </div>
                <button className="btn btn-dark" style={{ width: "100%" }} onClick={handleSubmit}>Submit for review</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {ai.status !== "idle" && (
        <><div className="sect-t">Generated audit report</div><AiPanel label="Gemini audit draft" state={ai} /></>
      )}

      <div className="sect-t">Site severity history (12 months)</div>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom:10 }}>Playback slider for {selected.name}</div>
        <TimeSlider siteId={selected.id} siteName={selected.name} />
      </div>
    </>
  );
}
