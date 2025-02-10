import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Search Results Page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased max-h-screen h-screen min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
