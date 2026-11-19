// Priority genotoxic and carcinogenic pollutants relevant to Nigeria:
// petroleum and combustion products (gas flaring, oil spills, open burning),
// food-chain toxins, and the heavy metals released by e-waste, mining and
// industry. Classifications come from the IARC Monographs; mutation entries
// cite the primary study that established the signature. CAS numbers and
// formulas are standard public identifiers.
//
// `mutations` rows are [organism, locus, damage pattern]. Rows are left out
// where no single, well-established locus signature exists, rather than
// inventing one.
export const contaminants = [
  {
    name: "Benzo[a]pyrene", cas: "50-32-8", formula: "C20H12",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 100F, 2012)",
    props: [
      ["Category", "Polycyclic aromatic hydrocarbon (PAH)"],
      ["Main sources", "Gas flaring, crude oil spills, open burning of waste, vehicle exhaust, smoked fish"],
      ["Mechanism", "Metabolised to a diol epoxide that binds guanine in DNA, forming bulky adducts"],
      ["Reported effect", "Lung and skin cancer"],
    ],
    mutations: [["Homo sapiens", "TP53 codons 157, 248, 273", "G to T transversions at adduct hotspots (Denissenko et al., 1996, Science 274:430)"]],
    links: [],
    source: "IARC (2012). Chemical Agents and Related Occupations. IARC Monographs Vol. 100F. Denissenko, M.F. et al. (1996). Science, 274, 430-432.",
  },
  {
    name: "Aflatoxin B1", cas: "1162-65-8", formula: "C17H12O6",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 100F, 2012)",
    props: [
      ["Category", "Mycotoxin (Aspergillus flavus)"],
      ["Main sources", "Poorly stored maize, groundnuts and other grains in warm, humid conditions"],
      ["Mechanism", "Metabolised to an epoxide that binds guanine N7 in DNA"],
      ["Reported effect", "Liver cancer, sharply worse with hepatitis B co-infection"],
    ],
    mutations: [["Homo sapiens", "TP53 codon 249", "AGG to AGT, arginine to serine (R249S) (Hsu et al., 1991, Nature 350:427)"]],
    links: [],
    source: "IARC (2012). IARC Monographs Vol. 100F. Hsu, I.C. et al. (1991). Nature, 350, 427-428.",
  },
  {
    name: "Benzene", cas: "71-43-2", formula: "C6H6",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 120, 2018)",
    props: [
      ["Category", "Volatile organic compound"],
      ["Main sources", "Petrol stations and fuel handling, refinery emissions, vehicle exhaust, generator fumes"],
      ["Mechanism", "Bone-marrow metabolites cause chromosomal aberrations"],
      ["Reported effect", "Acute myeloid leukaemia"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2018). Benzene. IARC Monographs Vol. 120.",
  },
  {
    name: "Cadmium", cas: "7440-43-9", formula: "Cd",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 100C, 2012)",
    props: [
      ["Category", "Heavy metal"],
      ["Main sources", "E-waste recycling, batteries, phosphate fertilisers, industrial effluent"],
      ["Mechanism", "Inhibits DNA repair and causes oxidative DNA damage"],
      ["Reported effect", "Lung cancer, kidney damage"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2012). Arsenic, Metals, Fibres, and Dusts. IARC Monographs Vol. 100C.",
  },
  {
    name: "Arsenic", cas: "7440-38-2", formula: "As",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 100C, 2012)",
    props: [
      ["Category", "Metalloid"],
      ["Main sources", "Contaminated groundwater, mining, pesticide residues"],
      ["Mechanism", "Oxidative stress, chromosomal damage and altered DNA methylation"],
      ["Reported effect", "Skin, lung and bladder cancer"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2012). IARC Monographs Vol. 100C.",
  },
  {
    name: "Chromium (VI)", cas: "18540-29-9", formula: "Cr(VI)",
    genotoxic: true, iarc: "Group 1, carcinogenic to humans (IARC Monograph 100C, 2012)",
    props: [
      ["Category", "Heavy metal"],
      ["Main sources", "Tannery and electroplating effluent, cement dust"],
      ["Mechanism", "Reduced inside cells to reactive forms that make DNA adducts and strand breaks"],
      ["Reported effect", "Lung cancer"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2012). IARC Monographs Vol. 100C.",
  },
  {
    name: "Lead", cas: "7439-92-1", formula: "Pb",
    genotoxic: false, iarc: "Group 2A, probably carcinogenic (inorganic compounds, IARC Monograph 87, 2006)",
    props: [
      ["Category", "Heavy metal"],
      ["Main sources", "Battery recycling, e-waste, old paint, artisanal gold mining"],
      ["Reported effect", "Irreversible neurodevelopmental harm in children"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2006). Inorganic and Organic Lead Compounds. IARC Monographs Vol. 87.",
  },
  {
    name: "Styrene", cas: "100-42-5", formula: "C8H8",
    genotoxic: true, iarc: "Group 2A, probably carcinogenic (IARC Monograph 121, 2019)",
    props: [
      ["Category", "Volatile organic compound"],
      ["Main sources", "Plastics manufacture, burning of polystyrene waste"],
      ["Mechanism", "Metabolised to styrene-7,8-oxide, which forms DNA adducts"],
      ["Reported effect", "Lymphohaematopoietic cancers (limited evidence)"],
    ],
    mutations: [],
    links: [],
    source: "IARC (2019). Styrene, Styrene-7,8-oxide, and Quinoline. IARC Monographs Vol. 121.",
  },
];
