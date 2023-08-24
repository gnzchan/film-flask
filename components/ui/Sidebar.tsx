"use client";

import { useState } from "react";
import {
  Sidebar as RPSidebar,
  Menu,
  SubMenu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [toggledSidebar, setToggledSidebar] = useState(false);

  return (
    <div className="flex">
      <aside>
        <RPSidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "100vh",
            },
          }}
          backgroundColor="red"
          toggled={toggledSidebar}
          onBackdropClick={() => {
            setToggledSidebar(false);
          }}
          breakPoint="always"
        >
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </RPSidebar>
      </aside>
      <div>
        <button onClick={() => setToggledSidebar(true)}>burger</button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
