import { useState, useMemo } from "react";

export function PageHeader({ eyebrow, title, sub, children }) {
  return (
    <div className="phead">
      <div className="htitle">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {children && <div className="htools">{children}</div>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder, onEnter }) {
  return (
    <div className="input" style={{ minWidth: 220 }}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
      <input value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onEnter && onEnter()} />
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map(o => (
        <button key={o.value} className={value === o.value ? "on" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Skeleton({ lines = 3 }) {
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="sk sk-line" style={{ width: i === lines - 1 ? "60%" : "100%" }} />
      ))}
    </div>
  );
}

export function Empty({ text }) {
  return (
    <div className="empty">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
      </svg>
      <p>{text}</p>
    </div>
  );
}

// Sortable table. columns: [{key,label,align,render,sortVal}]
export function Table({ columns, rows, rowKey, onRowClick, selectedKey, initialSort }) {
  const [sort, setSort] = useState(initialSort || { key: null, dir: 1 });
  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const col = columns.find(c => c.key === sort.key);
    const val = col.sortVal || (r => r[sort.key]);
    return [...rows].sort((a, b) => {
      const va = val(a), vb = val(b);
      if (va < vb) return -1 * sort.dir;
      if (va > vb) return 1 * sort.dir;
      return 0;
    });
  }, [rows, sort, columns]);

  const toggle = (k) => setSort(s => s.key === k ? { key: k, dir: -s.dir } : { key: k, dir: 1 });

  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key}
                className={(c.sortable !== false ? "sortable " : "") + (sort.key === c.key ? "act " : "") + (c.align === "right" ? "rt" : "")}
                onClick={() => c.sortable !== false && toggle(c.key)}>
                {c.label}
                {c.sortable !== false && <span className="arr">{sort.key === c.key ? (sort.dir === 1 ? "↑" : "↓") : "↕"}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(r => {
            const k = rowKey(r);
            return (
              <tr key={k} className={selectedKey === k ? "sel" : ""} onClick={() => onRowClick && onRowClick(r)}>
                {columns.map(c => (
                  <td key={c.key} className={(c.cls || "") + (c.align === "right" ? " rt" : "")}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
