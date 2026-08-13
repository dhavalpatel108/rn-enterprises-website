import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "R.N. Enterprises",
  description: "Premium Architectural Doors and Hardware",
  icons: {
    icon: "/favicon.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-body bg-surface text-on-surface min-h-screen overflow-x-hidden`}
      >
        <Providers>
          <SplashScreen />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
