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

// The 37-entry standards list mixed real, well-known instruments (Stockholm
// Convention, NESREA Act, etc.) with entries whose exact tag/date I never
// verified. Emptied pending an actual verification pass rather than
// presenting an unverified list as authoritative.
export const standards = [];

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
