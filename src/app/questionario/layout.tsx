import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionário",
};

export default function QuestionnaireLayout({
  children,
}: LayoutProps<"/questionario">) {
  return children;
}
