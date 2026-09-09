// Notification state now lives in Layout.jsx (the single source of truth for
// both the panel content and the bell's red dot, so they can't drift out of
// sync the way the old hardcoded `unread = 3` did). This file just renders
// what it's given.
export const initialNotifs = [
  { id: 1, type: "info", text: "Welcome to EnviroGenome Guardian. This is a coursework demo build.", time: "now", unread: true },
];

export default function NotifPanel({ open, setOpen, items, onMarkAll, onDismiss }) {
  const unread = items.filter(n => n.unread).length;

  if (!open) return null;
  return (
    <>
      <div style={{ position:"fixed", inset:0, zIndex:55 }} onClick={() => setOpen(false)} />
      <div style={{ position:"fixed", top:64, right:20, zIndex:60, width:340, background:"var(--paper)", border:"1px solid var(--hair-2)", borderRadius:14, boxShadow:"0 12px 48px rgba(10,10,10,.18)", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid var(--hair)" }}>
          <div style={{ fontWeight:500, fontSize:14 }}>Notifications {unread > 0 && <span style={{ fontFamily:"var(--mono)", fontSize:10, background:"var(--sev3)", color:"var(--paper)", borderRadius:10, padding:"1px 6px", marginLeft:6 }}>{unread}</span>}</div>
          <div style={{ display:"flex", gap:8 }}>
            {unread > 0 && <button className="btn btn-ghost" style={{ height:28, fontSize:11, padding:"0 10px" }} onClick={onMarkAll}>Mark all read</button>}
            <button className="btn btn-ghost" style={{ height:28, fontSize:11, padding:"0 10px" }} onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
        <div style={{ maxHeight:380, overflowY:"auto" }}>
          {items.length === 0 ? (
            <div style={{ padding:"30px 20px", textAlign:"center", color:"var(--mute)", fontSize:13 }}>All caught up.</div>
          ) : items.map(n => (
            <div key={n.id} style={{ display:"flex", gap:10, padding:"12px 16px", borderBottom:"1px solid var(--hair)", background: n.unread ? "var(--smoke)" : "var(--panel)", transition:"background .2s" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:n.unread ? (n.type==="alert"?"var(--sev3)":"var(--ink)") : "transparent", border:`1px solid ${n.unread?(n.type==="alert"?"var(--sev3)":"var(--ink)"):"var(--hair)"}`, marginTop:5, flex:"none" }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, lineHeight:1.5 }}>{n.text}</div>
                <div className="mono" style={{ fontSize:10.5, color:"var(--graphite)", marginTop:3 }}>{n.time}</div>
              </div>
              <button style={{ fontSize:16, color:"var(--graphite)", lineHeight:1, flex:"none" }} onClick={() => onDismiss(n.id)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
