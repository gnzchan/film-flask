"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { LordIcon } from "./LordIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="flex items-center justify-center rounded-full bg-neutral-900 p-1 shadow-zinc-950 drop-shadow-xl transition active:scale-110 dark:bg-neutral-100"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LordIcon
        src={
          theme === "dark"
            ? "https://cdn.lordicon.com/hnvrjtda.json"
            : "https://cdn.lordicon.com/mxzuvjjs.json"
        }
        trigger="hover"
        colors={{ primary: theme === "dark" ? "#fcd34d" : "#f5f5f5" }}
        size={28}
      />
    </button>
  );
};

export default ThemeSwitcher;
