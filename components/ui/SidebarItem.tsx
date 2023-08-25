import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { MenuItem } from "react-pro-sidebar";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href = "/",
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === href && label !== "Logout") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathName]);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={twMerge(isActive && "text-red-400")}
    >
      <MenuItem icon={<Icon size={20} />}>{label}</MenuItem>
    </Link>
  );
};

export default SidebarItem;
