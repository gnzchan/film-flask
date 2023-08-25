import Link from "next/link";
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
  return (
    <Link href={href} onClick={onClick}>
      <MenuItem icon={<Icon size={20} />}>{label}</MenuItem>
    </Link>
  );
};

export default SidebarItem;
