export const SEV_COLOR = ["#B9B9B3","#8A8A83","#3C3C38","#D8442C"];
export const SEV_LABEL = ["Baseline monitoring","Minor concern","Moderate risk","Severe danger"];

export const sites = [
  { id:0, lat:6.5883, lng:3.3792, sev:3, name:"Ojota Industrial Belt", coord:"6.5883 N, 3.3792 E", sub:"Lead and PCB mixture", by:"Dr. Adebayo, UNILAG", date:"2026-07-03", status:"Pending verification" },
  { id:1, lat:6.4489, lng:3.3595, sev:3, name:"Apapa Port Fringe", coord:"6.4489 N, 3.3595 E", sub:"Petroleum PAH runoff", by:"O. Nwosu, UNILAG Field Unit", date:"2026-07-02", status:"Pending verification" },
  { id:2, lat:6.6018, lng:3.3515, sev:2, name:"Ikeja Effluent Channel", coord:"6.6018 N, 3.3515 E", sub:"Chromium VI discharge", by:"LASEPA joint audit", date:"2026-06-30", status:"Validated" },
  { id:3, lat:6.6152, lng:3.3205, sev:2, name:"Agege Canal", coord:"6.6152 N, 3.3205 E", sub:"Untreated tannery waste", by:"Dr. Bello, UNILAG", date:"2026-06-28", status:"Validated" },
  { id:4, lat:6.4698, lng:3.5852, sev:1, name:"Lekki Lagoon Edge", coord:"6.4698 N, 3.5852 E", sub:"Elevated nitrate", by:"Marine survey team", date:"2026-06-25", status:"Monitoring" },
  { id:5, lat:6.4318, lng:2.8876, sev:0, name:"Badagry Wetland", coord:"6.4318 N, 2.8876 E", sub:"Baseline reference site", by:"Conservation unit", date:"2026-06-20", status:"Monitoring" },
  { id:6, lat:6.5244, lng:3.3792, sev:2, name:"Yaba Rail Corridor", coord:"6.5244 N, 3.3792 E", sub:"Diesel particulate load", by:"Air quality station 7", date:"2026-06-19", status:"Validated" },
  { id:7, lat:6.4550, lng:3.3841, sev:3, name:"Ijora Backwater", coord:"6.4550 N, 3.3841 E", sub:"Heavy metal sediment", by:"Dr. Okonkwo, UNILAG", date:"2026-06-18", status:"Pending verification" },
  { id:8, lat:6.6289, lng:3.3486, sev:1, name:"Oregun Drainage", coord:"6.6289 N, 3.3486 E", sub:"Elevated turbidity", by:"LASEPA patrol", date:"2026-06-15", status:"Monitoring" },
  { id:9, lat:6.4281, lng:3.4219, sev:2, name:"Victoria Island Shore", coord:"6.4281 N, 3.4219 E", sub:"Microplastic accumulation", by:"Coastal team", date:"2026-06-12", status:"Validated" },
  { id:10, lat:6.5966, lng:3.3421, sev:1, name:"Mushin Market Zone", coord:"6.5966 N, 3.3421 E", sub:"Air quality exceedance", by:"Station 3", date:"2026-06-10", status:"Monitoring" },
  { id:11, lat:6.4924, lng:3.3583, sev:3, name:"Iddo Terminus", coord:"6.4924 N, 3.3583 E", sub:"Fuel depot contamination", by:"Dr. Adebayo, UNILAG", date:"2026-06-08", status:"Pending verification" },
  { id:12, lat:6.5355, lng:3.3087, sev:0, name:"Isolo Green Belt", coord:"6.5355 N, 3.3087 E", sub:"Reference clean site", by:"Conservation unit", date:"2026-06-05", status:"Monitoring" },
  { id:13, lat:6.4402, lng:3.4736, sev:1, name:"Lekki Phase 1 Canal", coord:"6.4402 N, 3.4736 E", sub:"Nutrient loading", by:"Marine survey team", date:"2026-06-03", status:"Monitoring" },
  { id:14, lat:6.6500, lng:3.3600, sev:2, name:"Ogba Industrial Park", coord:"6.6500 N, 3.3600 E", sub:"Solvent vapor plume", by:"LASEPA joint audit", date:"2026-06-01", status:"Validated" }
];

export const species = [
  { name:"West African Manatee", latin:"Trichechus senegalensis", risk:88, note:"Habitat loss velocity: high" },
  { name:"Sclater's Guenon", latin:"Cercopithecus sclateri", risk:72, note:"Fragmentation and hunting pressure" },
  { name:"Pel's Fishing Owl", latin:"Scotopelia peli", risk:54, note:"Waterway contamination" },
  { name:"Mangrove Periwinkle", latin:"Tympanotonus fuscatus", risk:31, note:"Recoverable with intervention" },
  { name:"African Slender-snouted Crocodile", latin:"Mecistops cataphractus", risk:79, note:"Wetland drainage" },
  { name:"White-throated Guenon", latin:"Cercopithecus erythrogaster", risk:68, note:"Forest clearance" },
  { name:"Niger Delta Red Colobus", latin:"Piliocolobus epieni", risk:91, note:"Critical, oil pollution" },
  { name:"African Manatee Grass", latin:"Vossia cuspidata", risk:24, note:"Stable population" }
];

