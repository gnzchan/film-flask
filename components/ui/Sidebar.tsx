"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { Sidebar as RPSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { FiSearch, FiCompass } from "react-icons/fi";
import { PiSignOut, PiSignIn } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsGear } from "react-icons/bs";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

import SidebarItem from "./SidebarItem";
import { getColorTheme } from "./Themes";
import useSidebar from "@/hooks/useSidebar";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

const Sidebar: React.FC = () => {
  const sidebar = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("/");
  const pathName = usePathname();
  const { user } = useUser();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { theme } = useTheme();

  useEffect(() => {
    if (pathName !== activeSidebarItem) {
      setActiveSidebarItem(pathName);
      sidebar.onClose();
    }
  }, [pathName, activeSidebarItem, sidebar]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  return (
    <RPSidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          height: "100vh",
          transition: "all .5s ease-in-out",
        },

        [`.${sidebarClasses.backdrop}`]: {
          background: authModal.isOpen
            ? "rgb(0, 0, 0, 0)"
            : "rgb(0, 0, 0, 0.3)",
        },
        borderRight: 0,
      }}
      toggled={sidebar.isOpen}
      onBackdropClick={sidebar.onClose}
      customBreakPoint="1024px"
      backgroundColor={getColorTheme(theme).sidebar.backgroundColor}
      className="h-full shadow-xl dark:shadow-zinc-950"
    >
      <div className="relative aspect-auto min-h-[90px]">
        <Image
          src={getColorTheme(theme).logo}
          alt="Film Flask Logo"
          fill
          priority={true}
        />
      </div>

      <Menu
        className="px-2"
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: getColorTheme(theme).menu.hover.backgroundColor,
              borderRadius: "5px",
            },
          },
        }}
      >
        <SidebarItem
          icon={FiSearch}
          label="Search"
          href="/search"
          isActive={activeSidebarItem === "/search"}
        />
      </Menu>
      <div className="pl-2">
        <p>Menu</p>
      </div>
      <Menu
        className="px-2"
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: getColorTheme(theme).menu.hover.backgroundColor,
              borderRadius: "5px",
            },
          },
        }}
      >
        <SidebarItem
          icon={FiCompass}
          label="Browse"
          href="/"
          isActive={activeSidebarItem === "/"}
        />
        {user && (
          <>
            <SidebarItem
              icon={AiOutlineHeart}
              label="Likes"
              href="/likes"
              isActive={activeSidebarItem === "/likes"}
            />
            <SidebarItem
              icon={BsBookmark}
              label="Watchlist"
              href="/watchlist"
              isActive={activeSidebarItem === "/watchlist"}
            />
          </>
        )}
      </Menu>

      <div className="pl-2">
        <p>General</p>
      </div>
      <Menu
        className="px-2"
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: getColorTheme(theme).menu.hover.backgroundColor,
              borderRadius: "5px",
            },
          },
        }}
      >
        {/* <SidebarItem
              icon={BsGear}
              label="Settings"
              href="/settings"
              isActive={activeSidebarItem === "/settings"}
            /> */}
        {user ? (
          <SidebarItem icon={PiSignOut} label="Logout" onClick={handleLogout} />
        ) : (
          <SidebarItem
            icon={PiSignIn}
            label="Login"
            onClick={() => authModal.onOpen("Welcome back")}
          />
        )}
      </Menu>
    </RPSidebar>
  );
};

export default Sidebar;
