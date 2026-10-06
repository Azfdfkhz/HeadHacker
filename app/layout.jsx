import { Inter, JetBrains_Mono, Caveat, Special_Elite } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import { DiscoveryProvider } from "@/context/DiscoveryContext";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });
const type = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-type" });

export const metadata = {
  title: {
    default: "HEADHACKER — Interactive 3D Surveillance Experience",
    template: "%s — HEADHACKER",
  },
  description:
    "A VR surveillance experience. Not just a game. It's a place, a system, a story. Enter the hideout, find the equipment, discover the world.",
  keywords: ["headhacker", "3D", "interactive", "surveillance", "VR", "game", "Next.js", "Three.js"],
  themeColor: "#101416",
  openGraph: {
    title: "HEADHACKER — Interactive 3D Surveillance Experience",
    description:
      "Enter the hideout. Find the equipment. Discover the world. An immersive 3D surveillance experience.",
    url: "https://headhacker.vercel.app",
    siteName: "HEADHACKER",
    images: [{ url: "/images/exterior.jpg", width: 1200, height: 630, alt: "HEADHACKER Hideout" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEADHACKER — Interactive 3D Surveillance Experience",
    description: "Enter the hideout. Find the equipment. Discover the world.",
    images: ["/images/exterior.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${hand.variable} ${type.variable}`}>
      <body className="min-h-screen bg-bg text-ink">
        <DiscoveryProvider>
          <Navbar />
          {children}
        </DiscoveryProvider>
      </body>
    </html>
  );
}
