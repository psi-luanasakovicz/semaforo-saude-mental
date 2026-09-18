"use client";

import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ANSWER_OPTIONS, QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import { buildResult } from "@/lib/scoring";
import {
  emptyAnswers,
  loadAnswers,
  saveAnswers,
  saveResult,
} from "@/lib/storage";
import type { AnswerValue, QuestionnaireAnswers } from "@/lib/types";

function subscribe() {
  return () => {};
}

export default function QuestionnairePage() {
  const router = useRouter();
  const headingId = useId();
  const storedAnswers = useSyncExternalStore(subscribe, loadAnswers, emptyAnswers);
  const [draft, setDraft] = useState<QuestionnaireAnswers | null>(null);
  const [index, setIndex] = useState(0);
  const [advancing, setAdvancing] = useState(false);
  const answers = draft ?? storedAnswers;

  const question = QUESTIONS[index];
  const selected = answers[index];
  const answeredCount = answers.filter((value) => value !== null).length;
  const progress = (answeredCount / TOTAL_QUESTIONS) * 100;
  const isLast = index === TOTAL_QUESTIONS - 1;
  const canContinue = selected !== null && !advancing;

  const persist = useCallback((next: QuestionnaireAnswers) => {
    setDraft(next);
    saveAnswers(next);
  }, []);

  const finish = useCallback(
    (completed: QuestionnaireAnswers) => {
      if (completed.some((value) => value === null)) return;
      const result = buildResult(
        completed as Exclude<(typeof completed)[number], null>[],
      );
      saveResult(result);
      router.push("/resultado");
    },
    [router],
  );

  const selectAnswer = useCallback(
    (value: AnswerValue) => {
      if (advancing) return;
      const next = [...answers];
      next[index] = value;
      persist(next);
      setAdvancing(true);

      window.setTimeout(() => {
        if (index < TOTAL_QUESTIONS - 1) {
          setIndex((current) => current + 1);
          setAdvancing(false);
        } else {
          finish(next);
        }
      }, 280);
    },
    [advancing, answers, finish, index, persist],
  );

  function goBack() {
    if (advancing) return;
    if (index === 0) {
      router.push("/");
      return;
    }
    setIndex((current) => current - 1);
  }

  function continueManually() {
    if (!canContinue) return;
    if (isLast) {
      setAdvancing(true);
      finish(answers);
      return;
    }
    setIndex((current) => current + 1);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      const numeric = Number(event.key);
      if (numeric >= 1 && numeric <= 4) {
        event.preventDefault();
        const option = ANSWER_OPTIONS[numeric - 1];
        if (option) selectAnswer(option.value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectAnswer]);

  if (!question) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center text-muted">
          Carregando...
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
            Pergunta {String(index + 1).padStart(2, "0")} de {TOTAL_QUESTIONS}
          </p>
          <p className="text-[11px] tabular-nums text-muted" aria-hidden="true">
            {Math.round(progress)}%
          </p>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-white/8"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Progresso do questionário"
        >
          <div
            className="progress-fill h-full rounded-full bg-linear-to-r from-go via-wait to-stop"
            style={{ width: `${Math.max(progress, 6)}%` }}
          />
        </div>
      </div>

      <section
        key={question.id}
        className="fade-in flex flex-1 flex-col"
        aria-labelledby={headingId}
      >
        {index === 0 ? (
          <p className="mb-4 text-[13px] leading-relaxed text-muted">
            Sobre as últimas duas semanas. Não há respostas certas ou erradas.
          </p>
        ) : null}
        <h1
          id={headingId}
          className="font-display text-[1.55rem] leading-snug font-medium tracking-tight sm:text-[1.85rem]"
        >
          {question.text}
        </h1>

        <div
          className="mt-8 grid gap-3"
          role="group"
          aria-label="Opções de resposta"
        >
          {ANSWER_OPTIONS.map((option, optionIndex) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectAnswer(option.value)}
                disabled={advancing}
                aria-pressed={isSelected}
                className="answer-option"
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${
                      isSelected ? "text-bg/55" : "text-muted"
                    }`}
                    aria-hidden="true"
                  >
                    {optionIndex + 1}
                  </span>
                  <span className="block text-base font-medium sm:text-lg">
                    {option.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={goBack} className="btn-secondary flex-1">
          Voltar
        </button>
        <button
          type="button"
          onClick={continueManually}
          disabled={!canContinue}
          className="btn-primary flex-[1.4]"
        >
          {isLast ? "Ver resultado" : "Continuar"}
        </button>
      </div>
    </PageShell>
  );
}
