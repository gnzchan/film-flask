"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Sidebar as RPSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { FiSearch, FiCompass } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsGear } from "react-icons/bs";
import toast from "react-hot-toast";

import SidebarItem from "./SidebarItem";
import useSidebar from "@/hooks/useSidebar";
import { useUser } from "@/hooks/useUser";

const Sidebar: React.FC = () => {
  const sidebar = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("/");
  const pathName = usePathname();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

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
    <div>
      <aside>
        <RPSidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "100vh",
            },
          }}
          toggled={sidebar.isOpen}
          onBackdropClick={sidebar.onClose}
          customBreakPoint="1024px"
          backgroundColor="#FAFAFA"
        >
          <div className="relative aspect-auto min-h-[90px]">
            <Image src="/images/ff-logo.svg" alt="Film Flask Logo" fill />
          </div>

          <Menu>
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
          <Menu>
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
          <Menu>
            <SidebarItem
              icon={BsGear}
              label="Settings"
              href="/settings"
              isActive={activeSidebarItem === "/settings"}
            />
            {user && (
              <SidebarItem
                icon={PiSignOut}
                label="Logout"
                onClick={handleLogout}
              />
            )}
          </Menu>
        </RPSidebar>
      </aside>
    </div>
  );
};

export default Sidebar;
