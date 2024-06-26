import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Timetable Dashboard",
  description: "Smart Timetable Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar  isDashboardRoute={true} />
        <main className="dashboard-layout-container">
          <div></div>
          <div className="max-w-6xl mx-auto" style={{width: '100%'}}>{children}</div>
        </main>
      </body>
    </html>
  );
}
