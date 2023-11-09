import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import useSidebar from "@/hooks/useSidebar";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href?: string;
  pathname?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  href = "/",
  label,
  pathname,
}) => {
  const { onClose } = useSidebar();

  return (
    <Link
      href={href}
      className={twMerge(
        "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-neutral-200  hover:dark:bg-neutral-700",
        pathname === href
          ? "bg-neutral-200 font-medium text-black dark:bg-neutral-700 dark:text-white"
          : "text-zinc-600 dark:text-zinc-400",
      )}
      onClick={onClose}
    >
      <div className="flex flex-1 items-center">
        <Icon className="mr-3 h-5 w-5" />
        <p className="text-base">{label}</p>
      </div>
    </Link>
  );
};

export default SidebarItem;
