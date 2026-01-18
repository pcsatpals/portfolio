import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Preahvihear } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const preahvihearSans = Preahvihear({
  variable: "--font-preahvihear-sans",
  subsets: ["latin"],
  weight: ["400"]
});

const geistMono = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building with Purpose",
  icons: {
    icon: "/logo.svg"
  },
  description: "A showcase of my work as a software developer, focused on creating reliable, accessible, and impactful digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${preahvihearSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
