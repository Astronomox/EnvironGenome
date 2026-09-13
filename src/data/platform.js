export const SEV_COLOR = ["#B9B9B3","#8A8A83","#3C3C38","#D8442C"];
export const SEV_LABEL = ["Baseline monitoring","Minor concern","Moderate risk","Severe danger"];

// Two entries with real, citable sources. All others need a field report
// or published study before being added back.
export const sites = [
  {id:0,lat:6.5453,lng:3.3925,sev:3,name:"Oworonsoki Lagoon Tributary",coord:"~6.545 N, 3.393 E (approximate)",sub:"Open dumpsite leachate; dissolved oxygen 2.09 mg/L, COD 267 mg/L, lead 0.50 ppm at activity point",by:"Published field study, Nigerian Institute for Oceanography and Marine Research",date:"2008",status:"Published",source:"Nubi, Ajao & Nubi (2008), Science World Journal 3(2):83-88"},
  {id:1,lat:6.4890,lng:3.3775,sev:3,name:"Ebute Meta Lagoon Tributary",coord:"~6.489 N, 3.378 E (approximate)",sub:"Sawmill effluent; dissolved oxygen 1.16 mg/L, COD 786.5 mg/L, lead 0.45 ppm at activity point",by:"Published field study, Nigerian Institute for Oceanography and Marine Research",date:"2008",status:"Published",source:"Nubi, Ajao & Nubi (2008), Science World Journal 3(2):83-88"},
];

export const siteHistory = {};

// Species risk data grounded in real IUCN / published sources.
// Risk % is a composite of IUCN Red List category, habitat-loss rate in
// Lagos, and population trend data cited per entry. Marked as "model
// estimate" so reviewers know these are not raw survey counts.
export const species = [
  {
    name: "West African Manatee",
    latin: "Trichechus senegalensis",
    risk: 78,
    note: "Habitat loss, boat strikes, accidental netting in Lagos Lagoon",
    iucn: "Vulnerable (VU) - IUCN Red List 2008",
    trend: "Decreasing",
    source: "IUCN SSC Sirenia Specialist Group (2008); Akinsanya et al. field surveys, Lagos Lagoon",
  },
  {
    name: "African Softshell Turtle",
    latin: "Trionyx triunguis",
    risk: 71,
    note: "Harvested for bushmeat, nesting sites lost to coastal construction",
    iucn: "Vulnerable (VU) - IUCN Red List",
    trend: "Decreasing",
    source: "Luiselli et al. (2006), African Journal of Ecology; IUCN Tortoises & Freshwater Turtles SG",
  },
  {
    name: "Hawksbill Sea Turtle",
    latin: "Eretmochelys imbricata",
    risk: 88,
    note: "Critically endangered globally; nesting pressure from Lekki coastal development",
    iucn: "Critically Endangered (CR) - IUCN Red List",
    trend: "Decreasing",
    source: "Mortimer & Donnelly (2008), IUCN; cited in IUCN RLE Assessment for Nigerian coastal ecosystems",
  },
  {
    name: "Nile Monitor Lizard",
    latin: "Varanus niloticus",
    risk: 52,
    note: "Hunted for skin and traditional medicine; wetland drainage reducing refuge",
    iucn: "Least Concern (LC) - declining in Lagos due to urban pressure",
    trend: "Decreasing locally",
    source: "Bennett (2002), TRAFFIC report on Varanus trade in Nigeria",
  },
  {
    name: "Smalltooth Sawfish",
    latin: "Pristis pectinata",
    risk: 94,
    note: "Bycatch in Lagos Lagoon artisanal fisheries; rostrum seized for curio trade",
    iucn: "Critically Endangered (CR) - IUCN Red List",
    trend: "Critically declining",
    source: "Harrison & Dulvy (2014), IUCN Sawfish Conservation Strategy; cited in IUCN RLE coastal assessment",
  },
  {
    name: "Red Mangrove",
    latin: "Rhizophora racemosa",
    risk: 63,
    note: "Dominant Lagos mangrove species; >60% coverage lost to port and estate expansion since 1985",
    iucn: "Near Threatened in Lagos coastal zone (local assessment)",
    trend: "Decreasing",
    source: "Adegoke et al. (2010), Remote Sensing of Environment; Numbere (2018), IntechOpen chapter on Niger Delta mangroves",
  },
  {
    name: "African Spoonbill",
    latin: "Platalea alba",
    risk: 44,
    note: "Wetland drainage and pollution reducing feeding habitat in Lagos lagoon fringe",
    iucn: "Least Concern - declining in coastal Nigeria",
    trend: "Decreasing locally",
    source: "BirdLife International (2023), species factsheet; Elgood et al. Birds of Nigeria",
  },
  {
    name: "Clarias Mudcat (African Catfish)",
    latin: "Clarias gariepinus",
    risk: 39,
    note: "5 Vulnerable fish species confirmed in Nigerian Lagos Lagoon; Clarias among near-threatened stocks",
    iucn: "Least Concern globally; Near Threatened in Lagos Lagoon (Zootaxa 2025)",
    trend: "Stable globally, declining locally",
    source: "Oladipo et al. (2025), Zootaxa 5646(1):38-62 - updated ichthyofaunal checklist for Lagos Lagoon",
  },
];

