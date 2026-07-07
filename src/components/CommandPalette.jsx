import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MODULES } from "../data/modules";
import { contaminants } from "../data/contaminants";
import { sites } from "../data/platform";
import { standards } from "../data/platform";

// build a flat searchable index
function buildIndex() {
  const idx = [];
  MODULES.forEach(m => idx.push({
    group: "Modules", label: m.title, sub: "Go", path: m.path, icon: m.icon, key: "m-" + m.id
  }));
  contaminants.forEach(c => idx.push({
    group: "Contaminants", label: c.name, sub: "CAS " + c.cas, path: "/app/registry?q=" + encodeURIComponent(c.name),
    icon: "M4 4h16v4H4zM4 10h16v10H4z", key: "c-" + c.cas,
    preview: `<b>${c.formula}</b> / CAS ${c.cas}<br>${c.iarc}<br>${c.genotoxic ? "<span style='color:var(--sev3)'>Genotoxic</span>" : "Non-genotoxic"}<br><br>${c.mutations[0] ? c.mutations[0][2] : ""}`
  }));
  sites.forEach(s => idx.push({
    group: "Hazard sites", label: s.name, sub: "Level " + s.sev, path: "/app/map?site=" + s.id,
    icon: "M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z", key: "s-" + s.id,
    preview: `<b>${["L0","L1","L2","L3"][s.sev]}</b> ${["Baseline","Minor","Moderate","<span style='color:var(--sev3)'>Severe</span>"][s.sev]}<br>${s.sub}<br>${s.coord}<br>By ${s.by}<br>${s.date}`
  }));
  standards.forEach((s, i) => idx.push({
    group: "Standards", label: s.t, sub: s.tier, path: "/app/standards?q=" + encodeURIComponent(s.t.slice(0, 12)),
    icon: "M6 3h9l3 3v15H6z", key: "st-" + i,
    preview: `<b>${s.tier}</b><br>${s.body}<br>${s.tag}`
  }));
  return idx;
}

export default function CommandPalette({ open, setOpen }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.filter(i => i.group === "Modules");
    return index.filter(i =>
      i.label.toLowerCase().includes(term) || i.sub.toLowerCase().includes(term)
    ).slice(0, 24);
  }, [q, index]);

  // group results in order
  const grouped = useMemo(() => {
    const order = ["Modules", "Contaminants", "Hazard sites", "Standards"];
    const g = {};
    results.forEach(r => { (g[r.group] = g[r.group] || []).push(r); });
    const flat = [];
    order.forEach(grp => (g[grp] || []).forEach(r => flat.push(r)));
    return { g, order, flat };
  }, [results]);

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => {
    if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);

  function go(item) {
    if (!item) return;
    setOpen(false);
    nav(item.path);
  }

  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, grouped.flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(grouped.flat[active]); }
    else if (e.key === "Escape") { setOpen(false); }
  }

  if (!open) return null;

  let running = -1;
  return (
    <div className="cmd-bg" onClick={e => e.target === e.currentTarget && setOpen(false)}>
      <div className="cmd" onKeyDown={onKey}>
        <div className="cmd-in">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search modules, contaminants, sites, standards" />
          <span className="esc">ESC</span>
        </div>
        <div style={{ display:"flex", minHeight:0 }}>
          <div className="cmd-results" style={{ flex:1, minWidth:0 }}>
            {grouped.flat.length === 0 ? (
              <div className="cmd-empty">No matches for "{q}"</div>
            ) : (
              grouped.order.map(grp => {
                const items = grouped.g[grp];
                if (!items || !items.length) return null;
                return (
                  <div key={grp}>
                    <div className="cmd-grp">{grp}</div>
                    {items.map(item => {
                      running += 1;
                      const isOn = running === active;
                      return (
                        <div key={item.key} className={"cmd-item" + (isOn ? " on" : "")}
                          onMouseEnter={() => setActive(grouped.flat.indexOf(item))}
                          onClick={() => go(item)}>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                          <span className="ci-t">{item.label}</span>
                          <span className="ci-s">{item.sub}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
          {grouped.flat[active] && grouped.flat[active].preview && (
            <div style={{ width:220, borderLeft:"1px solid var(--hair)", padding:"16px 14px", background:"var(--smoke)", flexShrink:0 }}>
              <div className="eyebrow" style={{ marginBottom:10 }}>Preview</div>
              <div style={{ fontSize:12.5, lineHeight:1.6, color:"var(--graphite)" }}
                dangerouslySetInnerHTML={{ __html: grouped.flat[active].preview }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
