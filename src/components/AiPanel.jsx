import { fmt } from "../utils/gemini";
import { Skeleton } from "./ui";

export default function AiPanel({ label, state }) {
  if (!state || state.status === "idle") return null;
  return (
    <div className="ai-panel">
      <div className="ai-tag">
        <span className="ai-spark">✦</span>
        <span className="eyebrow">{label}</span>
      </div>
      {state.status === "loading" ? (
        <Skeleton lines={4} />
      ) : (
        <div className="ai-body" style={state.status === "error" ? { color: "var(--sev3)" } : null}
          dangerouslySetInnerHTML={{ __html: state.status === "error" ? state.text : fmt(state.text) }} />
      )}
    </div>
  );
}
