export const SEV_COLOR = ["#B9B9B3","#8A8A83","#3C3C38","#D8442C"];
export const SEV_LABEL = ["Baseline monitoring","Minor concern","Moderate risk","Severe danger"];

export const sites = [
  {id:0,lat:6.5883,lng:3.3792,sev:3,name:"Ojota Industrial Belt",coord:"6.5883 N, 3.3792 E",sub:"Lead and PCB mixture",by:"Dr. Adebayo, UNILAG",date:"2026-07-03",status:"Pending verification"},
  {id:1,lat:6.4489,lng:3.3595,sev:3,name:"Apapa Port Fringe",coord:"6.4489 N, 3.3595 E",sub:"Petroleum PAH runoff",by:"O. Nwosu, UNILAG Field Unit",date:"2026-07-02",status:"Pending verification"},
  {id:2,lat:6.6018,lng:3.3515,sev:2,name:"Ikeja Effluent Channel",coord:"6.6018 N, 3.3515 E",sub:"Chromium VI discharge",by:"LASEPA joint audit",date:"2026-06-30",status:"Validated"},
  {id:3,lat:6.6152,lng:3.3205,sev:2,name:"Agege Canal",coord:"6.6152 N, 3.3205 E",sub:"Untreated tannery waste",by:"Dr. Bello, UNILAG",date:"2026-06-28",status:"Validated"},
  {id:4,lat:6.4698,lng:3.5852,sev:1,name:"Lekki Lagoon Edge",coord:"6.4698 N, 3.5852 E",sub:"Elevated nitrate",by:"Marine survey team",date:"2026-06-25",status:"Monitoring"},
  {id:5,lat:6.4318,lng:2.8876,sev:0,name:"Badagry Wetland",coord:"6.4318 N, 2.8876 E",sub:"Baseline reference site",by:"Conservation unit",date:"2026-06-20",status:"Monitoring"},
  {id:6,lat:6.5244,lng:3.3792,sev:2,name:"Yaba Rail Corridor",coord:"6.5244 N, 3.3792 E",sub:"Diesel particulate load",by:"Air quality station 7",date:"2026-06-19",status:"Validated"},
  {id:7,lat:6.4550,lng:3.3841,sev:3,name:"Ijora Backwater",coord:"6.4550 N, 3.3841 E",sub:"Heavy metal sediment",by:"Dr. Okonkwo, UNILAG",date:"2026-06-18",status:"Pending verification"},
  {id:8,lat:6.6289,lng:3.3486,sev:1,name:"Oregun Drainage",coord:"6.6289 N, 3.3486 E",sub:"Elevated turbidity",by:"LASEPA patrol",date:"2026-06-15",status:"Monitoring"},
  {id:9,lat:6.4281,lng:3.4219,sev:2,name:"Victoria Island Shore",coord:"6.4281 N, 3.4219 E",sub:"Microplastic accumulation",by:"Coastal team",date:"2026-06-12",status:"Validated"},
  {id:10,lat:6.5966,lng:3.3421,sev:1,name:"Mushin Market Zone",coord:"6.5966 N, 3.3421 E",sub:"Air quality exceedance",by:"Station 3",date:"2026-06-10",status:"Monitoring"},
  {id:11,lat:6.4924,lng:3.3583,sev:3,name:"Iddo Terminus",coord:"6.4924 N, 3.3583 E",sub:"Fuel depot contamination",by:"Dr. Adebayo, UNILAG",date:"2026-06-08",status:"Pending verification"},
  {id:12,lat:6.5355,lng:3.3087,sev:0,name:"Isolo Green Belt",coord:"6.5355 N, 3.3087 E",sub:"Reference clean site",by:"Conservation unit",date:"2026-06-05",status:"Monitoring"},
  {id:13,lat:6.4402,lng:3.4736,sev:1,name:"Lekki Phase 1 Canal",coord:"6.4402 N, 3.4736 E",sub:"Nutrient loading",by:"Marine survey team",date:"2026-06-03",status:"Monitoring"},
  {id:14,lat:6.6500,lng:3.3600,sev:2,name:"Ogba Industrial Park",coord:"6.6500 N, 3.3600 E",sub:"Solvent vapor plume",by:"LASEPA joint audit",date:"2026-06-01",status:"Validated"},
  {id:15,lat:6.4600,lng:3.3900,sev:3,name:"Lagos Island Backstreet",coord:"6.4600 N, 3.3900 E",sub:"Benzene and toluene mix",by:"Dr. Okafor, UNILAG",date:"2026-05-28",status:"Validated"},
  {id:16,lat:6.5700,lng:3.3400,sev:2,name:"Oshodi Underpass Drain",coord:"6.5700 N, 3.3400 E",sub:"Oily runoff, heavy metals",by:"LASEPA",date:"2026-05-25",status:"Validated"},
  {id:17,lat:6.6000,lng:3.2900,sev:1,name:"Abule Egba Wetland",coord:"6.6000 N, 3.2900 E",sub:"Mild phosphate elevation",by:"Conservation unit",date:"2026-05-22",status:"Monitoring"},
  {id:18,lat:6.4100,lng:3.4200,sev:0,name:"Ikoyi Lagoon North",coord:"6.4100 N, 3.4200 E",sub:"Clean reference, lagoon",by:"Marine survey team",date:"2026-05-18",status:"Monitoring"},
  {id:19,lat:6.5100,lng:3.3700,sev:3,name:"Surulere Dumpsite",coord:"6.5100 N, 3.3700 E",sub:"Leachate contamination, mixed waste",by:"Dr. Bello, UNILAG",date:"2026-05-15",status:"Pending verification"},
  {id:20,lat:6.4800,lng:3.3600,sev:2,name:"Badia East Canal",coord:"6.4800 N, 3.3600 E",sub:"Faecal coliform, sewage",by:"LUTH environmental team",date:"2026-05-12",status:"Validated"},
  {id:21,lat:6.6100,lng:3.3800,sev:1,name:"Ketu Bus Terminal",coord:"6.6100 N, 3.3800 E",sub:"Diesel NOx, PM2.5 peaks",by:"Air station 12",date:"2026-05-10",status:"Monitoring"},
  {id:22,lat:6.5400,lng:3.4000,sev:2,name:"Gbagada Industrial Corridor",coord:"6.5400 N, 3.4000 E",sub:"Solvent discharge, toluene",by:"LASEPA patrol",date:"2026-05-08",status:"Validated"},
  {id:23,lat:6.4300,lng:3.4400,sev:1,name:"Onikan Waterfront",coord:"6.4300 N, 3.4400 E",sub:"Microplastics, mild hydrocarbons",by:"Coastal team",date:"2026-05-05",status:"Monitoring"},
  {id:24,lat:6.6400,lng:3.3100,sev:0,name:"Ipaja Forest Fringe",coord:"6.6400 N, 3.3100 E",sub:"Baseline reference, peri-urban",by:"Conservation unit",date:"2026-04-30",status:"Monitoring"},
  {id:25,lat:6.4700,lng:3.5200,sev:2,name:"Lekki Free Trade Zone",coord:"6.4700 N, 3.5200 E",sub:"Chemical storage effluent",by:"Dr. Adebayo, UNILAG",date:"2026-04-28",status:"Pending verification"},
  {id:26,lat:6.5600,lng:3.3200,sev:3,name:"Alimosho Refuse Dump",coord:"6.5600 N, 3.3200 E",sub:"Methane, leachate, heavy metals",by:"LASEPA",date:"2026-04-25",status:"Validated"},
  {id:27,lat:6.4400,lng:3.4600,sev:1,name:"Elegushi Beach Fringe",coord:"6.4400 N, 3.4600 E",sub:"Elevated coliform from boats",by:"Marine survey team",date:"2026-04-22",status:"Monitoring"},
  {id:28,lat:6.6200,lng:3.4200,sev:2,name:"Magodo Drainage Outlet",coord:"6.6200 N, 3.4200 E",sub:"Pesticide and herbicide runoff",by:"Dr. Okonkwo, UNILAG",date:"2026-04-18",status:"Validated"},
  {id:29,lat:6.5000,lng:3.3500,sev:2,name:"Otto Wharf",coord:"6.5000 N, 3.3500 E",sub:"Bunker oil residues",by:"Port Authority",date:"2026-04-15",status:"Validated"},
  {id:30,lat:6.4600,lng:3.3300,sev:3,name:"Ajegunle Creek",coord:"6.4600 N, 3.3300 E",sub:"Crude oil sheen, PCBs",by:"Dr. Adebayo, UNILAG",date:"2026-04-12",status:"Validated"},
  {id:31,lat:6.5500,lng:3.4300,sev:1,name:"Anthony Village Drain",coord:"6.5500 N, 3.4300 E",sub:"Mild zinc elevation",by:"LASEPA patrol",date:"2026-04-08",status:"Monitoring"},
  {id:32,lat:6.6300,lng:3.3500,sev:0,name:"Ojodu Berger Roadside",coord:"6.6300 N, 3.3500 E",sub:"Baseline road-edge monitoring",by:"Air station 9",date:"2026-04-05",status:"Monitoring"},
  {id:33,lat:6.4200,lng:3.4000,sev:2,name:"Bar Beach Storm Drain",coord:"6.4200 N, 3.4000 E",sub:"Plastic and hydrocarbon mix",by:"Coastal team",date:"2026-04-02",status:"Validated"},
  {id:34,lat:6.5300,lng:3.3300,sev:1,name:"Ilupeju Factory Row",coord:"6.5300 N, 3.3300 E",sub:"Elevated SO2 from manufacturing",by:"LASEPA",date:"2026-03-28",status:"Monitoring"},
  {id:35,lat:6.4900,lng:3.3800,sev:3,name:"Olodi Apapa Chemical Store",coord:"6.4900 N, 3.3800 E",sub:"Chlorine and ammonia leak history",by:"Dr. Okafor, UNILAG",date:"2026-03-25",status:"Validated"},
  {id:36,lat:6.6600,lng:3.3900,sev:1,name:"Owode-Onirin Scrapyard",coord:"6.6600 N, 3.3900 E",sub:"Lead, cadmium from e-waste",by:"LASEPA patrol",date:"2026-03-20",status:"Monitoring"},
  {id:37,lat:6.4500,lng:3.5600,sev:0,name:"Epe Lagoon East",coord:"6.4500 N, 3.5600 E",sub:"Clean lagoon reference",by:"Conservation unit",date:"2026-03-15",status:"Monitoring"},
  {id:38,lat:6.5800,lng:3.3600,sev:2,name:"Palmgrove Industrial Drain",coord:"6.5800 N, 3.3600 E",sub:"Paint factory effluent, lead",by:"Dr. Bello, UNILAG",date:"2026-03-10",status:"Validated"},
  {id:39,lat:6.5100,lng:3.4100,sev:2,name:"Costain Overpass Storm Pond",coord:"6.5100 N, 3.4100 E",sub:"Stormwater metals, oil sheen",by:"LASEPA",date:"2026-03-05",status:"Validated"},
];

