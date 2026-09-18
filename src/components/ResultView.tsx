import Link from "next/link";
import { TrafficLight } from "@/components/TrafficLight";
import { MAX_SCORE } from "@/lib/questions";
import { SCORE_ZONES } from "@/lib/results";
import { getResultCopy } from "@/lib/scoring";
import { clearQuestionnaireSession } from "@/lib/storage";
import type { Classification, QuestionnaireResult } from "@/lib/types";

const TONE: Record<
  Classification,
  { chip: string; accent: string; meter: string }
> = {
  verde: {
    chip: "border-go/25 bg-go/10 text-go",
    accent: "bg-go",
    meter: "bg-go",
  },
  amarelo: {
    chip: "border-wait/25 bg-wait/10 text-wait",
    accent: "bg-wait",
    meter: "bg-wait",
  },
  vermelho: {
    chip: "border-stop/25 bg-stop/10 text-stop",
    accent: "bg-stop",
    meter: "bg-stop",
  },
};

type Props = {
  result: QuestionnaireResult;
};

export function ResultView({ result }: Props) {
  const copy = getResultCopy(result.classification);
  const tone = TONE[result.classification];
  const scorePct = Math.min(100, (result.score / MAX_SCORE) * 100);

  return (
    <article className="fade-up flex flex-1 flex-col pb-2">
      {/* Hero */}
      <header className="flex flex-col items-center text-center">
        <TrafficLight size="lg" active={result.classification} />

        <p
          className={`mt-7 inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase ${tone.chip}`}
        >
          {copy.eyebrow}
        </p>

        <h1 className="mt-4 max-w-md font-display text-[1.75rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.15rem]">
          {copy.title}
        </h1>
      </header>

      {/* Score meter */}
      <section
        className="mt-8"
        aria-label={`Pontuação ${result.score} de ${MAX_SCORE}`}
      >
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
            Sua pontuação
          </p>
          <p className="font-display text-lg tabular-nums text-ink">
            {result.score}
            <span className="text-sm text-muted"> / {MAX_SCORE}</span>
          </p>
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="absolute inset-y-0 left-0 w-[calc(12/36*100%)] border-r border-white/10 bg-go/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-[calc(12/36*100%)] w-[calc(12/36*100%)] border-r border-white/10 bg-wait/20"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-[calc(24/36*100%)] right-0 bg-stop/20"
            aria-hidden="true"
          />
          <div
            className={`absolute inset-y-0 left-0 rounded-full ${tone.meter} transition-[width] duration-700 ease-out`}
            style={{ width: `${Math.max(scorePct, 3)}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[10px] tracking-[0.12em] text-muted/80 uppercase">
          {SCORE_ZONES.map((zone) => (
            <span
              key={zone.id}
              className={
                result.classification === zone.id ? "text-ink" : undefined
              }
            >
              {zone.label}
            </span>
          ))}
        </div>
      </section>

      {/* Reading */}
      <div className="mt-9 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
        {copy.body.map((paragraph, index) => (
          <p
            key={paragraph}
            className={index === 0 ? "text-ink/90" : undefined}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {copy.questions ? (
        <ol className="mt-6 space-y-0 border-t border-line pt-1">
          {copy.questions.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 border-b border-line py-4"
            >
              <span
                className={`mt-0.5 text-[11px] font-semibold tracking-[0.14em] tabular-nums ${
                  result.classification === "amarelo"
                    ? "text-wait"
                    : result.classification === "vermelho"
                      ? "text-stop"
                      : "text-go"
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-[1.05rem] leading-snug text-ink italic">
                {item}
              </p>
            </li>
          ))}
        </ol>
      ) : null}

      <blockquote className="mt-8 flex gap-4">
        <span
          className={`mt-1 h-12 w-0.5 shrink-0 rounded-full ${tone.accent}`}
          aria-hidden="true"
        />
        <p className="font-display text-lg leading-snug text-ink italic sm:text-xl">
          “{copy.quote}”
        </p>
      </blockquote>

      {result.classification === "vermelho" ? (
        <aside className="mt-8 rounded-2xl border border-stop/25 bg-stop/8 px-4 py-4 text-left">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-stop uppercase">
            Precisa de apoio agora?
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Em sofrimento agudo, o{" "}
            <strong className="font-medium text-ink">CVV 188</strong> oferece
            apoio emocional 24 horas, todos os dias — ligação gratuita e
            anônima.
          </p>
        </aside>
      ) : null}

      <div className="mt-auto flex w-full flex-col gap-3 pt-10 sm:flex-row">
        <Link
          href="/questionario"
          onClick={() => clearQuestionnaireSession()}
          className="btn-primary flex-1"
        >
          Refazer
        </Link>
        <Link
          href="/"
          onClick={() => clearQuestionnaireSession()}
          className="btn-secondary flex-1"
        >
          Início
        </Link>
      </div>
    </article>
  );
}
