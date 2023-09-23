"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { getColorTheme } from "./Themes";
import ThemeSwitcher from "./ThemeSwitcher";

import useSidebar from "@/hooks/useSidebar";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const sidebar = useSidebar();

  const { theme } = useTheme();

  return (
    <>
      <div className="grid grid-cols-3 items-center px-2 py-1 shadow-xl dark:bg-zinc-800 dark:shadow-zinc-950">
        <div>
          <button className="lg:hidden" onClick={sidebar.onOpen}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
        <div className="relative aspect-auto min-h-[50px]">
          <Link href="/">
            <Image src={getColorTheme(theme).logo} alt="Film Flask Logo" fill />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-3">
          <ThemeSwitcher />
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
