import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultado",
};

export default function ResultLayout({
  children,
}: LayoutProps<"/resultado">) {
  return children;
}
