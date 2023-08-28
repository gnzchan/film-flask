"use client";

import useSidebar from "@/hooks/useSidebar";
import { RxHamburgerMenu } from "react-icons/rx";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const sidebar = useSidebar();

  return (
    <div>
      <div className="lg:hidden">
        <button onClick={sidebar.onOpen}>
          <RxHamburgerMenu size={24} />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Header;
