import Link from "next/link";
import { IconType } from "react-icons";
import { MenuItem } from "react-pro-sidebar";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

import { Themes } from "./Themes";

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
  const { theme } = useTheme();
  const lightHoverColor = Themes.light.menu.hover.backgroundColor;
  const darkHoverColor = Themes.dark.menu.hover.backgroundColor;

  return (
    <MenuItem
      component={<Link href={href} onClick={onClick} />}
      icon={<Icon size={20} />}
      className={twMerge(
        "text-md my-2 rounded-md font-normal text-neutral-500",
        isActive &&
          "overflow-hidden border border-gray-700 text-neutral-900 dark:text-neutral-300",
      )}
      style={{
        backgroundColor: twMerge(
          isActive
            ? theme === "light"
              ? lightHoverColor
              : darkHoverColor
            : "",
        ),
      }}
    >
      {label}
    </MenuItem>
  );
};

export default SidebarItem;
