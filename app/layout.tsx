import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SRU Pragathi 2026 | SR University Fest & Event Management SaaS",
  description: "Official National Fest & Event Management Web Platform for SR University (SRU), Warangal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
