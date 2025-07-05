import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto-Tracker",
  description:
    "A modern, responsive cryptocurrency tracking application built with Next.js, providing real-time crypto prices, market data, and currency conversion capabilities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
