// Pathway diagram data per compound class
const PATHWAYS = {
  // aromatic hydrocarbons (benzene, toluene, styrene, etc.)
  aromatic: {
    label: "Aromatic hydrocarbon pathway",
    nodes: [
      { id:"exp",  x:60,  y:50,  label:"Exposure",       sub:"Inhalation / skin",  fill:"#E4E4DF" },
      { id:"lung", x:220, y:50,  label:"Lung / Skin",     sub:"Absorption",         fill:"#D5D5CF" },
      { id:"blood",x:380, y:50,  label:"Bloodstream",     sub:"Systemic transport", fill:"#3C3C38", text:"#fff" },
      { id:"liver",x:380, y:180, label:"Liver (CYP2E1)",  sub:"Metabolic oxidation",fill:"#6B6B6B", text:"#fff" },
      { id:"epox", x:220, y:180, label:"Epoxide / Quinone",sub:"Reactive metabolite",fill:"#D8442C", text:"#fff" },
      { id:"dna",  x:60,  y:180, label:"DNA Adducts",     sub:"Mutagenic damage",   fill:"#D8442C", text:"#fff" },
      { id:"urine",x:540, y:180, label:"Urinary excretion",sub:"Glucuronide / sulfate",fill:"#E4E4DF" },
    ],
    edges: [
      ["exp","lung"],["lung","blood"],["blood","liver"],
      ["liver","epox"],["epox","dna"],["liver","urine"]
    ]
  },
  // heavy metals
  metal: {
    label: "Heavy metal pathway",
    nodes: [
      { id:"exp",  x:60,  y:50,  label:"Exposure",       sub:"Ingestion / inhalation", fill:"#E4E4DF" },
      { id:"gi",   x:220, y:50,  label:"GI tract",       sub:"Absorption (5 to 15%)",  fill:"#D5D5CF" },
      { id:"blood",x:380, y:50,  label:"Bloodstream",    sub:"Protein binding",         fill:"#3C3C38", text:"#fff" },
      { id:"bone", x:540, y:50,  label:"Bone / Kidney",  sub:"Long-term deposition",   fill:"#6B6B6B", text:"#fff" },
      { id:"enz",  x:380, y:180, label:"Enzyme inhibition",sub:"Heme / DNA pathways",  fill:"#D8442C", text:"#fff" },
      { id:"mt",   x:220, y:180, label:"Metallothionein", sub:"Sequestration protein",  fill:"#8A8A83", text:"#fff" },
      { id:"renal",x:60,  y:180, label:"Renal excretion", sub:"Urine (slow, years)",    fill:"#E4E4DF" },
    ],
    edges: [
      ["exp","gi"],["gi","blood"],["blood","bone"],
      ["blood","enz"],["enz","mt"],["mt","renal"]
    ]
  },
  // organochlorines (PCBs, DDT, dioxin, etc.)
  organochlor: {
    label: "Organochlorine pathway",
    nodes: [
      { id:"exp",   x:60,  y:50,  label:"Exposure",       sub:"Food / inhalation",      fill:"#E4E4DF" },
      { id:"gi",    x:220, y:50,  label:"GI absorption",  sub:"Lipophilic uptake",       fill:"#D5D5CF" },
      { id:"fat",   x:380, y:50,  label:"Adipose tissue", sub:"Bioaccumulation",         fill:"#6B6B6B", text:"#fff" },
      { id:"liver", x:540, y:50,  label:"Liver",          sub:"CYP1A1 induction",        fill:"#3C3C38", text:"#fff" },
      { id:"ahr",   x:540, y:180, label:"AHR activation", sub:"Receptor-mediated tox",   fill:"#D8442C", text:"#fff" },
      { id:"meta",  x:380, y:180, label:"Metabolites",    sub:"Hydroxylated PCBs",       fill:"#8A8A83", text:"#fff" },
      { id:"excr",  x:220, y:180, label:"Biliary / fecal",sub:"Very slow excretion",     fill:"#E4E4DF" },
    ],
    edges: [
      ["exp","gi"],["gi","fat"],["fat","liver"],
      ["liver","ahr"],["ahr","meta"],["meta","excr"]
    ]
  },
  // inorganic gases (SO2, NO2, H2S, NH3)
  gas: {
    label: "Inorganic gas pathway",
    nodes: [
      { id:"exp",   x:60,  y:50,  label:"Inhalation",     sub:"Ambient air exposure",    fill:"#E4E4DF" },
      { id:"upper", x:220, y:50,  label:"Upper airway",   sub:"Mucosal absorption",      fill:"#D5D5CF" },
      { id:"lower", x:380, y:50,  label:"Lower airway",   sub:"Alveolar penetration",    fill:"#6B6B6B", text:"#fff" },
      { id:"blood", x:540, y:50,  label:"Bloodstream",    sub:"Systemic spread",         fill:"#3C3C38", text:"#fff" },
      { id:"epith", x:380, y:180, label:"Epithelial dmg", sub:"Oxidative stress",        fill:"#D8442C", text:"#fff" },
      { id:"inf",   x:220, y:180, label:"Inflammation",   sub:"Cytokine cascade",        fill:"#8A8A83", text:"#fff" },
      { id:"excr",  x:60,  y:180, label:"Exhalation",     sub:"Partial elimination",     fill:"#E4E4DF" },
    ],
    edges: [
      ["exp","upper"],["upper","lower"],["lower","blood"],
      ["lower","epith"],["epith","inf"],["upper","excr"]
    ]
  },
  // pesticides / organophosphates
  pesticide: {
    label: "Organophosphate pathway",
    nodes: [
      { id:"exp",   x:60,  y:50,  label:"Exposure",       sub:"Skin / ingestion / inhal",fill:"#E4E4DF" },
      { id:"abs",   x:220, y:50,  label:"Absorption",     sub:"Rapid systemic entry",    fill:"#D5D5CF" },
      { id:"blood", x:380, y:50,  label:"Bloodstream",    sub:"Distribution",            fill:"#3C3C38", text:"#fff" },
      { id:"ache",  x:540, y:50,  label:"AChE inhibition",sub:"Cholinergic crisis",      fill:"#D8442C", text:"#fff" },
      { id:"liver", x:380, y:180, label:"Liver (PON1)",   sub:"Hydrolysis / detox",      fill:"#6B6B6B", text:"#fff" },
      { id:"meta",  x:220, y:180, label:"Metabolites",    sub:"Oxons (more toxic)",      fill:"#8A8A83", text:"#fff" },
      { id:"urine", x:60,  y:180, label:"Urinary excretion",sub:"Alkyl phosphates",      fill:"#E4E4DF" },
    ],
    edges: [
      ["exp","abs"],["abs","blood"],["blood","ache"],
      ["blood","liver"],["liver","meta"],["meta","urine"]
    ]
  },
};

