import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
          Erro 404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">
          Página não encontrada
        </h1>
        <p className="mt-3 max-w-sm text-muted">
          O endereço que você abriu não existe neste aplicativo.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Voltar ao início
        </Link>
      </main>
    </PageShell>
  );
}
