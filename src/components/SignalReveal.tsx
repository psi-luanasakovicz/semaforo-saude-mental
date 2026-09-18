"use client";

import { useEffect, useRef, useState } from "react";
import type { Classification } from "@/lib/types";

const DURATION_MS = 5600;
const CYCLE: Array<Classification | "off"> = [
  "off",
  "vermelho",
  "amarelo",
  "verde",
  "amarelo",
  "off",
];

type Props = {
  result: Classification;
  onFinished: () => void;
};

type Phase = "cycle" | "hold" | "lock";

function activeAt(
  elapsed: number,
  result: Classification,
  reducedMotion: boolean,
): {
  active: Classification | "off";
  phase: Phase;
  progress: number;
} {
  if (reducedMotion) {
    return { active: result, phase: "lock", progress: 1 };
  }

  const progress = Math.min(1, elapsed / DURATION_MS);

  if (elapsed < 3200) {
    const step = Math.min(CYCLE.length - 1, Math.floor(elapsed / 520));
    return { active: CYCLE[step], phase: "cycle", progress };
  }
  if (elapsed < 3800) {
    return { active: "off", phase: "hold", progress };
  }
  return { active: result, phase: "lock", progress };
}

const GLOW: Record<Classification, string> = {
  vermelho: "rgba(255, 92, 97, 0.55)",
  amarelo: "rgba(245, 197, 66, 0.5)",
  verde: "rgba(61, 220, 132, 0.5)",
};

const ON: Record<Classification, string> = {
  vermelho: "#ff5c61",
  amarelo: "#f5c542",
  verde: "#3ddc84",
};

const OFF: Record<Classification, string> = {
  vermelho: "#3a1618",
  amarelo: "#3a2f12",
  verde: "#163a28",
};

const ORDER: Classification[] = ["vermelho", "amarelo", "verde"];

const LABEL: Record<Classification, string> = {
  vermelho: "vermelho",
  amarelo: "amarelo",
  verde: "verde",
};

export function SignalReveal({ result, onFinished }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [skipReady, setSkipReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const finished = useRef(false);
  const lastUi = useRef(0);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onFinished();
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const id = window.setTimeout(finish, 700);
      return () => window.clearTimeout(id);
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = now - start;
      if (now - lastUi.current > 40) {
        lastUi.current = now;
        setElapsed(t);
      }
      if (t > 900) setSkipReady(true);
      if (t >= DURATION_MS) {
        setElapsed(DURATION_MS);
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // finish fecha sobre onFinished estável via ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, onFinished]);

  const { active, phase, progress } = activeAt(elapsed, result, reducedMotion);
  const locked = phase === "lock";
  const ambient =
    active === "off" ? "transparent" : GLOW[active as Classification];

  return (
    <div
      className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#100e0c]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-500"
        style={{
          background: `radial-gradient(600px 420px at 50% 42%, ${ambient}, transparent 70%)`,
        }}
      />

      <p className="relative z-10 mb-10 text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">
        {locked ? `Sinal ${LABEL[result]}` : "Aguardando o sinal"}
      </p>

      <div
        className={`relative z-10 transition-transform duration-700 ease-out motion-reduce:transition-none ${
          locked ? "scale-110" : phase === "hold" ? "scale-105" : "scale-100"
        }`}
        aria-hidden="true"
      >
        <div className="mx-auto mb-[-2px] h-8 w-2.5 rounded-t-full bg-[#2a241e]" />

        <div
          className="flex w-[7.5rem] flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-linear-to-b from-[#2a241e] to-[#15110e] p-5 sm:w-40 sm:gap-6 sm:rounded-[2.4rem] sm:p-6"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.45)",
          }}
        >
          {ORDER.map((color) => {
            const on = active === color;
            return (
              <span
                key={color}
                className={`relative block h-14 w-14 rounded-full sm:h-[4.5rem] sm:w-[4.5rem] motion-reduce:animate-none ${
                  on && locked ? "signal-lock" : on ? "signal-blink" : ""
                }`}
                style={{
                  background: on ? ON[color] : OFF[color],
                  boxShadow: on
                    ? `0 0 ${locked ? 42 : 28}px ${GLOW[color]}`
                    : "none",
                  opacity: on ? 1 : 0.55,
                  transition:
                    "background 120ms linear, box-shadow 200ms ease, opacity 200ms ease",
                }}
              >
                <span className="absolute inset-[18%] rounded-full bg-white/20 blur-[1px]" />
              </span>
            );
          })}
        </div>
      </div>

      <div className="absolute right-5 bottom-6 left-5 z-20 flex items-center gap-4">
        <div
          className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/12"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Progresso da revelação"
        >
          <div
            className="h-full rounded-full bg-wait transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {skipReady || reducedMotion ? (
          <button
            type="button"
            onClick={finish}
            className="btn-ghost shrink-0 px-4 py-2 text-[11px] tracking-[0.16em] uppercase"
          >
            Pular
          </button>
        ) : null}
      </div>
    </div>
  );
}
