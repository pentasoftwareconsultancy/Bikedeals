"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SiteContentProvider } from "@/contexts/SiteContentContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>BikesDeal - Premium Motorcycle Dealership</title>
        <meta
          name="description"
          content="Your trusted partner for buying and selling premium motorcycles. Just instant payment in 30 minutes!"
        />

        {/* ✅ Your favicon in /public/bicycle.png */}
        <link rel="icon" type="image/png" href="/bikes.png" />

        {/* 🍎 Optional mobile icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/bikes.png" />

        {/* 🎨 Theme color */}
        <meta name="theme-color" content="#b91c1c" />
      </head>

      <body className={inter.className}>
        <SiteContentProvider>{children}</SiteContentProvider>
      </body>
    </html>
  );
}
