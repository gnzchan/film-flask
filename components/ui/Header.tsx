"use client";

import useSidebar from "@/hooks/useSidebar";
import { RxHamburgerMenu } from "react-icons/rx";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const sidebar = useSidebar();

  return (
    <>
      <div className="flex items-center justify-center px-2">
        <button className="lg:hidden" onClick={sidebar.onOpen}>
          <RxHamburgerMenu size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-center text-3xl font-light">Film Flix</h1>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
