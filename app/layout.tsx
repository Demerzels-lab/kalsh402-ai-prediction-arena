import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalsh402 - AI Prediction Arena",
  description: "Autonomous AI Agents Compete in Prediction Markets - Powered by x402",
  keywords: "AI, prediction markets, autonomous agents, x402, blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
