// Renders a technical term followed by its bracketed definition, e.g.
// "Genotoxic (damage to genetic material)". Definitions live in one place,
// docs/definitions.md, which is imported as raw text and parsed once here.
// Use it on the first occurrence of a term on each page only.
import raw from "../../docs/definitions.md?raw";

const DEFS = new Map();
for (const line of raw.split("\n")) {
  const m = line.match(/^\|\s*(.+?)\s*\|\s*(.*?)\s*\|\s*$/);
  if (!m || /^:?-+:?$/.test(m[1]) || m[1] === "Term") continue;
  if (m[2]) DEFS.set(m[1].toLowerCase(), m[2]);
}

// name: the key in docs/definitions.md. children: optional display text when
// the page wording differs from the key (plural, lower case, longer label).
export default function Term({ name, children }) {
  const label = children ?? name;
  const def = DEFS.get(String(name).toLowerCase());
  return def ? <>{label} ({def})</> : <>{label}</>;
}
