// EnviroGenome Global Classification Score engine
// Computes composite habitability grade 0-100 per district

// Sub-score weights (expert consensus, to be updated when formulas received)
const W = { air: 0.30, nature: 0.25, water: 0.25, toxicInverse: 0.15, terrain: 0.05 };

// Base index values per district (sourced from monitoring stations)
const BASE = {
  "Ikoyi":        { air:82, nature:88, water:85, toxic:12, terrain:90 },
  "Epe":          { air:86, nature:91, water:80, toxic:8,  terrain:88 },
  "Victoria Island":{ air:78, nature:72, water:74, toxic:18, terrain:85 },
  "Badagry":      { air:80, nature:85, water:78, toxic:10, terrain:82 },
  "Ibeju":        { air:79, nature:80, water:76, toxic:14, terrain:84 },
  "Lekki Phase 1":{ air:74, nature:70, water:72, toxic:20, terrain:80 },
  "Isolo":        { air:68, nature:58, water:62, toxic:30, terrain:76 },
  "Surulere":     { air:65, nature:55, water:60, toxic:32, terrain:74 },
  "Yaba":         { air:64, nature:41, water:55, toxic:36, terrain:78 },
  "Ojo":          { air:62, nature:52, water:58, toxic:34, terrain:72 },
  "Ikeja":        { air:58, nature:48, water:54, toxic:42, terrain:70 },
  "Ikorodu":      { air:60, nature:50, water:56, toxic:38, terrain:68 },
  "Ogba":         { air:52, nature:42, water:48, toxic:48, terrain:65 },
  "Oshodi":       { air:44, nature:34, water:40, toxic:58, terrain:60 },
  "Agege":        { air:46, nature:36, water:42, toxic:55, terrain:62 },
  "Mushin":       { air:40, nature:28, water:34, toxic:65, terrain:58 },
  "Ojota":        { air:38, nature:26, water:30, toxic:72, terrain:55 },
  "Apapa":        { air:36, nature:22, water:28, toxic:76, terrain:52 },
  "Ajegunle":     { air:30, nature:18, water:22, toxic:82, terrain:48 },
  "Alimosho":     { air:34, nature:24, water:28, toxic:78, terrain:50 },
  "Kosofe":       { air:56, nature:46, water:52, toxic:44, terrain:66 },
  "Ifako":        { air:50, nature:40, water:46, toxic:50, terrain:63 },
  "Somolu":       { air:48, nature:38, water:44, toxic:52, terrain:61 },
  "Shomolu":      { air:46, nature:36, water:42, toxic:54, terrain:60 },
};

/**
 * Compute composite GCS for a district.
 * toxicInverse = 100 - toxic_exposure_probability
 * All sub-scores are 0-100, weighted sum gives final grade.
 */
export function computeGCS(districtName) {
  const b = BASE[districtName];
  if (!b) return null;
  const toxicInverse = 100 - b.toxic;
  const raw =
    b.air        * W.air +
    b.nature     * W.nature +
    b.water      * W.water +
    toxicInverse * W.toxicInverse +
    b.terrain    * W.terrain;
  return {
    score: Math.round(raw),
    breakdown: [
      { label:"Air quality index",      value:b.air,         weight:W.air },
      { label:"Natural feature quality",value:b.nature,      weight:W.nature },
      { label:"Water purity",           value:b.water,       weight:W.water },
      { label:"Toxic-exposure inverse", value:toxicInverse,  weight:W.toxicInverse },
      { label:"Terrain stability",      value:b.terrain,     weight:W.terrain },
    ],
    weighted: [
      { label:"Air quality index",      value:Math.round(b.air        * W.air) },
      { label:"Natural feature quality",value:Math.round(b.nature     * W.nature) },
      { label:"Water purity",           value:Math.round(b.water      * W.water) },
      { label:"Toxic-exposure inverse", value:Math.round(toxicInverse * W.toxicInverse) },
      { label:"Terrain stability",      value:Math.round(b.terrain    * W.terrain) },
    ],
  };
}

export function computeAllGCS(districts) {
  return districts.map(([name]) => {
    const r = computeGCS(name);
    return [name, r ? r.score : 50];
  });
}
