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
      className={twMerge(
        "rounded-md text-lg font-normal text-neutral-500",
        isActive &&
          "border border-gray-700 text-neutral-900 dark:text-neutral-300",
      )}
    >
      {label}
    </MenuItem>
  );
};

export default SidebarItem;