// historical severity snapshots per site (12 months, index 0 = 12 months ago)
export const siteHistory = Object.fromEntries(
  sites.map(s => [s.id, Array.from({length:12}, (_, i) => {
    const base = s.sev;
    const delta = Math.round((Math.random() - 0.45) * 1.2);
    return Math.max(0, Math.min(3, base + (i < 6 ? -1 : 0) + (i > 9 ? delta : 0)));
  })])
);

export const species = [
  {name:"West African Manatee",latin:"Trichechus senegalensis",risk:88,note:"Habitat loss velocity: high"},
  {name:"Sclater's Guenon",latin:"Cercopithecus sclateri",risk:72,note:"Fragmentation and hunting pressure"},
  {name:"Pel's Fishing Owl",latin:"Scotopelia peli",risk:54,note:"Waterway contamination"},
  {name:"Mangrove Periwinkle",latin:"Tympanotonus fuscatus",risk:31,note:"Recoverable with intervention"},
  {name:"African Slender-snouted Crocodile",latin:"Mecistops cataphractus",risk:79,note:"Wetland drainage"},
  {name:"White-throated Guenon",latin:"Cercopithecus erythrogaster",risk:68,note:"Forest clearance"},
  {name:"Niger Delta Red Colobus",latin:"Piliocolobus epieni",risk:91,note:"Critical, oil pollution"},
  {name:"African Manatee Grass",latin:"Vossia cuspidata",risk:24,note:"Stable population"},
];

