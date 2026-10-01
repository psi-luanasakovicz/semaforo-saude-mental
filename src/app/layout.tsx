import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Semáforo da Saúde Mental",
    template: "%s · Semáforo da Saúde Mental",
  },
  description:
    "Ferramenta de uso exclusivo da Psicóloga Luana Sakovicz — CRP 08/48498 — para reflexão sobre sinais de sobrecarga emocional nas últimas duas semanas. Não substitui avaliação profissional.",
  applicationName: "Semáforo da Saúde Mental",
};

export const viewport: Viewport = {
  themeColor: "#100e0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-ink">{children}</body>
    </html>
  );
}