// map CAS to pathway type
function getPathwayType(cas) {
  const metal = ["7440-43-9","7439-92-1","7439-97-6","7440-38-2","18540-29-9","7440-02-0","7439-96-5","7681-49-4","7440-61-1","7440-42-8","688-73-3"];
  const organochlor = ["1336-36-3","50-29-3","1746-01-6","118-74-1"];
  const gas = ["7446-09-5","10102-44-0","7783-06-4","7664-41-7","10028-15-6"];
  const pesticide = ["56-38-2","2921-88-2","1912-24-9","94-75-7"];
  if (metal.includes(cas)) return "metal";
  if (organochlor.includes(cas)) return "organochlor";
  if (gas.includes(cas)) return "gas";
  if (pesticide.includes(cas)) return "pesticide";
  return "aromatic"; // default for most organics
}

const W = 640, H = 270, NW = 110, NH = 52, AR = 8;

export default function PathwayDiagram({ cas }) {
  const type = getPathwayType(cas);
  const pw = PATHWAYS[type];
  const nodeMap = Object.fromEntries(pw.nodes.map(n => [n.id, n]));

  function edgePath(from, to) {
    const a = nodeMap[from], b = nodeMap[to];
    const ax = a.x + NW / 2, ay = a.y + NH / 2;
    const bx = b.x + NW / 2, by = b.y + NH / 2;
    const mx = (ax + bx) / 2;
    return `M${ax},${ay} C${mx},${ay} ${mx},${by} ${bx},${by}`;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>{pw.label}</div>
      <div style={{ background: "var(--smoke)", borderRadius: 12, padding: "18px 14px", overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: 560, height: "auto", display: "block" }}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6B6B6B" />
            </marker>
          </defs>
          {/* edges */}
          {pw.edges.map(([f, t], i) => (
            <path key={i} d={edgePath(f, t)} fill="none" stroke="#B9B9B3"
              strokeWidth="1.5" markerEnd="url(#arr)" />
          ))}
          {/* nodes */}
          {pw.nodes.map(n => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={NW} height={NH} rx={AR}
                fill={n.fill} stroke={n.fill === "#E4E4DF" ? "#D5D5CF" : "none"} strokeWidth="1" />
              <text x={n.x + NW / 2} y={n.y + 18} textAnchor="middle"
                fontFamily="var(--sans)" fontSize="10" fontWeight="600"
                fill={n.text || "#0A0A0A"}>{n.label}</text>
              <text x={n.x + NW / 2} y={n.y + 32} textAnchor="middle"
                fontFamily="var(--mono)" fontSize="8" fill={n.text ? "rgba(255,255,255,.7)" : "#6B6B6B"}>{n.sub}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--mute)", marginTop: 6 }}>
        Pathway is indicative and class-based. Refer to primary literature for compound-specific kinetics.
      </div>
    </div>
  );
}
