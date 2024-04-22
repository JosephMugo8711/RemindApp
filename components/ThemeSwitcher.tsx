"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

function ThemeSwitcher() {
  // Retrieve the current theme and function to set the theme from useTheme hook
  const { theme, setTheme } = useTheme();
  // avoid hydration errors
    // State to manage whether the component is mounted or not
  const [mounted, setMounted] = useState(false);

 // useEffect only runs on the client, so now we can safely show the UI
  // with this trick we are avoiding hydration errors
  useEffect(() => {
    // Set mounted to true once the component is mounted
    setMounted(true);
    // empty dependency array ensures that this effect runs only once after the initial render
  }, []);

  // If the component is not mounted yet, return null
  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
          {/* Render the trigger for light theme */}
        <TabsTrigger value="light" onClick={(e) => setTheme("light")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
         {/* Render the trigger for dark theme */}
        <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
          {/* Render the trigger for system theme */}
        <TabsTrigger value="system" onClick={(e) => setTheme("system")}>
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;