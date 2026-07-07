import { useState } from "react";
import { PageHeader, Segmented } from "../components/ui";
import { useToast } from "../hooks/ToastContext";

const FAQS = [
  { q: "How do I create an account?", a: "The demo build runs in open access. In production, accounts will be provisioned by your institution with role-based access for Researcher, Auditor, Clinician, or Policy Maker." },
  { q: "What data formats can I upload?", a: "The contaminant registry accepts CSV bulk uploads using the downloadable template. Map submissions accept JPEG, PNG, and TIFF photo evidence with EXIF metadata preserved." },
  { q: "How is patient data protected?", a: "All patient-linked therapeutic data is anonymised per HIPAA and GDPR requirements. Identifiers are replaced with system-generated codes (e.g. EGX-4582). No names are stored." },
  { q: "What are the API usage quotas?", a: "API access is available in production. Rate limits depend on institutional tier. Contact technical support for a key and documentation." },
  { q: "How do I report a data error?", a: "Every contaminant entry and hazard site has a Report Correction link. Corrections enter the moderation queue and are reviewed within 48 hours." },
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
    const ticket = "TK-" + Math.floor(10000 + Math.random() * 90000);
    setSubmitted(true);
    toast(`Ticket ${ticket} created. Acknowledgement sent within 2 minutes.`);
  }

  return (
    <>
      <PageHeader eyebrow="Support" title="Contact"
        sub="Route your inquiry to the right department. Emergency hazard reports outside business hours go straight to the hotline." />

      {/* Emergency hotline */}
      <div className="card" style={{ borderColor: "var(--sev3)", marginBottom: 20 }}>
        <div className="card-pad" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div className={"sev s3"} style={{ padding: "5px 10px" }}><span className="sq" />EMERGENCY</div>
          <div>
            <div style={{ fontWeight: 500 }}>24/7 Hazard Reporting Hotline</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--graphite)" }}>For immediate hazard reporting outside business hours</div>
          </div>
          <div className="mono" style={{ marginLeft: "auto", fontSize: 16, fontWeight: 600 }}>+234 800 ENV 0911</div>
        </div>
      </div>

      <div className="grid g2" style={{ alignItems: "start" }}>
        {/* Inquiry form */}
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Submit an inquiry</div>
          {submitted ? (
            <div style={{ padding: "30px 0", textAlign: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2" style={{ width: 32, height: 32, margin: "0 auto 12px" }}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
              <div className="serif" style={{ fontSize: 20, marginBottom: 6 }}>Inquiry received</div>
              <div style={{ fontSize: 13.5, color: "var(--graphite)", lineHeight: 1.6 }}>
                Your ticket has been assigned. Expect an automated acknowledgement within 2 minutes and a response within the SLA window for your department.
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
                <div className="fg"><label>Full name *</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Dr. A. Adebayo" /></div>
                <div className="fg"><label>Email *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="a.adebayo@unilag.edu.ng" /></div>
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
      <div className="grid g3">
        {[
          { office: "Lagos HQ", addr: "Faculty of Science, University of Lagos, Akoka, Lagos", hrs: "Mon to Fri, 08:00 to 17:00 WAT" },
          { office: "LUTH Clinical Liaison", addr: "Lagos University Teaching Hospital, Idi-Araba, Lagos", hrs: "Mon to Fri, 09:00 to 16:00 WAT" },
          { office: "Abuja Policy Office", addr: "Federal Ministry of Environment, Mabushi, Abuja", hrs: "Mon to Fri, 09:00 to 17:00 WAT" }
        ].map(o => (
          <div className="card card-pad" key={o.office}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{o.office}</div>
            <div style={{ fontSize: 13, color: "var(--graphite)", lineHeight: 1.6 }}>{o.addr}</div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--graphite)", marginTop: 8 }}>{o.hrs}</div>
          </div>
        ))}
      </div>
    </>
  );
}
