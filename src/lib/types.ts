export type AnswerValue = 0 | 1 | 2 | 3;

export type Classification = "verde" | "amarelo" | "vermelho";

export type AnswerOption = {
  label: string;
  value: AnswerValue;
};

export type Question = {
  id: number;
  text: string;
};

export type QuestionnaireAnswers = Array<AnswerValue | null>;

export type CompletedAnswers = AnswerValue[];

export type QuestionnaireResult = {
  answers: CompletedAnswers;
  score: number;
  classification: Classification;
};

export type ResultCopy = {
  eyebrow: string;
  title: string;
  body: string[];
  questions?: string[];
  quote: string;
};
