import type { ChoiceQuestion, NoulCriteria, NoulQuestion, ScoreQuestion } from "./types.js";

/** Noul criteria as accepted by `noul()`, including the legacy spellings. */
export interface NoulCriteriaInput extends NoulCriteria {
  /** @deprecated Use `true`. Sent as `true`; the engine ignores a `pos` key. */
  pos?: string;
  /** @deprecated Use `false`. Sent as `false`; the engine ignores a `neg` key. */
  neg?: string;
}

/**
 * Build a discrete categorical Choice question.
 */
export function choice(
  instructions: string,
  criteria: Record<string, string | null> | string[]
): ChoiceQuestion {
  const normCriteria: Record<string, string | null> = Array.isArray(criteria)
    ? Object.fromEntries(criteria.map((c) => [c, null]))
    : criteria;

  return {
    type: "choice",
    instructions,
    criteria: normCriteria,
  };
}

/**
 * Build a binary verification Noul (Yes/No probability) question.
 */
export function noul(
  instructions: string,
  criteria?: NoulCriteriaInput | null
): NoulQuestion {
  return {
    type: "noul",
    instructions,
    criteria: criteria ? normalizeNoulCriteria(criteria) : null,
  };
}

/**
 * Maps the legacy `pos`/`neg` keys onto the `true`/`false` keys the engine reads
 * (it silently ignores anything else, which turned such questions zero-shot).
 */
function normalizeNoulCriteria(criteria: NoulCriteriaInput): NoulCriteria | null {
  const out: NoulCriteria = {};
  for (const [legacy, key] of [["pos", "true"], ["neg", "false"]] as const) {
    const current = criteria[key];
    const old = criteria[legacy];
    if (current !== undefined && old !== undefined) {
      throw new Error(`Noul got both '${legacy}' and '${key}' criteria; use '${key}' only.`);
    }
    const value = current ?? old;
    if (value !== undefined) out[key] = value;
  }
  return Object.keys(out).length ? out : null;
}

/**
 * Build an ordinal multi-level Score question.
 */
export function score(
  instructions: string,
  criteria: string[] | Record<string, string>
): ScoreQuestion {
  return {
    type: "score",
    instructions,
    criteria,
  };
}
