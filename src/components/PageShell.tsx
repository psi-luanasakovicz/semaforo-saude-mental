import Link from "next/link";
import { TrafficLight } from "@/components/TrafficLight";

type PageShellProps = {
  children: React.ReactNode;
  tone?: "idle" | "verde" | "amarelo" | "vermelho";
  showHeader?: boolean;
};

export function PageShell({
  children,
  tone = "idle",
  showHeader = true,
}: PageShellProps) {
  return (
    <div
      className="page-bg relative min-h-dvh"
      data-tone={tone === "idle" ? undefined : tone}
    >
      <div className="grain" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-6 pb-10 sm:px-6">
        {showHeader ? (
          <header className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-full transition"
            >
              <TrafficLight size="sm" active="idle" />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase transition group-hover:text-ink">
                Semáforo
              </span>
            </Link>
          </header>
        ) : null}
        {children}
      </div>
    </div>
  );
}
