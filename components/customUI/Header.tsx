"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

import { getLogo } from "@/libs/helpers";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileSidebar from "./MobileSidebar";

import useSidebar from "@/hooks/useSidebar";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={twMerge(
          "grid grid-cols-3 items-center bg-neutral-100 px-2 py-1 shadow-xl dark:bg-neutral-900 dark:shadow-zinc-950",
          className,
        )}
      >
        <div>
          <MobileSidebar />
        </div>

        <Link href="/">
          <div className="relative aspect-auto min-h-[50px]">
            <Image
              src={getLogo(theme)}
              alt="Film Flask Logo"
              fill
              priority={true}
            />
          </div>
        </Link>
        <div className="flex items-center justify-end">
          <ThemeSwitcher />
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
