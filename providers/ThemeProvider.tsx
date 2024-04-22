"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

// ThemeProvider component which takes children as props
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
     // Wrap the children components with NextThemesProvider from next-themes package
    // The attribute prop is set to "class", which means the theme will be applied using CSS classes
    // enableSystem prop is set to true to enable system theme detection
    <NextThemesProvider attribute="class" enableSystem>
      {children}
    </NextThemesProvider>
  );
}