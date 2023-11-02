"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsLightningChargeFill, BsMoonFill } from "react-icons/bs";

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
      className="flex items-center justify-center rounded-full bg-neutral-900 p-1 shadow-md transition hover:shadow-zinc-400 active:scale-110 dark:bg-neutral-100 dark:shadow-lg dark:hover:shadow-amber-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <BsLightningChargeFill className="h-5 w-5 text-amber-400" />
      ) : (
        <BsMoonFill className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