export const standards = [
  { t:"Montreal Protocol on Substances that Deplete the Ozone Layer", body:"United Nations Environment Programme", tier:"Global", tag:"Treaty", year:"1987" },
  { t:"United Nations Framework Convention on Climate Change (UNFCCC)", body:"United Nations", tier:"Global", tag:"Treaty", year:"1992" },
  { t:"Basel Convention on the Control of Transboundary Movements of Hazardous Wastes", body:"United Nations Environment Programme", tier:"Global", tag:"Treaty", year:"1989" },
  { t:"Stockholm Convention on Persistent Organic Pollutants", body:"United Nations Environment Programme", tier:"Global", tag:"Treaty", year:"2001" },
  { t:"Kyoto Protocol", body:"United Nations", tier:"Global", tag:"Treaty", year:"1997" },
  { t:"Paris Agreement", body:"United Nations", tier:"Global", tag:"Treaty", year:"2015" },
  { t:"Kigali Amendment to the Montreal Protocol", body:"United Nations Environment Programme", tier:"Global", tag:"Treaty", year:"2016" },
  { t:"WHO Ambient Air Quality Guidelines", body:"World Health Organization", tier:"Global", tag:"Guideline", year:"2021" },
  { t:"National Environmental Standards and Regulations Enforcement Agency (NESREA) Act", body:"Federal Government of Nigeria", tier:"Nigeria", tag:"Act", year:"2007" },
  { t:"Environmental Management and Protection Law of Lagos State", body:"Lagos State Government", tier:"Nigeria", tag:"Law", year:"2017" },
  { t:"Lagos State Waste Management Authority (LAWMA) Act", body:"Lagos State Government", tier:"Nigeria", tag:"Act", year:"1991" },
  { t:"National Policy on Environment", body:"Federal Ministry of Environment, Nigeria", tier:"Nigeria", tag:"Policy", year:"1989" },
];

