"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar as RPSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { FiSearch, FiCompass } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsGear } from "react-icons/bs";

import SidebarItem from "./SidebarItem";
import useSidebar from "@/hooks/useSidebar";

const Sidebar: React.FC = () => {
  const sidebar = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("/");
  const pathName = usePathname();

  useEffect(() => {
    setActiveSidebarItem(pathName);
  }, [pathName]);

  const handleLogout = () => {
    // TODO: Handle logout
    console.log("logout");
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
        >
          <div className="align-center flex justify-center bg-slate-400">
            <h1>Film Flix</h1>
          </div>

          <Menu>
            <SidebarItem
              icon={FiSearch}
              label="Search"
              href="/search"
              isActive={activeSidebarItem === "/search"}
            />
          </Menu>
          <div>
            <p>Menu</p>
          </div>
          <Menu>
            <SidebarItem
              icon={FiCompass}
              label="Browse"
              href="/"
              isActive={activeSidebarItem === "/"}
            />
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
          </Menu>

          <div>
            <p>General</p>
          </div>
          <Menu>
            <SidebarItem
              icon={BsGear}
              label="Settings"
              href="/settings"
              isActive={activeSidebarItem === "/settings"}
            />

            {/* TODO: Only show logout if user is authenticated */}
            <SidebarItem
              icon={PiSignOut}
              label="Logout"
              onClick={handleLogout}
            />
          </Menu>
        </RPSidebar>
      </aside>
    </div>
  );
};

export default Sidebar;
