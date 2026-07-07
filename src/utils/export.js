// Export utilities for EnviroGenome platform

// ---- GeoJSON export from sites array ----
export function sitesToGeoJSON(sites) {
  return JSON.stringify({
    type: "FeatureCollection",
    features: sites.map(s => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [s.lng, s.lat] },
      properties: {
        id: s.id, name: s.name, substance: s.sub, severity: s.sev,
        reported_by: s.by, date: s.date, status: s.status, coord: s.coord
      }
    }))
  }, null, 2);
}

// ---- CSV export from array of objects ----
export function toCSV(rows, cols) {
  const header = cols.map(c => `"${c.label}"`).join(",");
  const body = rows.map(r => cols.map(c => `"${String(r[c.key] ?? "").replace(/"/g, '""')}"`).join(","));
  return [header, ...body].join("\n");
}

// ---- Trigger browser download ----
export function download(content, filename, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---- Print-ready audit report HTML ----
export function auditReportHTML(site, reportText) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Audit Report - ${site.name}</title>
<style>
  body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#111;line-height:1.7;}
  h1{font-size:22px;margin-bottom:4px;} .meta{font-family:monospace;font-size:12px;color:#555;margin-bottom:24px;}
  .badge{display:inline-block;border:1px solid #c00;color:#c00;font-family:monospace;font-size:11px;padding:3px 8px;border-radius:4px;margin-bottom:16px;}
  .body{font-size:14px;white-space:pre-wrap;} hr{border:none;border-top:1px solid #ddd;margin:24px 0;}
  .foot{font-family:monospace;font-size:11px;color:#888;}
  @media print{body{margin:20mm;}}
</style></head><body>
<div class="badge">LEVEL ${site.sev} - ${["BASELINE","MINOR CONCERN","MODERATE RISK","SEVERE DANGER"][site.sev]}</div>
<h1>${site.name}</h1>
<div class="meta">
  Coordinates: ${site.coord} &nbsp;|&nbsp; Substance: ${site.sub}<br>
  Reported by: ${site.by} &nbsp;|&nbsp; Date: ${site.date} &nbsp;|&nbsp; Status: ${site.status}
</div>
<hr>
<div class="body">${reportText.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</div>
<hr>
<div class="foot">
  EnviroGenome Guardian &nbsp;|&nbsp; University of Lagos &amp; LUTH &nbsp;|&nbsp; Demo build v1.0<br>
  Generated: ${new Date().toISOString().slice(0,19).replace("T"," ")} UTC
</div>
</body></html>`;
}

// ---- Compliance checklist plain text ----
export function checklistText(standard, items) {
  const lines = [
    `COMPLIANCE CHECKLIST`,
    `Standard: ${standard}`,
    `Generated: ${new Date().toISOString().slice(0,10)}`,
    `EnviroGenome Guardian - University of Lagos`,
    ``,
    ...items.map((item, i) => `[ ] ${i+1}. ${item}`)
  ];
  return lines.join("\n");
}