export const standards = [
  {t:"Stockholm Convention on Persistent Organic Pollutants",body:"Global, UNEP",tier:"Global",tag:"Treaty"},
  {t:"Basel Convention on Transboundary Movements of Hazardous Wastes",body:"Global, UNEP",tier:"Global",tag:"Treaty"},
  {t:"Minamata Convention on Mercury",body:"Global, UNEP",tier:"Global",tag:"Treaty"},
  {t:"Paris Agreement Climate Obligations",body:"Global, UNFCCC",tier:"Global",tag:"Treaty"},
  {t:"WHO Ambient Air Quality Guidelines",body:"Global, WHO",tier:"Global",tag:"Guideline, 2021"},
  {t:"FAO Code of Conduct for Responsible Fisheries",body:"Global, FAO",tier:"Global",tag:"Code"},
  {t:"IUCN Red List Categories and Criteria",body:"Global, IUCN",tier:"Global",tag:"Framework"},
  {t:"OECD Chemical Safety Test Guidelines (Series 100 to 899)",body:"Global, OECD",tier:"Global",tag:"Guideline series"},
  {t:"UN SDG Targets 3, 6, 11, 13, 14, 15",body:"Global, UN",tier:"Global",tag:"Framework"},
  {t:"Rotterdam Convention on Prior Informed Consent",body:"Global, UNEP/FAO",tier:"Global",tag:"Treaty"},
  {t:"Cartagena Protocol on Biosafety",body:"Global, CBD",tier:"Global",tag:"Protocol"},
  {t:"WHO Drinking Water Quality Guidelines",body:"Global, WHO",tier:"Global",tag:"Guideline, 4th ed."},
  {t:"UNEP Global Mercury Assessment",body:"Global, UNEP",tier:"Global",tag:"Assessment"},
  {t:"IPBES Biodiversity and Ecosystem Services Framework",body:"Global, IPBES",tier:"Global",tag:"Framework"},
  {t:"African Union Convention on Nature and Natural Resources",body:"Continental, AU",tier:"Regional",tag:"Convention"},
  {t:"ECOWAS Environmental Impact Assessment Procedures",body:"Regional, ECOWAS",tier:"Regional",tag:"Manual"},
  {t:"COMESA Green Commerce Provisions",body:"Regional, COMESA",tier:"Regional",tag:"Clause"},
  {t:"NEPAD Integrated Coastal Zone Management Framework",body:"Regional, NEPAD",tier:"Regional",tag:"Framework"},
  {t:"SADC Mining Pollution Prevention Treaty",body:"Regional, SADC",tier:"Regional",tag:"Treaty"},
  {t:"Abidjan Convention on West and Central African Marine Environment",body:"Regional, UNEP",tier:"Regional",tag:"Convention"},
  {t:"Bamako Convention on Hazardous Wastes in Africa",body:"Continental, AU/OAU",tier:"Regional",tag:"Convention"},
  {t:"East African Community Environment Management Act",body:"Regional, EAC",tier:"Regional",tag:"Act"},
  {t:"Federal Environmental Quality Standards Act (Cap E10)",body:"Nigeria, Federal",tier:"Nigeria",tag:"Statute, 2004"},
  {t:"National Effluent Limitation Regulation (SI 2003 No 179)",body:"Nigeria, NESREA",tier:"Nigeria",tag:"Regulation"},
  {t:"Hazardous Chemical Substance Control Decree No 34",body:"Nigeria, Federal",tier:"Nigeria",tag:"Decree, 1988"},
  {t:"National Oil Spill Detection Response Agency (NOSDRA) Act",body:"Nigeria, NOSDRA",tier:"Nigeria",tag:"Act"},
  {t:"NESREA Enforcement Sanctions Schedule",body:"Nigeria, NESREA",tier:"Nigeria",tag:"Bulletin"},
  {t:"Lagos State Environmental Management Protection Law",body:"Nigeria, Lagos State",tier:"Nigeria",tag:"Law, 2017"},
  {t:"Lagos State Waste Management Authority By-Laws",body:"Nigeria, Lagos State",tier:"Nigeria",tag:"By-law"},
  {t:"Rivers State Environment Protection Board Rules",body:"Nigeria, Rivers State",tier:"Nigeria",tag:"Rules, 2025"},
  {t:"National Environmental Standards and Regulations Enforcement Agency Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act, 2007"},
  {t:"Environmental Impact Assessment Decree No 86",body:"Nigeria, Federal",tier:"Nigeria",tag:"Decree, 1992"},
  {t:"Petroleum (Drilling and Production) Regulations",body:"Nigeria, DPR",tier:"Nigeria",tag:"Regulation"},
  {t:"National Water Resources Institute Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act"},
  {t:"Harmful Waste Special Criminal Provisions Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act, 1988"},
  {t:"Land Use Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act, 1978"},
  {t:"Minerals and Mining Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act, 2007"},
  {t:"Niger Delta Development Commission Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act, 2000"},
  {t:"National Inland Waterways Authority Act",body:"Nigeria, Federal",tier:"Nigeria",tag:"Act"},
  {t:"Kano State Pollution Control Regulations",body:"Nigeria, Kano State",tier:"Nigeria",tag:"Regulation"},
];

