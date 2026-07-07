export default function PageSkeleton() {
  return (
    <div style={{ padding: "0" }}>
      {/* page header skeleton */}
      <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--hair)", marginBottom: 20 }}>
        <div className="sk sk-line" style={{ width: 80, height: 9, marginBottom: 10 }} />
        <div className="sk sk-line" style={{ width: 260, height: 28, marginBottom: 8 }} />
        <div className="sk sk-line" style={{ width: 420, height: 11 }} />
      </div>
      {/* stat cards */}
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {[1,2,3,4].map(i => (
          <div className="card" key={i} style={{ padding: 18 }}>
            <div className="sk sk-line" style={{ width: 70, height: 9, marginBottom: 14 }} />
            <div className="sk sk-line" style={{ width: 90, height: 32, marginBottom: 10 }} />
            <div className="sk sk-line" style={{ width: 110, height: 9 }} />
          </div>
        ))}
      </div>
      {/* content rows */}
      <div className="grid g2">
        <div className="card" style={{ padding: 18 }}>
          {[100, 88, 72, 94, 65, 80, 55].map((w, i) => (
            <div key={i} className="sk sk-line" style={{ width: w + "%", marginBottom: 12 }} />
          ))}
        </div>
        <div className="card" style={{ padding: 18 }}>
          {[90, 60, 75, 85, 50].map((w, i) => (
            <div key={i} className="sk sk-line" style={{ width: w + "%", marginBottom: 14 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
