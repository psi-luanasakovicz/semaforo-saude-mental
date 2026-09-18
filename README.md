# Semáforo da Saúde Mental

Questionário web de reflexão sobre sinais de sobrecarga emocional nas últimas duas semanas, com resultado em sistema de semáforo.

> Esta é uma ferramenta de **reflexão e prevenção**. Ela **não substitui** avaliação, diagnóstico ou acompanhamento de um profissional de saúde.

- **Verde (0–11):** poucos sinais relatados
- **Amarelo (12–23):** alguns sinais de sobrecarga
- **Vermelho (24–36):** quantidade importante de sinais

O resultado é calculado e exibido **somente na hora**, no próprio dispositivo. Nada é enviado a um servidor nem gravado em banco de dados.

## Fluxo

1. Início → questionário (12 perguntas)
2. Revelação visual do semáforo
3. Texto do resultado + orientações

## Estrutura

```text
src/
├── app/
│   ├── page.tsx              # Início
│   ├── questionario/         # Perguntas
│   └── resultado/            # Revelação + resultado
├── components/
│   ├── PageShell.tsx
│   ├── TrafficLight.tsx
│   └── SignalReveal.tsx
└── lib/                      # Perguntas, pontuação e sessão local
```

## Como rodar

Pré-requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Não há variáveis de ambiente obrigatórias.

## Scripts

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção
npm start       # servidor de produção
npm run lint    # lint
```
