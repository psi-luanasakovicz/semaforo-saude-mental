import { TOTAL_QUESTIONS } from "@/lib/questions";
import { RESULT_COPY } from "@/lib/results";
import type {
  AnswerValue,
  Classification,
  CompletedAnswers,
  QuestionnaireResult,
} from "@/lib/types";

export function isAnswerValue(value: unknown): value is AnswerValue {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

export function isCompletedAnswers(value: unknown): value is CompletedAnswers {
  return (
    Array.isArray(value) &&
    value.length === TOTAL_QUESTIONS &&
    value.every(isAnswerValue)
  );
}

export function sumScore(answers: CompletedAnswers): number {
  return answers.reduce<number>((total, value) => total + value, 0);
}

export function classifyScore(score: number): Classification {
  if (score <= 11) return "verde";
  if (score <= 23) return "amarelo";
  return "vermelho";
}

export function buildResult(answers: CompletedAnswers): QuestionnaireResult {
  const score = sumScore(answers);
  return {
    answers,
    score,
    classification: classifyScore(score),
  };
}

export function getResultCopy(classification: Classification) {
  return RESULT_COPY[classification];
}
