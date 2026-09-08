// Five entries, each a real, named chemical with a real, cited health
// effect. Sourced from Oyesomi, A.A. (2026) "Fragrance as an Imagined
// Toxicant" (CBG 816 term paper, University of Lagos), which itself cites
// the National Academy of Sciences / National Toxicology Program and the
// Environmental Working Group for specific claims (noted per entry below).
//
// `mutations` is intentionally empty for all five: none of the sources
// this app currently has give a specific gene/organism/locus association
// for these compounds, and inventing one (which the previous dataset did)
// is exactly the kind of fabrication this registry is meant to avoid.
// CAS numbers and formulas are standard public identifiers for these
// compounds, not sourced from the term paper itself.
export const contaminants = [
  {
    name: "Styrene", cas: "100-42-5", formula: "C8H8",
    genotoxic: true, iarc: "Declared a human carcinogen (US National Academy of Sciences / National Toxicology Program, 2011)",
    props: [
      ["Category", "Fragrance/plastics-associated volatile organic compound"],
      ["Reported effect", "Declared a human carcinogen by the US National Academy of Sciences and National Toxicology Program in 2011"],
    ],
    mutations: [], links: [],
    source: "Oyesomi, A.A. (2026). Fragrance as an Imagined Toxicant. CBG 816 term paper, University of Lagos.",
  },
  {
    name: "Camphor", cas: "76-22-2", formula: "C10H16O",
    genotoxic: false, iarc: "",
    props: [
      ["Category", "Fragrance compound"],
      ["Reported effect", "Neurotoxic effects reported, including convulsions, muscle twitching, dizziness, nausea and confusion"],
    ],
    mutations: [], links: [],
    source: "Oyesomi, A.A. (2026). Fragrance as an Imagined Toxicant. CBG 816 term paper, University of Lagos.",
  },
  {
    name: "Benzyl acetate", cas: "140-11-4", formula: "C9H10O2",
    genotoxic: false, iarc: "",
    props: [
      ["Category", "Fragrance compound"],
      ["Reported effect", "May cause lung and eye irritation along with coughing"],
    ],
    mutations: [], links: [],
    source: "Oyesomi, A.A. (2026). Fragrance as an Imagined Toxicant. CBG 816 term paper, University of Lagos.",
  },
  {
    name: "Ethyl acetate", cas: "141-78-6", formula: "C4H8O2",
    genotoxic: false, iarc: "",
    props: [
      ["Category", "Fragrance/solvent compound"],
      ["Reported effect", "May trigger respiratory and eye irritation"],
    ],
    mutations: [], links: [],
    source: "Oyesomi, A.A. (2026). Fragrance as an Imagined Toxicant. CBG 816 term paper, University of Lagos.",
  },
  {
    name: "Benzaldehyde", cas: "100-52-7", formula: "C7H6O",
    genotoxic: false, iarc: "",
    props: [
      ["Category", "Fragrance compound"],
      ["Reported effect", "Considered a narcotic at high exposure; can cause lung and eye irritation"],
    ],
    mutations: [], links: [],
    source: "Oyesomi, A.A. (2026). Fragrance as an Imagined Toxicant. CBG 816 term paper, University of Lagos.",
  },
];
