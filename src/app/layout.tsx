import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = localFont({
  src: "../../public/fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-orbitron",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pocket Rave",
  description: "Krakow-based electronic producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} antialiased bg-neutral-950 text-white`}>
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
