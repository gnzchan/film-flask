"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar as RPSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { PiCompassFill, PiSignOut } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsGear } from "react-icons/bs";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [toggledSidebar, setToggledSidebar] = useState(false);

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
          toggled={toggledSidebar}
          onBackdropClick={() => {
            setToggledSidebar(false);
          }}
          breakPoint="lg"
        >
          <div className="align-center flex justify-center bg-slate-400">
            <h1>Film Flix</h1>
          </div>
          <div>
            <p>Menu</p>
          </div>
          <Menu>
            <SidebarItem icon={PiCompassFill} label="Browse" href="/" />
            <SidebarItem icon={AiOutlineHeart} label="Likes" href="/likes" />
            <SidebarItem
              icon={BsBookmark}
              label="Watchlist"
              href="/watchlist"
            />
          </Menu>

          <div>
            <p>General</p>
          </div>
          <Menu>
            <SidebarItem icon={BsGear} label="Settings" href="/settings" />
            <SidebarItem
              icon={PiSignOut}
              label="Logout"
              onClick={handleLogout}
            />
          </Menu>
        </RPSidebar>
      </aside>

      <div className="lg:hidden">
        <button onClick={() => setToggledSidebar(true)}>
          <RxHamburgerMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