export const standards = [
  { t:"Stockholm Convention on POPs", body:"Global, UNEP", tier:"Global", tag:"Treaty" },
  { t:"Basel Convention on Hazardous Waste Movements", body:"Global, UNEP", tier:"Global", tag:"Treaty" },
  { t:"Minamata Convention on Mercury", body:"Global, UNEP", tier:"Global", tag:"Treaty" },
  { t:"Paris Agreement Climate Obligations", body:"Global, UNFCCC", tier:"Global", tag:"Treaty" },
  { t:"WHO Ambient Air Quality Guidelines", body:"Global, WHO", tier:"Global", tag:"Guideline, 2021" },
  { t:"FAO Code of Conduct for Responsible Fisheries", body:"Global, FAO", tier:"Global", tag:"Code" },
  { t:"IUCN Red List Categories and Criteria", body:"Global, IUCN", tier:"Global", tag:"Framework" },
  { t:"OECD Chemical Safety Test Guidelines", body:"Global, OECD", tier:"Global", tag:"Guideline series" },
  { t:"SDG Targets 3, 6, 11, 13, 14, 15", body:"Global, UN", tier:"Global", tag:"Framework" },
  { t:"African Union Convention on Nature Conservation", body:"Continental, AU", tier:"Regional", tag:"Convention" },
  { t:"ECOWAS Environmental Impact Assessment Procedures", body:"Regional, ECOWAS", tier:"Regional", tag:"Manual" },
  { t:"COMESA Green Commerce Provisions", body:"Regional, COMESA", tier:"Regional", tag:"Clause" },
  { t:"NEPAD Integrated Coastal Zone Framework", body:"Regional, NEPAD", tier:"Regional", tag:"Framework" },
  { t:"SADC Mining Pollution Prevention Treaty", body:"Regional, SADC", tier:"Regional", tag:"Treaty" },
  { t:"Federal Environmental Quality Standards Act (Cap E10)", body:"Nigeria, Federal", tier:"Nigeria", tag:"Statute, 2004" },
  { t:"National Effluent Limitation Regulation (SI 2003 No 179)", body:"Nigeria, NESREA", tier:"Nigeria", tag:"Regulation" },
  { t:"Hazardous Chemical Substance Control Decree No 34", body:"Nigeria, Federal", tier:"Nigeria", tag:"Decree, 1988" },
  { t:"National Oil Spill Detection Response Agency Order", body:"Nigeria, NOSDRA", tier:"Nigeria", tag:"Order" },
  { t:"NESREA Enforcement Sanctions Schedule", body:"Nigeria, NESREA", tier:"Nigeria", tag:"Bulletin" },
  { t:"Lagos State Waste Management Authority By-Laws", body:"Nigeria, Lagos State", tier:"Nigeria", tag:"By-law" },
  { t:"Rivers State Environment Protection Board Rules", body:"Nigeria, Rivers State", tier:"Nigeria", tag:"Rules, 2025" },
  { t:"Lagos State Environmental Management Protection Law", body:"Nigeria, Lagos State", tier:"Nigeria", tag:"Law, 2017" }
];

export const districts = [
  ["Ikoyi",84],["Victoria Island",79],["Lekki Phase 1",72],["Yaba",58],["Surulere",61],["Ikeja",55],
  ["Mushin",38],["Ajegunle",29],["Apapa",34],["Oshodi",41],["Agege",44],["Badagry",76],
  ["Ojota",36],["Isolo",63],["Ogba",49],["Ojo",57],["Epe",81],["Ibeju",74]
];

export const scoreBreakdown = [
  ["Air quality index",64],["Natural feature quality",41],["Water purity",55],
  ["Toxic-exposure inverse",52],["Terrain stability",78]
];

export const feed = [
  ["09:42", "<b>Cadmium</b> linked to GCN4 disruption"],
  ["09:15", "Zone <b>Ojota-LA23</b> rated Level 3 by Dr. Adebayo, UNILAG"],
  ["08:50", "WHO ambient air guideline revision indexed"],
  ["08:31", "Therapy referral <b>#4582</b> opened at LUTH"],
  ["07:58", "Benzene to <b>Tp53</b> transversion record peer-approved"],
  ["07:20", "New site flagged at <b>Iddo Terminus</b>, pending review"],
  ["06:45", "Arsenic to KRAS correlation submitted for moderation"]
];

export const symptoms = ["Respiratory distress","Dermatological rash","Gastrointestinal upset",
  "Neurological tremors","Reproductive dysfunction","Immunocompromise","Cardiac arrhythmia",
  "Hepatic enzyme elevation","Oncological findings","Chronic fatigue"];
