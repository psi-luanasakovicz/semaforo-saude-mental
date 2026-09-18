import { buildResult, isCompletedAnswers } from "@/lib/scoring";
import type { QuestionnaireAnswers, QuestionnaireResult } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";

const ANSWERS_KEY = "ssm:answers";
const RESULT_KEY = "ssm:result";
const REVEALED_KEY = "ssm:revealed";

const EMPTY_ANSWERS: QuestionnaireAnswers = Array.from(
  { length: TOTAL_QUESTIONS },
  () => null,
);

let answersCache: QuestionnaireAnswers | null = null;

function canUseStorage() {
  return typeof window !== "undefined";
}

export function emptyAnswers(): QuestionnaireAnswers {
  return EMPTY_ANSWERS;
}

export function loadAnswers(): QuestionnaireAnswers {
  if (answersCache) return answersCache;
  if (!canUseStorage()) return EMPTY_ANSWERS;

  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    if (!raw) {
      answersCache = EMPTY_ANSWERS;
      return answersCache;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== TOTAL_QUESTIONS) {
      answersCache = EMPTY_ANSWERS;
      return answersCache;
    }
    answersCache = parsed.map((value) =>
      value === 0 || value === 1 || value === 2 || value === 3 ? value : null,
    );
    return answersCache;
  } catch {
    answersCache = EMPTY_ANSWERS;
    return answersCache;
  }
}

export function saveAnswers(answers: QuestionnaireAnswers) {
  answersCache = answers;
  if (!canUseStorage()) return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function saveResult(result: QuestionnaireResult) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  sessionStorage.removeItem(REVEALED_KEY);
}

/** Reconstrói o resultado a partir das respostas — ignora score/classificação adulterados. */
export function loadResult(): QuestionnaireResult | null {
  if (!canUseStorage()) return null;

  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const answers = (parsed as { answers?: unknown }).answers;
    if (!isCompletedAnswers(answers)) return null;
    return buildResult(answers);
  } catch {
    return null;
  }
}

export function hasSeenReveal(): boolean {
  if (!canUseStorage()) return false;
  return sessionStorage.getItem(REVEALED_KEY) === "1";
}

export function markRevealSeen() {
  if (!canUseStorage()) return;
  sessionStorage.setItem(REVEALED_KEY, "1");
}

export function clearQuestionnaireSession() {
  answersCache = EMPTY_ANSWERS;
  if (!canUseStorage()) return;
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(REVEALED_KEY);
}
