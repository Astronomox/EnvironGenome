import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { MODULES } from "../data/modules";
import CommandPalette from "./CommandPalette";
import ShortcutsModal from "./ShortcutsModal";
import NotifPanel, { initialNotifs } from "./NotifPanel";
import Onboarding from "./Onboarding";

const Logo = ({ light }) => (
  <svg className="mark" viewBox="0 0 26 26" fill="none" stroke={light ? "#FAFAF8" : "#0A0A0A"} strokeWidth="1.6">
    <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
    <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
  </svg>
);

export default function Layout() {
  const nav = useNavigate();
  const loc = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifs);
  const unread = notifs.filter(n => n.unread).length;
  const markAllNotifs = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  const dismissNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));
  const [contrast, setContrast] = useState(false);
  const [showOnboard] = useState(() => {
    try { return !localStorage.getItem("eg_onboarded"); } catch { return false; }
  });
  const [onboarded, setOnboarded] = useState(!showOnboard);

  // apply high contrast class to root
  if (contrast) document.documentElement.style.setProperty("--paper","#fff");
  else document.documentElement.style.removeProperty("--paper");

  const current = MODULES.find(m =>
    m.path === loc.pathname || (m.id !== "home" && loc.pathname.startsWith(m.path))
  ) || MODULES[0];

  // Cmd+K, ?, and number key navigation
  useEffect(() => {
    const h = (e) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen(o => !o); }
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) setShortcutsOpen(o => !o);
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= MODULES.length && !e.metaKey && !e.ctrlKey) nav(MODULES[num - 1].path);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nav]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand" onClick={() => nav("/")}>
          <Logo />
          <span className="brand-name">Enviro<em>Genome</em></span>
        </div>
        <div className="side-sect">Platform</div>
        {MODULES.map((m, i) => (
          <NavLink key={m.id} to={m.path} end={m.id === "home"}
            className={({ isActive }) => "side-link" + (isActive ? " on" : "")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon} /></svg>
            {m.label}
            <span className="kbd">{i + 1}</span>
          </NavLink>
        ))}
        <div className="side-foot">
          Demo build v4.1.32<br />Coursework project<br />
          <button style={{ marginTop:6, fontFamily:"var(--mono)", fontSize:10, color:"var(--mute)", cursor:"pointer", display:"block" }}
            onClick={() => setShortcutsOpen(true)}>? Shortcuts</button>
          <button style={{ marginTop:4, fontFamily:"var(--mono)", fontSize:10, color:"var(--mute)", cursor:"pointer", display:"block" }}
            onClick={() => setContrast(c => !c)}>{contrast ? "Standard contrast" : "High contrast"}</button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <span className="crumb">{current.eyebrow} / <b>{current.title}</b></span>
          <span className="spacer" />
          <button className="cmd-trigger" onClick={() => setCmdOpen(true)} aria-label="Open search palette">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <span>Search everything</span>
            <span className="kbd">⌘K</span>
          </button>
          <button className="btn-key" onClick={() => setNotifOpen(o => !o)} style={{ position:"relative" }} aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width:16, height:16 }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {unread > 0 && <span style={{ position:"absolute", top:5, right:5, width:7, height:7, borderRadius:"50%", background:"var(--sev3)", border:"1.5px solid var(--paper)" }} />}
          </button>
        </header>

        <main className="content" id="main-content" role="main" aria-label={current.title}>
          <div className="pagewrap"><Outlet /></div>
        </main>
      </div>

      <nav className="glassnav" aria-label="Primary">
        {MODULES.map(m => (
          <NavLink key={m.id} to={m.path} end={m.id === "home"}
            title={m.label} aria-label={m.label}
            className={({ isActive }) => (isActive ? "on" : "")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={m.icon} /></svg>
            <span>{m.label}</span>
          </NavLink>
        ))}
      </nav>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
      <ShortcutsModal open={shortcutsOpen} setOpen={setShortcutsOpen} />
      <NotifPanel open={notifOpen} setOpen={setNotifOpen} items={notifs} onMarkAll={markAllNotifs} onDismiss={dismissNotif} />
      {!onboarded && <Onboarding onDone={() => setOnboarded(true)} />}
    </div>
  );
}
