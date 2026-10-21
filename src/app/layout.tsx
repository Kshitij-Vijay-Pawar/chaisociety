import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/style/globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chai Society — A Society of Good Taste",
  description:
    "Chai Society is a premium café where chai, coffee, matcha, and soulful food meet good company. A society of good taste.",
  keywords: ["chai", "cafe", "coffee", "matcha", "bun maska", "Chai Society"],
  openGraph: {
    title: "Chai Society — A Society of Good Taste",
    description: "Good food. Good friends. Good vibes.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/logoWhite.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="font-sans antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

