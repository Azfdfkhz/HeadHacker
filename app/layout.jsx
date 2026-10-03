import { Inter, JetBrains_Mono, Caveat, Special_Elite } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });
const type = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-type" });

export const metadata = {
  title: "HEADHACKER",
  description: "A VR surveillance experience. Not just a game. It's a place, a system, a story.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${hand.variable} ${type.variable}`}>
      <body className="min-h-screen bg-bg text-ink">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
