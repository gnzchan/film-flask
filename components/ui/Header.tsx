"use client";

import useSidebar from "@/hooks/useSidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const sidebar = useSidebar();
  const authModal = useAuthModal();

  return (
    <>
      <div className="grid grid-cols-3 items-center px-2">
        <div>
          <button className="lg:hidden" onClick={sidebar.onOpen}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
        <div className="">
          <h1 className="text-center text-3xl font-light">Film Flask</h1>
        </div>
        <div className="flex items-center justify-end">
          <div>
            <Button onClick={authModal.onOpen}>Log in</Button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
