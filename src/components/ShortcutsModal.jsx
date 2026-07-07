import { useEffect } from "react";
import { MODULES } from "../data/modules";

export default function ShortcutsModal({ open, setOpen }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "?" && !e.ctrlKey && !e.metaKey) setOpen(o => !o); if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setOpen]);

  if (!open) return null;
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && setOpen(false)}>
      <div className="modal" style={{ maxWidth: 520 }}>
        <h3>Keyboard shortcuts</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px", marginBottom: 20 }}>
          {[
            ["⌘ K", "Open command palette"],
            ["?", "Toggle this modal"],
            ["Esc", "Close any modal"],
            ["1 to 8", "Navigate modules"],
          ].map(([k, l]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--hair)" }}>
              <span style={{ fontSize: 13.5 }}>{l}</span>
              <kbd style={{ fontFamily: "var(--mono)", fontSize: 11, border: "1px solid var(--hair-2)", borderRadius: 5, padding: "2px 7px", background: "var(--smoke)" }}>{k}</kbd>
            </div>
          ))}
        </div>
        <div className="sect-t" style={{ marginTop: 0 }}>Module shortcuts</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
          {MODULES.map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--hair)" }}>
              <span style={{ fontSize: 13 }}>{m.label}</span>
              <kbd style={{ fontFamily: "var(--mono)", fontSize: 11, border: "1px solid var(--hair-2)", borderRadius: 5, padding: "2px 7px", background: "var(--smoke)" }}>{i + 1}</kbd>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost" style={{ width: "100%", marginTop: 18 }} onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
}
