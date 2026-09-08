export const SEV_COLOR = ["#B9B9B3","#8A8A83","#3C3C38","#D8442C"];
export const SEV_LABEL = ["Baseline monitoring","Minor concern","Moderate risk","Severe danger"];

// The 40 invented hazard-site entries (fabricated researcher names, fake
// dates, fake validation status) have been removed. These two are the only
// entries with a real, citable source. Everything else needs a real field
// report, published study, or regulator record before it's added back.
export const sites = [
  {id:0,lat:6.5453,lng:3.3925,sev:3,name:"Oworonsoki Lagoon Tributary",coord:"~6.545 N, 3.393 E (approximate)",sub:"Open dumpsite leachate; dissolved oxygen 2.09 mg/L, COD 267 mg/L, lead 0.50 ppm at activity point",by:"Published field study, Nigerian Institute for Oceanography and Marine Research",date:"2008",status:"Published",source:"Nubi, Ajao & Nubi (2008), Science World Journal 3(2):83-88"},
  {id:1,lat:6.4890,lng:3.3775,sev:3,name:"Ebute Meta Lagoon Tributary",coord:"~6.489 N, 3.378 E (approximate)",sub:"Sawmill effluent; dissolved oxygen 1.16 mg/L, COD 786.5 mg/L, lead 0.45 ppm at activity point",by:"Published field study, Nigerian Institute for Oceanography and Marine Research",date:"2008",status:"Published",source:"Nubi, Ajao & Nubi (2008), Science World Journal 3(2):83-88"},
];

// No real month-by-month severity history exists for these two points (the
// source paper is a single 2008 field survey, not a time series). The old
// Math.random()-generated 12-month trend was fabricated and has been
// removed rather than left in place.
export const siteHistory = {};

// Species risk percentages were invented numbers with no source. Empty
// until real IUCN Red List / conservation-body data is attached.
export const species = [];

// Real, well-established instruments only. Exact amendment/revision dates
// beyond what's in Standards.jsx's REV_DATA lookup are not claimed here.
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

// District habitability scores (and their air/nature/water/toxic/terrain
// sub-scores in utils/gcs.js) were invented numbers with a comment falsely
// claiming they were "sourced from monitoring stations." Emptied.
export const districts = [];

// Composite score category weights/values were invented alongside districts.
export const scoreBreakdown = [];

// The "recent activity" feed was entirely fabricated events.
export const feed = [];

// This is a generic clinical symptom checklist (categories, not claims or
// statistics), used as checkbox options on the intake form. Kept as-is.
export const symptoms = [
  "Respiratory distress","Dermatological rash","Gastrointestinal upset","Neurological tremors",
  "Reproductive dysfunction","Immunocompromise","Cardiac arrhythmia","Hepatic enzyme elevation",
  "Oncological findings","Chronic fatigue","Cognitive decline","Renal dysfunction",
  "Bone and joint pain","Visual disturbance","Peripheral neuropathy","Endocrine disruption",
];
