import type { AnswerOption, Question } from "@/lib/types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tenho me sentido cansado(a) mesmo depois de descansar.",
  },
  {
    id: 2,
    text: "Tenho dificuldade para “desligar” a mente depois do trabalho.",
  },
  {
    id: 3,
    text: "Tenho percebido que estou mais irritado(a), impaciente ou intolerante do que de costume.",
  },
  {
    id: 4,
    text: "Tenho tido dificuldade para me concentrar, lembrar de coisas ou manter a atenção.",
  },
  {
    id: 5,
    text: "Tenho sentido que estou funcionando no “piloto automático”.",
  },
  {
    id: 6,
    text: "Tenho tido dificuldade para dormir ou sinto que meu sono não tem sido reparador.",
  },
  {
    id: 7,
    text: "Tenho percebido redução da vontade de fazer coisas que normalmente gosto.",
  },
  {
    id: 8,
    text: "Tenho sentido que as demandas do dia a dia estão maiores do que minha capacidade de lidar com elas.",
  },
  {
    id: 9,
    text: "Tenho dificuldade para estabelecer limites ou dizer “não”, mesmo quando estou sobrecarregado(a).",
  },
  {
    id: 10,
    text: "Tenho sentido necessidade de aparentar que está tudo bem, mesmo quando não estou bem.",
  },
  {
    id: 11,
    text: "Tenho deixado de conversar com outras pessoas sobre o que estou sentindo.",
  },
  {
    id: 12,
    text: "Tenho percebido mudanças no meu humor que estão interferindo na minha rotina ou nos meus relacionamentos.",
  },
];

export const ANSWER_OPTIONS: AnswerOption[] = [
  { label: "Nunca", value: 0 },
  { label: "Às vezes", value: 1 },
  { label: "Frequentemente", value: 2 },
  { label: "Quase sempre", value: 3 },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const MIN_SCORE = 0;
export const MAX_SCORE = TOTAL_QUESTIONS * 3;
