import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MODULES } from "../data/modules";
import "./landing.css";

function SensorStrip() {
  const [bars, setBars] = useState(Array(34).fill(20));
  const [reading, setReading] = useState("0.0");
  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => prev.map((_, i) => {
        const base = 30 + 40 * Math.sin(Date.now() / 900 + i * 0.5);
        return Math.max(8, Math.min(96, base + (Math.random() * 40 - 20)));
      }));
    }, 320);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const avg = bars.reduce((a, b) => a + b, 0) / bars.length;
    setReading((avg * 0.9).toFixed(1));
  }, [bars]);
  return (
    <div className="sensor">
      <div className="sensor-head">
        <span className="eyebrow" style={{ color: "rgba(250,250,248,.55)" }}>Ambient monitoring, Lagos grid</span>
        <span className="live"><span className="pulse" />LIVE</span>
      </div>
      <div className="bars">
        {bars.map((h, i) => <div key={i} className="bar" style={{ height: h + "%" }} />)}
      </div>
      <div className="sensor-foot">
        <span>PM2.5 / Pb / PCB / SO2</span>
        <span>{reading} ug/m3</span>
      </div>
    </div>
  );
}

function FlowRail() {
  const nav = useNavigate();
  const [cy, setCy] = useState(0);
  const railRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setCy(c => (c + 1) % MODULES.length), 2200);
    return () => clearInterval(id);
  }, []);

  // scroll reveal
  useEffect(() => {
    if (!railRef.current) return;
    const bars = railRef.current.querySelectorAll(".flowbar");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    bars.forEach((b, i) => { b.style.transitionDelay = (i * 0.07) + "s"; obs.observe(b); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flowbars" ref={railRef}>
      {MODULES.map((m, i) => (
        <div key={m.id} className={"flowbar" + (i === cy ? " cy" : "")} onClick={() => nav(m.path)}>
          <div className="idx">0{i + 1}</div>
          <div className="fb-main">
            <h3>{m.title}</h3>
            <div className="fb-desc">{m.desc}</div>
          </div>
          <div className="fb-go">Open</div>
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="landing">
      <nav className="land-nav">
        <div className="brand" onClick={() => nav("/app")}>
          <svg className="mark" viewBox="0 0 26 26" fill="none" stroke="#FAFAF8" strokeWidth="1.6">
            <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
            <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
          </svg>
          <span className="brand-name land">Enviro<em>Genome</em></span>
        </div>
        <button className="land-enter" onClick={() => nav("/app")}>Enter platform</button>
      </nav>

      <div className="hero">
        <div className="hero-grid" />
        <div className="hero-in">
          <div>
            <div className="hero-eyebrow eyebrow">Environmental, genomic, spatial intelligence</div>
            <h1>Where a pollutant meets its <em>genetic signature</em>, and its place on the map.</h1>
            <p>One platform linking contaminant chemistry, the mutations they leave in living genomes, and the exact coordinates where hazard is doing its damage. Built for researchers, auditors, clinicians, and the people who write the rules.</p>
            <div className="hero-actions">
              <button className="cta cta-primary" onClick={() => nav("/app")}>Enter platform</button>
              <button className="cta cta-ghost" onClick={() => nav("/app/map")}>See live hazard map</button>
            </div>
            <div className="scroll-hint" onClick={() => document.querySelector(".flowrail")?.scrollIntoView({ behavior: "smooth" })}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(250,250,248,.4)" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path d="M6 9l6 6 6-6" /></svg>
            </div>
          </div>
          <SensorStrip />
        </div>
      </div>

      <div className="flowrail">
        <div className="flowrail-in">
          <div className="flow-head">
            <h2>Seven modules, one continuous thread.</h2>
            <p>From field submission to clinical follow-up, how a single hazard moves through the platform.</p>
          </div>
          <FlowRail />
        </div>
      </div>

      <div className="land-stats">
        <div className="land-stats-in">
          {[["42,150", "Contaminants registered"], ["89,733", "Hazard sites mapped"],
            ["6,847", "Genome and toxin pairings"], ["104", "Jurisdictions indexed"]].map(([n, l]) => (
            <div className="lstat" key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="land-foot">EnviroGenome, demo build v1.0. University of Lagos and Lagos University Teaching Hospital.</div>
    </div>
  );
}