export const districts = [
  ["Ikoyi",84],["Epe",81],["Victoria Island",79],["Badagry",76],["Ibeju",74],["Lekki Phase 1",72],
  ["Isolo",63],["Surulere",61],["Yaba",58],["Ojo",57],["Ikeja",55],["Ikorodu",53],
  ["Ogba",49],["Oshodi",41],["Agege",44],["Mushin",38],["Ojota",36],["Apapa",34],
  ["Ajegunle",29],["Alimosho",32],["Kosofe",52],["Ifako",47],["Somolu",45],["Shomolu",43],
];

export const scoreBreakdown = [
  ["Air quality index",64],["Natural feature quality",41],["Water purity",55],
  ["Toxic-exposure inverse",52],["Terrain stability",78],
];

export const feed = [
  ["09:42","<b>Cadmium</b> linked to GCN4 disruption"],
  ["09:15","Zone <b>Ojota-LA23</b> rated Level 3 by Dr. Adebayo, UNILAG"],
  ["08:50","WHO ambient air guideline revision indexed"],
  ["08:31","Therapy referral <b>#4582</b> opened at LUTH"],
  ["07:58","Benzene to <b>Tp53</b> transversion record peer-approved"],
  ["07:20","New site flagged at <b>Iddo Terminus</b>, pending review"],
  ["06:45","Arsenic to KRAS correlation submitted for moderation"],
];

export const symptoms = [
  "Respiratory distress","Dermatological rash","Gastrointestinal upset","Neurological tremors",
  "Reproductive dysfunction","Immunocompromise","Cardiac arrhythmia","Hepatic enzyme elevation",
  "Oncological findings","Chronic fatigue","Cognitive decline","Renal dysfunction",
  "Bone and joint pain","Visual disturbance","Peripheral neuropathy","Endocrine disruption",
];
