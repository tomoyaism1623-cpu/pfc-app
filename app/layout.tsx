import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PFCバランス ごはん提案",
  description: "コンビニ・ファストフードのメニューから、目標PFCに近いものを提案します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "#F5EAD7", color: "#1a1a1a" }}>
        {children}
      </body>
    </html>
  );
}
