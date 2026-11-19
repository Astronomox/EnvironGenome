import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import { PageHeader, Segmented, SearchInput } from "../components/kit";
import AiPanel from "../components/AiPanel";
import Term from "../components/Term";
import { sites as initialSites, SEV_COLOR, SEV_LABEL } from "../data/platform";
import { sitesToGeoJSON, download, auditReportHTML } from "../utils/export";

import { useToast } from "../hooks/ToastContext";
import { askGemini } from "../utils/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const today = () => new Date().toISOString().slice(0, 10);

// Map pin. Critical sites (Level 3) get a solid red pin; everything else a
// black outline pin on white. `count` adds a badge when sites are grouped.
function pinIcon(critical, count = 1) {
  const body = critical
    ? `<path d="M16 1.5C8.3 1.5 2.5 7.3 2.5 14.6 2.5 24.4 16 40.5 16 40.5S29.5 24.4 29.5 14.6C29.5 7.3 23.7 1.5 16 1.5z" fill="#C8102E"/><circle cx="16" cy="14.5" r="6" fill="#fff"/>`
    : `<path d="M16 2.5C8.8 2.5 3.5 7.9 3.5 14.6 3.5 23.8 16 39 16 39S28.5 23.8 28.5 14.6C28.5 7.9 23.2 2.5 16 2.5z" fill="#fff" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/><circle cx="16" cy="14.5" r="5" fill="none" stroke="#111" stroke-width="2.6"/>`;
  const badge = count > 1
    ? `<span style="position:absolute;top:-6px;right:-8px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#111;color:#fff;font:600 10.5px/18px Montserrat,system-ui,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff">${count}</span>`
    : "";
  return L.divIcon({
    className: "eg-pin",
    html: `<div style="position:relative;width:32px;height:42px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))"><svg width="32" height="42" viewBox="0 0 32 42" aria-hidden="true">${body}</svg>${badge}</div>`,
    iconSize: [32, 42], iconAnchor: [16, 41], tooltipAnchor: [0, 0],
  });
}

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
    const m = L.marker([s.lat, s.lng], { icon: pinIcon(s.sev === 3), riseOnHover: true, zIndexOffset: s.sev === 3 ? 500 : 0 });
    m.siteId = s.id;
    m.on("click", () => selectSite(s.id, false));
    m.bindTooltip(`L${s.sev}, ${s.name}`, { direction: "top", offset: [0, -34] });
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
      const icon = pinIcon(maxSev === 3, cell.length);
      const m = L.marker([lat, lng], { icon, riseOnHover: true, zIndexOffset: maxSev === 3 ? 500 : 0 });
      m.on("click", () => map.setView([lat, lng], 13));
      m.bindTooltip(cell.length > 1 ? `${cell.length} sites, click to zoom` : `L${cell[0].sev}, ${cell[0].name}`, { direction: "top", offset: [0, -34] });
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
      dropPinRef.current = L.marker([lat, lng], { icon: pinIcon(false), opacity: 0.85 }).addTo(map);
      setTab("submit");
    });
    map.on("zoomend", () => updateClusters(map, sites));
    let cancelled = false;
    setTimeout(() => {
      if (cancelled || mapObj.current !== map) return;
      map.invalidateSize();
      // open on the whole dataset, not just the first site
      if (sites.length > 1) map.fitBounds(sites.map(x => [x.lat, x.lng]), { padding: [40, 40], maxZoom: 13 });
      selectSite(selId, false); updateClusters(map, sites);
    }, 140);
    return () => { cancelled = true; map.remove(); mapObj.current = null; };
  }, []);

  useEffect(() => {
    markersRef.current.forEach(m => {
      const s = sites.find(x => x.id === m.siteId);
      if (!s) return;
      const vis = visible.some(v => v.id === s.id);
      m.setOpacity(vis ? 1 : 0.15);
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
    setAi({ status: "loading", text: "" });
    const s = selected;
    try {
      const t = await askGemini(
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
      <PageHeader eyebrow="Platform" title="Hazard sites"
        sub="Contaminated sites across Lagos from peer-reviewed field studies, rated 0 to 3 by severity.">
        <SearchInput value={q} onChange={setQ} placeholder="Filter sites" />
        <Button variant="outline" onClick={exportGeoJSON}>Export GeoJSON</Button>
        <Button variant="outline" onClick={printReport}>Print report</Button>
        <Button variant={tab === "submit" ? "default" : "outline"} onClick={() => setTab(t => t === "submit" ? "sites" : "submit")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><path d="M12 5v14M5 12h14" /></svg>
          Flag site
        </Button>
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
          <Segmented value={tab} onChange={setTab} className="mb-3.5 w-full" itemClassName="flex-1"
            options={[{ value: "sites", label: `Sites (${visible.length})` }, { value: "submit", label: "Submit new" }]} />

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
                <div className={"sev s" + selected.sev} style={{ whiteSpace: "normal" }}><span className="sq" /><Term name={"Level " + selected.sev}>Level {selected.sev}, {SEV_LABEL[selected.sev]}</Term></div>
                <div className="serif" style={{ fontSize: 19, marginTop: 10 }}>{selected.name}</div>
                <div className="mono" style={{ fontSize: 11.5, color: "var(--graphite)" }}>{selected.sub}</div>
                <div className="site-meta" style={{ marginTop: 12 }}>
                  <b>{selected.coord}</b><br />Reported {selected.date}<br />By {selected.by}
                </div>
                {selected.source && (
                  <div style={{ fontSize:12, lineHeight:1.55, color:"var(--graphite)", marginTop:12, paddingTop:12, borderTop:"1px solid var(--hair)" }}>
                    <b style={{ color:"var(--ink)", fontWeight:600 }}>Source.</b> {selected.source}
                    {selected.doi && <> <a href={selected.doi.startsWith("PMC") ? `https://www.ncbi.nlm.nih.gov/pmc/articles/${selected.doi}/` : `https://doi.org/${selected.doi}`} target="_blank" rel="noreferrer" style={{ color:"var(--army)", textDecoration:"underline" }}>{selected.doi.startsWith("PMC") ? "PubMed Central" : "DOI"}</a></>}
                  </div>
                )}
                {selected.photos && selected.photos.length > 0 && (
                  <div className="site-photos">{selected.photos.map((p, i) => <div className="ph" key={i}>{p}</div>)}</div>
                )}
                <Button style={{ width: "100%", marginTop: 14 }} onClick={draftReport}>
                  <span className="ai-spark">✦</span> Draft audit report
                </Button>
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
                <div className="fg"><Label>Site name</Label><Input value={sub.name} onChange={e => setSub(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Ojota Industrial Belt" /></div>
                <div className="form-grid">
                  <div className="fg"><Label>Latitude</Label><Input value={sub.lat} onChange={e => setSub(p => ({ ...p, lat: e.target.value }))} placeholder="6.5883" /></div>
                  <div className="fg"><Label>Longitude</Label><Input value={sub.lng} onChange={e => setSub(p => ({ ...p, lng: e.target.value }))} placeholder="3.3792" /></div>
                </div>
                <div className="fg"><Label>Substance / contaminant</Label><Input value={sub.substance} onChange={e => setSub(p => ({ ...p, substance: e.target.value }))} placeholder="e.g. Lead and PCB mixture" /></div>
                <div className="fg"><Label>Severity rating</Label>
                  <Segmented value={sub.sev} onChange={s => setSub(p => ({ ...p, sev: s }))} className="w-full" itemClassName="flex-1"
                    options={[0,1,2,3].map(s => ({ value: s, label: `L${s}` }))} />
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--graphite)", marginTop: 6 }}><Term name={"Level " + sub.sev}>{SEV_LABEL[sub.sev]}</Term></div>
                </div>
                <div className="fg"><Label>Reporter name / institution</Label><Input value={sub.reporter} onChange={e => setSub(p => ({ ...p, reporter: e.target.value }))} placeholder="e.g. Jane Okafor, field survey team" /></div>
                <div className="fg"><Label>Notes / observations</Label><Textarea rows={3} value={sub.notes} onChange={e => setSub(p => ({ ...p, notes: e.target.value }))} placeholder="Chain-of-custody notes, containment observations" /></div>
                <div className="fg"><Label>Photo evidence</Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div className="site-photos" style={{ flex: 1, margin: 0 }}><div className="ph" style={{ height: 64 }}>+ Upload</div><div className="ph" style={{ height: 64 }}>+ Upload</div></div>
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--graphite)", marginTop: 4 }}>JPEG, PNG, TIFF. EXIF metadata preserved.</div>
                </div>
                <Button style={{ width: "100%" }} onClick={handleSubmit}>Submit for review</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {ai.status !== "idle" && (
        <><div className="sect-t">Generated audit report</div><AiPanel label="Gemini audit draft" state={ai} onRetry={draftReport} /></>
      )}

    </>
  );
}
