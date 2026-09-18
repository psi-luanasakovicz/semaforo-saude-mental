import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TrafficLight } from "@/components/TrafficLight";

export default function HomePage() {
  return (
    <PageShell showHeader={false}>
      <main className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <div className="fade-up flex flex-col items-center">
          <TrafficLight size="xl" active="idle" />
          <h1 className="mt-8 font-display text-[2rem] leading-[1.12] font-semibold tracking-tight sm:text-5xl">
            Semáforo da
            <br />
            Saúde Mental
          </h1>
          <p className="mt-4 max-w-[18rem] font-display text-lg text-wait italic sm:max-w-md sm:text-xl">
            “Você está bem ou só está dando conta?”
          </p>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted sm:text-sm">
            12 perguntas sobre as últimas duas semanas. Uma pausa para observar
            sinais de sobrecarga sem diagnóstico.
          </p>
        </div>

        <Link
          href="/questionario"
          className="btn-primary fade-up mt-10 w-full max-w-sm min-h-14"
          style={{ animationDelay: "80ms" }}
        >
          Começar
        </Link>
      </main>
    </PageShell>
  );
}
