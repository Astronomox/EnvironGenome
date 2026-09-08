import { useState } from "react";
import { PageHeader, Segmented } from "../components/ui";
import { useToast } from "../hooks/ToastContext";

const FAQS = [
  { q: "How do I create an account?", a: "The demo build runs in open access. In production, accounts will be provisioned by your institution with role-based access for Researcher, Auditor, Clinician, or Policy Maker." },
  { q: "What data formats can I upload?", a: "The contaminant registry accepts CSV bulk uploads using the downloadable template. Map submissions accept JPEG, PNG, and TIFF photo evidence with EXIF metadata preserved." },
  { q: "How is patient data protected?", a: "In this demo, the therapeutic intake form doesn't submit anywhere or persist data. In production, patient-linked data would need to be anonymised and handled to a formal data-protection standard, with identifiers replaced by system-generated codes rather than names." },
  { q: "What are the API usage quotas?", a: "This demo has no public API or accounts yet. The AI features call a server-side endpoint the app controls; there's no quota system in front of it." },
  { q: "How do I report a data error?", a: "There's no moderation queue behind this demo yet. Corrections aren't routed anywhere -- treat any 'submit' action on this site as illustrative of the intended workflow, not a live process." },
  { q: "Can I use the platform offline?", a: "All modules except the Geolocation Hazard Map work offline. The map requires a network connection for OpenStreetMap tiles. In production, auditors will have offline-capable submission forms." },
];

const DEPTS = ["General support", "Technical issue", "Data submission query", "Media request", "Emergency reporting"];

export default function Contact() {
  const toast = useToast();
  const [dept, setDept] = useState(DEPTS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [openFaq, setOpenFaq] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  function send() {
    if (!name.trim() || !email.trim() || !msg.trim()) { toast("Please fill all required fields."); return; }
    setSubmitted(true);
    toast("Noted. This demo form doesn't actually send anywhere yet.");
  }

  return (
    <>
      <PageHeader eyebrow="Support" title="Contact"
        sub="This is a coursework demo. For a real environmental emergency in Lagos, contact NEMA, LASEPA, or the emergency services directly, not this form." />

      <div className="grid g2" style={{ alignItems: "start" }}>
        {/* Inquiry form */}
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Submit an inquiry</div>
          {submitted ? (
            <div style={{ padding: "30px 0", textAlign: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2" style={{ width: 32, height: 32, margin: "0 auto 12px" }}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
              <div className="serif" style={{ fontSize: 20, marginBottom: 6 }}>Received</div>
              <div style={{ fontSize: 13.5, color: "var(--graphite)", lineHeight: 1.6 }}>
                This demo doesn't have a real inbox or ticketing system behind it yet, so nothing was actually sent anywhere.
              </div>
              <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMsg(""); }}>Submit another</button>
            </div>
          ) : (
            <div className="stack" style={{ gap: 12 }}>
              <div className="fg"><label>Department</label>
                <select value={dept} onChange={e => setDept(e.target.value)}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-grid">
                <div className="fg"><label>Full name *</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Okafor" /></div>
                <div className="fg"><label>Email *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
              </div>
              <div className="fg"><label>Message *</label><textarea rows={5} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Describe your question or issue in detail" /></div>
              <button className="btn btn-dark" style={{ width: "100%" }} onClick={send}>Send inquiry</button>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Frequently asked questions</div>
          <div className="stack">
            {FAQS.map((f, i) => (
              <div className="card" key={i} style={{ cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <div className="card-pad" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="2" style={{ width: 14, height: 14, marginTop: 3, flex: "none", transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform .2s" }}>
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{f.q}</div>
                    {openFaq === i && <div style={{ fontSize: 13, color: "var(--graphite)", lineHeight: 1.6, marginTop: 8 }}>{f.a}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offices */}
      <div className="sect-t">Regional offices</div>
      <div className="empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16v16H4zM4 10h16" /></svg>
        No offices to list. The earlier version of this section invented physical addresses and hours at UNILAG, LUTH, and the Federal Ministry of Environment that this project has no real presence at -- removed rather than corrected in place.
      </div>
    </>
  );
}
