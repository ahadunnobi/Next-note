"use client"

import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/CommandPalette";
import { Providers } from "@/components/providers";
import { Menu } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="h-full bg-bg-dark text-foreground flex overflow-hidden">
        <Providers>
          <Sidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />
          <CommandPalette />
          
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-white/5 bg-bg-dark/50 backdrop-blur-md sticky top-0 z-40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center font-bold text-white shadow-lg">
                  N
                </div>
                <span className="font-bold text-lg tracking-tight">Next Note</span>
              </div>
              <button 
                onClick={() => setIsOpenMobile(true)}
                className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors"
                aria-label="Open Sidebar"
              >
                <Menu size={24} />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto subtle-scroll relative">
              {/* Subtle background glow effect */}
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] pointer-events-none" />
              
              <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 min-h-full">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
