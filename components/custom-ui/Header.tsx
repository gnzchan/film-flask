"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import FFDarkLogo from "../../public/images/ff-logo-inverted.svg";
import FFLightLogo from "../../public/images/ff-logo.svg";
import MobileSidebar from "./MobileSidebar";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
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
              src={FFLightLogo}
              alt="Film Flask Logo"
              fill
              priority={true}
              className="dark:hidden"
              unoptimized={true}
            />
            <Image
              src={FFDarkLogo}
              alt="Film Flask Logo"
              fill
              priority={true}
              className="hidden dark:block"
              unoptimized={true}
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