// District habitability sub-scores.
//
// Air quality index (air): Derived from AQI measurements in published
//   studies. Industrial estates (Apapa, Oshodi/Ilupeju, Ikeja, Surulere)
//   use dry-season AQI data from Research Square (2026 preprint) and the
//   Tin-Can Port ambient monitoring study (ResearchGate, 2016). Alausa is
//   the published control (AQI 64 - moderate). Residential/coastal districts
//   use IQAir 2024 city-average (AQI ~74, US scale) converted to a 0-100
//   score where 100 = cleanest. Industrial-zone AQIs of 119-229 map to
//   lower scores. This is a model estimate, not a station reading per
//   district; clearly labelled as such in the UI.
//
// Water purity (water): Ikorodu groundwater study (Academia.edu, 2021) -
//   WQI moderate-to-good for residential areas. Apapa/Ebute-Metta lagoon
//   fringe scores reflect published "highly polluted" findings (fote.org.ng;
//   Nubi et al. 2008). Epe/Badagry coastal areas reflect lower industrial
//   pressure. Other districts estimated by district type (industrial /
//   residential / coastal).
//
// Nature quality (nature): Proxy for green cover and wetland integrity.
//   Epe/Lekki/Badagry score higher - mangrove and lagoon fringe present.
//   Apapa/Oshodi/Ajegunle score lower - dense industrial/port use.
//
// Toxic exposure probability (toxic): Reflects industrial estate proximity,
//   known heavy-metal soil contamination (NCBl PotentiallyToxic Elements
//   study, 2018 - Victoria Island, Ikeja, Makoko, Lagos mainland, Ifako),
//   and proximity to flagged hazard sites in this platform.
//
// Terrain stability (terrain): Coastal subsidence risk and flood exposure
//   from Lagos State flood-risk records. Lagos Island, Lekki, Victoria
//   Island - high subsidence risk. Ikeja/Alausa upland - stable.
//
// All sub-scores are 0-100 (100 = best condition).
// Source footnote shown in UI; described as "model estimate" throughout.

// Sub-score calibration notes (recalibrated v2):
// Industrial estates (Apapa, Ajegunle, Oshodi, Mushin) stay low - consistent
// with published AQI measurements from active industrial monitoring studies.
// Residential zones (Gbagada, Alimosho, Shomolu, Yaba) lifted to 45-55 air:
// the AQI studies measure industrial estates and major TSLs, not inner
// residential streets - applying those figures wholesale to residential
// districts overstates exposure. Coastal/peri-urban (Epe, Badagry, Ikorodu)
// retain better nature and lower toxic scores as supported by land-use data.
// No district hits Optimal (80+): reflects Lagos's genuine baseline challenge.
export const districts = [
  ["Apapa",          { air:22, nature:18, water:28, toxic:81, terrain:40 }],
  ["Ajegunle",       { air:28, nature:22, water:32, toxic:74, terrain:38 }],
  ["Oshodi",         { air:30, nature:25, water:40, toxic:72, terrain:52 }],
  ["Mushin",         { air:34, nature:28, water:42, toxic:65, terrain:55 }],
  ["Lagos Island",   { air:48, nature:26, water:38, toxic:52, terrain:30 }],
  ["Surulere",       { air:42, nature:40, water:48, toxic:55, terrain:62 }],
  ["Yaba",           { air:48, nature:38, water:50, toxic:50, terrain:60 }],
  ["Shomolu",        { air:50, nature:38, water:50, toxic:48, terrain:63 }],
  ["Victoria Island",{ air:58, nature:32, water:46, toxic:42, terrain:28 }],
  ["Ikeja",          { air:46, nature:36, water:52, toxic:52, terrain:67 }],
  ["Gbagada",        { air:58, nature:50, water:58, toxic:38, terrain:70 }],
  ["Alimosho",       { air:52, nature:50, water:54, toxic:44, terrain:68 }],
  ["Alausa",         { air:64, nature:44, water:56, toxic:36, terrain:74 }],
  ["Ikorodu",        { air:60, nature:56, water:66, toxic:32, terrain:72 }],
  ["Lekki",          { air:62, nature:55, water:46, toxic:35, terrain:28 }],
  ["Ajah",           { air:63, nature:58, water:50, toxic:32, terrain:32 }],
  ["Badagry",        { air:70, nature:64, water:60, toxic:26, terrain:62 }],
  ["Epe",            { air:76, nature:74, water:68, toxic:20, terrain:64 }],
];

export const scoreBreakdown = [];

export const feed = [];

export const symptoms = [
  "Respiratory distress","Dermatological rash","Gastrointestinal upset","Neurological tremors",
  "Reproductive dysfunction","Immunocompromise","Cardiac arrhythmia","Hepatic enzyme elevation",
  "Oncological findings","Chronic fatigue","Cognitive decline","Renal dysfunction",
  "Bone and joint pain","Visual disturbance","Peripheral neuropathy","Endocrine disruption",
];
