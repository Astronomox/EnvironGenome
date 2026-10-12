import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 80, fontWeight: 300, color: "var(--hair-2)", lineHeight: 1 }}>404</div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 400, marginTop: 16 }}>Page not found</h1>
      <p style={{ color: "var(--graphite)", fontSize: 14, marginTop: 10, maxWidth: "36ch" }}>
        The page you requested does not exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <Button onClick={() => nav("/app")}>Go to dashboard</Button>
        <Button variant="outline" onClick={() => nav("/")}>Landing page</Button>
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--mute)", marginTop: 40 }}>EnviroGenome Guardian, demo build v4.1.32</div>
    </div>
  );
}
