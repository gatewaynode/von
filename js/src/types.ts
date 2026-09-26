/**
 * Core type definitions for Von System One decisions.
 */

export type QuestionType = "noul" | "choice" | "score";

export interface BaseQuestion {
  type: QuestionType;
  instructions: string;
}

/** Descriptions of the true/false outcomes; the engine reads only these keys. */
export interface NoulCriteria {
  true?: string;
  false?: string;
}

export interface NoulQuestion extends BaseQuestion {
  type: "noul";
  criteria?: NoulCriteria | null;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  criteria: Record<string, string | null>;
}

export interface ScoreQuestion extends BaseQuestion {
  type: "score";
  criteria: string[] | Record<string, string>;
}

export type Question = NoulQuestion | ChoiceQuestion | ScoreQuestion;

export interface NoulAnswer {
  type: "noul";
  noul: number;
}

export interface ChoiceAnswer {
  type: "choice";
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
}

export interface ScoreAnswer {
  type: "score";
  score: number;
  confidence: number;
  legend: Record<string, string>;
  probabilities: Record<string, number>;
}

export type Answer = NoulAnswer | ChoiceAnswer | ScoreAnswer;

export interface Usage {
  input_tokens: number;
  output_tokens: number;
}

export interface SystemOneResponse {
  model: string;
  answers: Record<string, Answer>;
  usage: Usage;
}

export interface VonClientOptions {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
}
