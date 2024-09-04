import type { Metadata } from "next";
import { Nunito, Bangers } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });
const bangers = Bangers({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mind Math",
  description: "A challenging math game with time limits and scoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} text-lg`}>{children}</body>
    </html>
  );
}
