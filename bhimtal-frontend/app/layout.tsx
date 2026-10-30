import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Explore Bhimtal | Kumaon Lake District & Himalayan Sanctuaries",
  description:
    "Official full-stack tourism application for Bhimtal, Uttarakhand. Real-time trails, homestays, paragliding bookings, and interactive map connected to Supabase database.",
  keywords: [
    "Bhimtal",
    "Explore Bhimtal",
    "Uttarakhand Tourism",
    "Bhimtal Lake",
    "Sattal Lakes",
    "Naukuchiatal",
    "Hidimba Parvat Trek",
    "Paragliding Bhimtal",
    "Kumaon Homestays",
    "Supabase Tourism App",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f131c] text-[#dfe2ef] selection:bg-[#10b981] selection:text-[#00422b]">
        {children}
      </body>
    </html>
  );
}
