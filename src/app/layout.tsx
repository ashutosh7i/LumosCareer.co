import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LumosCareer🪄",
  description: "Transfigure Yourself Into An Outstanding Candidate🌟",
  openGraph: {
    type: "website",
    locale: "en_GB",
    // url: siteMetadata.siteUrl,
    title: "LumosCareer🪄",
    description: "Transfigure Yourself Into An Outstanding Candidate🌟",
    // siteName: siteMetadata.title,
    images: [
      {
        url: `/static/og/og.png`,
        width: 1200,
        height: 630,
        // alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumosCareer🪄",
    description: "Transfigure Yourself Into An Outstanding Candidate🌟",
    images: [`/static/og/og.png`],
    creator: "@ashutosh7i",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
