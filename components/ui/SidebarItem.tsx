import Link from "next/link";
import { IconType } from "react-icons";
import { MenuItem } from "react-pro-sidebar";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  href = "/",
  onClick,
}) => {
  return (
    <MenuItem
      component={<Link href={href} onClick={onClick} />}
      icon={<Icon size={20} />}
      className={twMerge("text-lg font-semibold", isActive && "bg-white")}
    >
      {label}
    </MenuItem>
  );
};

export default SidebarItem;
