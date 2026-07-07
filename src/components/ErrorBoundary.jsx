import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("EnviroGenome error:", error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: "60px 32px", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div className="mono" style={{ fontSize: 64, color: "var(--hair-2)", lineHeight: 1 }}>!</div>
        <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginTop: 16 }}>Something went wrong</h2>
        <p style={{ color: "var(--graphite)", fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>
          This module encountered an error. The rest of the platform is unaffected.
        </p>
        <div className="mono" style={{ fontSize: 11, background: "var(--smoke)", padding: "12px 16px", borderRadius: 8, marginTop: 18, textAlign: "left", color: "var(--graphite)", wordBreak: "break-all" }}>
          {this.state.error.message}
        </div>
        <button className="btn btn-dark" style={{ marginTop: 22 }} onClick={() => { this.setState({ error: null }); window.location.href = "/app"; }}>
          Return to dashboard
        </button>
      </div>
    );
  }
}
