import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { MODULES } from "../data/modules";
import { useKey } from "../hooks/KeyContext";
import CommandPalette from "./CommandPalette";

const Logo = ({ light }) => (
  <svg className="mark" viewBox="0 0 26 26" fill="none" stroke={light ? "#FAFAF8" : "#0A0A0A"} strokeWidth="1.6">
    <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
    <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
  </svg>
);

function KeyModal() {
  const { modalOpen, closeKey, saveKey, key } = useKey();
  const [val, setVal] = useState(key);
  useEffect(() => { if (modalOpen) setVal(key); }, [modalOpen, key]);
  if (!modalOpen) return null;
  return (
    <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && closeKey()}>
      <div className="modal">
        <h3>Connect Gemini</h3>
        <p>AI features call the Gemini API directly from your browser. Paste a key to switch them on.</p>
        <input type="password" placeholder="AIza..." value={val} autoComplete="off"
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveKey(val)} autoFocus />
        <div className="modal-actions">
          <button className="m-cancel" onClick={closeKey}>Cancel</button>
          <button className="m-save" onClick={() => saveKey(val)}>Save key</button>
        </div>
        <div className="hint">Held in memory for this session only. Never stored or sent anywhere but Google's API. Get a key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a>.</div>
      </div>
    </div>
  );
}

export default function Layout() {
  const nav = useNavigate();
  const loc = useLocation();
  const { connected, openKey } = useKey();
  const [cmdOpen, setCmdOpen] = useState(false);

  const current = MODULES.find(m =>
    m.path === loc.pathname || (m.id !== "home" && loc.pathname.startsWith(m.path))
  ) || MODULES[0];

  // global Cmd+K
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen(o => !o); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

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
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon} /></svg>
            {m.label}
            <span className="kbd">{i + 1}</span>
          </NavLink>
        ))}
        <div className="side-foot">Demo build v1.0<br />UNILAG and LUTH</div>
      </aside>

      <div className="main">
        <header className="topbar">
          <span className="crumb">{current.eyebrow} / <b>{current.title}</b></span>
          <span className="spacer" />
          <button className="cmd-trigger" onClick={() => setCmdOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <span>Search everything</span>
            <span className="kbd">⌘K</span>
          </button>
          <button className="btn-key" onClick={openKey}>
            <span className={"key-dot" + (connected ? " ok" : "")} />
            {connected ? "Gemini on" : "Gemini key"}
          </button>
        </header>

        <main className="content">
          <div className="pagewrap"><Outlet /></div>
        </main>
      </div>

      <nav className="glassnav">
        {MODULES.map(m => (
          <NavLink key={m.id} to={m.path} end={m.id === "home"} className={({ isActive }) => (isActive ? "on" : "")}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon} /></svg>
            <span>{m.label}</span>
          </NavLink>
        ))}
      </nav>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
      <KeyModal />
    </div>
  );
}
