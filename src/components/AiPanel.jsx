import { fmt, toPlainText } from "../utils/gemini";
import { Skeleton } from "./ui";
import { useToast } from "../hooks/ToastContext";

export default function AiPanel({ label, state, onRetry }) {
  const toast = useToast();
  if (!state || state.status === "idle") return null;

  function copyPlain() {
    navigator.clipboard?.writeText(toPlainText(state.text));
    toast("Copied as plain text");
  }

  return (
    <div className="ai-panel">
      <div className="ai-tag">
        <span className="ai-spark">✦</span>
        <span className="eyebrow">{label}</span>
      </div>
      {state.status === "loading" ? (
        <Skeleton lines={4} />
      ) : (
        <>
          <div className="ai-body" style={state.status === "error" ? { color: "var(--sev3)" } : null}
            dangerouslySetInnerHTML={{ __html: state.status === "error" ? state.text : fmt(state.text) }} />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {state.status === "error" && onRetry && (
              <button className="btn btn-ghost" onClick={onRetry}>Retry</button>
            )}
            {state.status === "done" && (
              <button className="btn btn-ghost" onClick={copyPlain}>Copy as plain text</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
