import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fine Motors LLC | Quality Used Cars in Lebanon County, PA",
  description:
    "Family-owned used car dealership in Newmanstown, PA. Quality pre-owned vehicles, honest pricing, and personal service. 5-star rated on Google. Serving Lebanon County for 15 years.",
  keywords: [
    "used cars Lebanon County",
    "used car dealer Newmanstown PA",
    "Fine Motors LLC",
    "pre-owned vehicles Pennsylvania",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
        <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
