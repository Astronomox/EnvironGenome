export const contaminants = [
  {
    name: "Benzene", cas: "71-43-2", formula: "C6H6", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Melting point","5.5 C"],["Boiling point","80.1 C"],["Solubility (water)","1.79 g/L"],
      ["Flash point","-11 F"],["Oral LD50 (rat)","930 mg/kg"],["OSHA PEL","1 ppm TWA"]],
    mutations: [
      ["Mus musculus","Tp53 / chr11","G to T transversion hotspot"],
      ["Homo sapiens","BRCA2 / chr13","Chromosome breakage"],
      ["Danio rerio","Sox2 / chr2","Developmental malformation"]],
    links: ["PubChem 241","TOXNET 71432","UniProt P04637","GenBank"]
  },
  {
    name: "Cadmium", cas: "7440-43-9", formula: "Cd", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Melting point","321 C"],["Boiling point","767 C"],["Density","8.65 g/cm3"],
      ["Oral LD50 (rat)","225 mg/kg"],["Half-life (renal)","10 to 30 yr"],["WHO water limit","0.003 mg/L"]],
    mutations: [
      ["Homo sapiens","GCN4 / chr16","DNA repair suppression"],
      ["Rattus norvegicus","MT1A / chr19","Metallothionein induction"],
      ["Oryza sativa","OsHMA3","Root uptake dysregulation"]],
    links: ["PubChem 23973","TOXNET 7440439","UniProt P02795"]
  },
  {
    name: "Lead", cas: "7439-92-1", formula: "Pb", iarc: "Group 2A Probable", genotoxic: true,
    props: [["Melting point","327.5 C"],["Boiling point","1749 C"],["Density","11.34 g/cm3"],
      ["Oral LD50 (rat)","N/A"],["Blood ref level","3.5 ug/dL"],["WHO water limit","0.01 mg/L"]],
    mutations: [
      ["Homo sapiens","ALAD / chr9","Enzyme inhibition, heme synthesis"],
      ["Homo sapiens","VDR / chr12","Calcium pathway disruption"]],
    links: ["PubChem 5352425","TOXNET 7439921"]
  },
  {
    name: "Mercury", cas: "7439-97-6", formula: "Hg", iarc: "Group 3", genotoxic: true,
    props: [["Melting point","-38.8 C"],["Boiling point","356.7 C"],["Density","13.53 g/cm3"],
      ["Vapor pressure","0.0018 mmHg"],["WHO water limit","0.006 mg/L"],["Half-life (blood)","44 to 80 d"]],
    mutations: [
      ["Homo sapiens","SEPP1 / chr5","Selenoprotein disruption"],
      ["Danio rerio","gfap","Neurodevelopmental injury"]],
    links: ["PubChem 23931","TOXNET 7439976"]
  },
  {
    name: "Arsenic", cas: "7440-38-2", formula: "As", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Melting point","817 C"],["Density","5.73 g/cm3"],["Oral LD50 (rat)","763 mg/kg"],
      ["WHO water limit","0.01 mg/L"],["Half-life","10 h to 4 d"]],
    mutations: [
      ["Homo sapiens","TP53 / chr17","Base substitution accumulation"],
      ["Homo sapiens","KRAS / chr12","Signaling activation"]],
    links: ["PubChem 5359596","TOXNET 7440382"]
  },
  {
    name: "Chromium VI", cas: "18540-29-9", formula: "CrO4(2-)", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Solubility","High (water)"],["Oral LD50 (rat)","50 to 100 mg/kg"],
      ["WHO water limit","0.05 mg/L"],["OSHA PEL","0.005 mg/m3"]],
    mutations: [
      ["Homo sapiens","p53 / chr17","DNA-protein crosslinks"],
      ["Mus musculus","Ogg1","Oxidative lesion repair failure"]],
    links: ["PubChem 24425","TOXNET 18540299"]
  },
  {
    name: "Toluene", cas: "108-88-3", formula: "C7H8", iarc: "Group 3", genotoxic: false,
    props: [["Melting point","-95 C"],["Boiling point","110.6 C"],["Solubility","0.52 g/L"],
      ["Flash point","4.4 C"],["OSHA PEL","200 ppm"]],
    mutations: [["Homo sapiens","CYP2E1","Metabolic activation variance"]],
    links: ["PubChem 1140","TOXNET 108883"]
  },
  {
    name: "Polychlorinated biphenyls", cas: "1336-36-3", formula: "C12H(10-n)Cl(n)", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["State","Oily liquid to resin"],["Solubility","Very low"],["Half-life (soil)","Years to decades"],
      ["Bioaccumulation","High"]],
    mutations: [
      ["Homo sapiens","AHR / chr7","Receptor-mediated toxicity"],
      ["Homo sapiens","CYP1A1","Enzyme overexpression"]],
    links: ["PubChem 36098","TOXNET 1336363"]
  },
  {
    name: "Benzo[a]pyrene", cas: "50-32-8", formula: "C20H12", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Melting point","179 C"],["Boiling point","495 C"],["Solubility","0.0016 mg/L"],
      ["Class","Polycyclic aromatic hydrocarbon"]],
    mutations: [
      ["Homo sapiens","TP53 codon 157","G to T transversion"],
      ["Mus musculus","Hprt","Point mutation induction"]],
    links: ["PubChem 2336","TOXNET 50328"]
  },
  {
    name: "Formaldehyde", cas: "50-00-0", formula: "CH2O", iarc: "Group 1 Carcinogen", genotoxic: true,
    props: [["Boiling point","-19 C"],["Solubility","400 g/L"],["OSHA PEL","0.75 ppm"],
      ["Odor threshold","0.05 ppm"]],
    mutations: [["Homo sapiens","DNA-protein crosslinks","Nasopharyngeal lesion pattern"]],
    links: ["PubChem 712","TOXNET 50000"]
  },
  {
    name: "Nitrate", cas: "14797-55-8", formula: "NO3(-)", iarc: "Not classified", genotoxic: false,
    props: [["Solubility","Very high"],["WHO water limit","50 mg/L"],["Source","Fertilizer runoff"]],
    mutations: [["Homo sapiens","Methemoglobin pathway","Infant blue baby syndrome"]],
    links: ["PubChem 943"]
  },
  {
    name: "Dichlorodiphenyltrichloroethane", cas: "50-29-3", formula: "C14H9Cl5", iarc: "Group 2A Probable", genotoxic: true,
    props: [["Melting point","108.5 C"],["Solubility","0.025 mg/L"],["Half-life (soil)","2 to 15 yr"],
      ["Bioaccumulation","Very high"]],
    mutations: [
      ["Homo sapiens","ESR1 / chr6","Endocrine disruption"],
      ["Rattus norvegicus","CYP3A","Hepatic enzyme induction"]],
    links: ["PubChem 3036","TOXNET 50293"]
  }
];
