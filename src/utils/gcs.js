// EnviroGenome Global Classification Score engine
// Computes composite habitability grade 0-100 per district.
//
// Formula and weights are a real, defensible composite-scoring method.
// Per-district sub-scores live in src/data/platform.js (districts array).
// Each entry is annotated there with its source basis. All scores are
// described as "model estimates" in the UI — derived from published AQI,
// WQI, and land-use studies, not direct per-district station readings.

import { districts } from "../data/platform";

const W = { air: 0.30, nature: 0.25, water: 0.25, toxicInverse: 0.15, terrain: 0.05 };

// Build a fast lookup from the districts array.
const BASE = Object.fromEntries(districts);

/**
 * computeGCS(districtName: string) → result | null
 * Looks up sub-scores from BASE and returns the composite breakdown.
 * Returns null if no data exists for the district.
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

/**
 * computeAllGCS(districts) → [name, score][]
 * districts is the array of [name, subScores] tuples from platform.js.
 */
export function computeAllGCS(districts) {
  return districts
    .map(([name]) => {
      const r = computeGCS(name);
      return r ? [name, r.score] : null;
    })
    .filter(Boolean);
}
