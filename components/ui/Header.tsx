"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import Button from "./Button";
import { getColorTheme } from "./Themes";
import ThemeSwitcher from "./ThemeSwitcher";

import { useUser } from "@/hooks/useUser";
import useSidebar from "@/hooks/useSidebar";
import useAuthModal from "@/hooks/useAuthModal";

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
      <div className="grid grid-cols-3 items-center px-2 py-1 shadow-xl transition duration-500 ease-in-out dark:bg-zinc-800 dark:shadow-zinc-950">
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
          {user ? (
            <div>
              <div>
                <Button
                  className="bg-neutral-900 text-white shadow-zinc-950 drop-shadow-xl transition active:scale-110 dark:bg-neutral-100 dark:text-neutral-800"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                className="bg-neutral-900 text-white shadow-zinc-950 drop-shadow-xl transition active:scale-110 dark:bg-neutral-100 dark:text-neutral-800"
                onClick={() => authModal.onOpen("Welcome back")}
              >
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
