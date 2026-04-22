"use client";

import { AuthProvider } from "./auth-provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AuthProvider>
          {children}
        </AuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
