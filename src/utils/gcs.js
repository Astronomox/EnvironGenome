// EnviroGenome Global Classification Score engine
// Computes composite habitability grade 0-100 per district.
//
// The formula and weights below are a real, defensible composite-scoring
// method. The per-district input numbers that used to live here (BASE) were
// invented, with a comment falsely claiming they were "sourced from
// monitoring stations" -- they were not sourced from anything. That table
// has been removed. Feed real per-district sub-scores in through the
// `districts` export in src/data/platform.js (currently empty) before this
// module has anything to compute.

const W = { air: 0.30, nature: 0.25, water: 0.25, toxicInverse: 0.15, terrain: 0.05 };

// Real per-district input data goes here once it exists. Empty until then.
const BASE = {};

/**
 * Compute composite GCS for a district.
 * toxicInverse = 100 - toxic_exposure_probability
 * All sub-scores are 0-100, weighted sum gives final grade.
 * Returns null if there is no data for the district -- callers must handle
 * that rather than a fabricated placeholder score.
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

// Only returns entries that actually have real data -- no more silent
// fallback to an invented score of 50 for districts with nothing behind them.
export function computeAllGCS(districts) {
  return districts
    .map(([name]) => {
      const r = computeGCS(name);
      return r ? [name, r.score] : null;
    })
    .filter(Boolean);
}
