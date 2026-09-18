import type { Classification, ResultCopy } from "@/lib/types";

export const RESULT_COPY: Record<Classification, ResultCopy> = {
  verde: {
    eyebrow: "Em equilíbrio",
    title: "Sinais baixos de sobrecarga.",
    body: [
      "Pelas suas respostas, você relatou poucos sinais de sobrecarga emocional nas últimas duas semanas.",
      "Isso não significa que você esteja imune ao estresse ou que precise estar bem o tempo todo. Saúde mental também envolve prevenção, equilíbrio, relações saudáveis, descanso e atenção aos próprios limites.",
      "Continue observando como você está e não espere chegar ao limite para começar a se cuidar.",
    ],
    quote: "Cuidar da saúde mental não começa quando algo dá errado. Começa antes.",
  },
  amarelo: {
    eyebrow: "Atenção",
    title: "Alguns sinais pedem uma pausa.",
    body: [
      "Suas respostas indicam a presença de alguns sinais de sobrecarga emocional nas últimas duas semanas.",
      "Talvez você esteja conseguindo manter sua rotina, mas com um esforço maior do que o habitual.",
      "Esse é um bom momento para parar e se perguntar:",
    ],
    questions: [
      "O que tem me deixado no limite?",
      "O que eu tenho adiado cuidar?",
      "O que poderia ser diferente na minha rotina?",
    ],
    quote: "Você não precisa esperar ficar no vermelho para pedir ajuda.",
  },
  vermelho: {
    eyebrow: "Priorize cuidado",
    title: "Há sinais importantes de sobrecarga.",
    body: [
      "Suas respostas indicam uma quantidade importante de sinais de sobrecarga emocional nas últimas duas semanas.",
      "Isso não significa que você tenha algum transtorno ou diagnóstico. É um sinal de que vale a pena olhar com mais cuidado para como você está.",
      "Se você tem se sentido constantemente sobrecarregado(a), sem energia, irritado(a), desmotivado(a), com alterações importantes no sono ou percebendo prejuízos na sua rotina e nos seus relacionamentos, não precisa enfrentar isso sozinho(a).",
      "Procure apoio. Converse com alguém de confiança e considere buscar avaliação de um profissional de saúde.",
    ],
    quote: "Pedir ajuda não é sinal de fraqueza. É uma forma de cuidado.",
  },
};

export const SCORE_ZONES = [
  { id: "verde" as const, label: "Verde", from: 0, to: 11 },
  { id: "amarelo" as const, label: "Amarelo", from: 12, to: 23 },
  { id: "vermelho" as const, label: "Vermelho", from: 24, to: 36 },
];
