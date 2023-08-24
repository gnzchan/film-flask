interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div>
      SB
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
