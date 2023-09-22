"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";
import Image from "next/image";
import { useTheme } from "next-themes";

import Button from "./Button";
import { getColorTheme } from "./Themes";
import { useUser } from "@/hooks/useUser";
import useSidebar from "@/hooks/useSidebar";
import useAuthModal from "@/hooks/useAuthModal";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const supabaseClient = useSupabaseClient();
  const sidebar = useSidebar();
  const authModal = useAuthModal();

  const { user } = useUser();
  const { theme } = useTheme();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 items-center px-2 dark:bg-black">
        <div>
          <button className="lg:hidden" onClick={sidebar.onOpen}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
        <div className="relative aspect-auto min-h-[60px]">
          <Link href="/">
            <Image src={getColorTheme(theme).logo} alt="Film Flask Logo" fill />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <ThemeSwitcher />
          </div>
          {user ? (
            <div>
              <div>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={() => authModal.onOpen("Welcome back")}>
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
