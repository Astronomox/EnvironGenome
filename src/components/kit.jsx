import { useState, useMemo } from "react";
import { Search, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
    <div className="relative min-w-[220px]">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input value={value} placeholder={placeholder} aria-label={placeholder} className="bg-card pl-9"
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onEnter && onEnter()} />
    </div>
  );
}

// Single-choice toggle. Values can be numbers or strings; Radix needs strings,
// so they are mapped back to the original option value on change.
export function Segmented({ options, value, onChange, className, itemClassName }) {
  return (
    <ToggleGroup type="single" variant="outline" className={cn("bg-card", className)}
      value={String(value)}
      onValueChange={v => {
        const hit = options.find(o => String(o.value) === v);
        if (hit) onChange(hit.value); // ignore the empty value Radix sends on re-click
      }}>
      {options.map(o => (
        <ToggleGroupItem key={String(o.value)} value={String(o.value)}
          className={cn("px-3 font-mono text-[11px] uppercase tracking-wide data-[state=on]:bg-primary data-[state=on]:text-primary-foreground", itemClassName)}>
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
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

// Sortable table. columns: [{key,label,align,render,sortVal,cls}]
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
    <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
      <UiTable>
        <TableHeader className="bg-secondary">
          <TableRow className="hover:bg-transparent">
            {columns.map(c => {
              const sortable = c.sortable !== false;
              const Icon = sort.key === c.key ? (sort.dir === 1 ? ArrowUp : ArrowDown) : ArrowUpDown;
              return (
                <TableHead key={c.key}
                  className={cn("font-mono text-[10.5px] uppercase tracking-wider text-army", c.align === "right" && "text-right", sortable && "cursor-pointer select-none")}
                  onClick={() => sortable && toggle(c.key)}
                  aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    {sortable && <Icon className={cn("size-3", sort.key === c.key ? "opacity-100" : "opacity-40")} />}
                  </span>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(r => {
            const k = rowKey(r);
            return (
              <TableRow key={k} data-state={selectedKey === k ? "selected" : undefined}
                className={cn(onRowClick && "cursor-pointer", "data-[state=selected]:bg-army-tint")}
                onClick={() => onRowClick && onRowClick(r)}>
                {columns.map(c => (
                  <TableCell key={c.key}
                    className={cn("whitespace-normal py-3",
                      c.cls === "name" && "font-medium",
                      c.cls === "g" && "font-mono text-muted-foreground",
                      c.align === "right" && "text-right tabular-nums")}>
                    {c.render ? c.render(r) : r[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </UiTable>
    </div>
  );
}
