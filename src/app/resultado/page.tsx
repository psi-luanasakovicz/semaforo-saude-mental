"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResultView } from "@/components/ResultView";
import { SignalReveal } from "@/components/SignalReveal";
import {
  hasSeenReveal,
  loadResult,
  markRevealSeen,
} from "@/lib/storage";
import { useIsClient } from "@/lib/use-is-client";

export default function ResultPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const result = isClient ? loadResult() : null;
  const [phase, setPhase] = useState<"reveal" | "copy">(() =>
    typeof window !== "undefined" && hasSeenReveal() ? "copy" : "reveal",
  );

  useEffect(() => {
    if (!isClient) return;
    if (!loadResult()) router.replace("/");
  }, [isClient, router]);

  const onRevealFinished = useCallback(() => {
    markRevealSeen();
    setPhase("copy");
  }, []);

  if (!result) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center text-muted">
          Carregando resultado...
        </div>
      </PageShell>
    );
  }

  if (phase === "reveal") {
    return (
      <SignalReveal
        result={result.classification}
        onFinished={onRevealFinished}
      />
    );
  }

  return (
    <PageShell tone={result.classification} showHeader={false}>
      <ResultView result={result} />
    </PageShell>
  );
}
