import type { Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google'; // Import fonts
import "./globals.css";

// Setup font variables
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

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
      <body className={`font-sans antialiased ${inter.variable} ${orbitron.variable}`}>
        {children}
      </body>
    </html>
  );
}