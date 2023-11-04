"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FiSearch, FiCompass } from "react-icons/fi";
import { PiSignOut, PiSignIn } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import Link from "next/link";

import SidebarItem from "./SidebarItem";
import FFLightLogo from "../../public/images/ff-logo.svg";
import FFDarkLogo from "../../public/images/ff-logo-inverted.svg";
import useSidebar from "@/hooks/useSidebar";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

const Sidebar: React.FC = () => {
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const pathname = usePathname();
  const { user } = useUser();
  const { theme } = useTheme();
  const { onClose } = useSidebar();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  const routes = [
    {
      label: "Search",
      icon: FiSearch,
      href: "/search",
      requiresAuth: false,
    },
    {
      label: "Browse",
      icon: FiCompass,
      href: "/",
      requiresAuth: false,
    },
    {
      label: "Likes",
      icon: AiOutlineHeart,
      href: "/likes",
      requiresAuth: true,
    },
    {
      label: "Watchlist",
      icon: BsBookmark,
      href: "/watchlist",
      requiresAuth: true,
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-4 bg-neutral-100 px-3 py-6 shadow-xl dark:bg-neutral-900 dark:shadow-zinc-950">
      <div className="flex-1">
        <Link href="/" onClick={onClose}>
          <div className="relative aspect-auto min-h-[90px]">
            <Image
              src={FFLightLogo}
              alt="Film Flask Logo"
              fill
              priority={true}
              className="dark:hidden"
            />
            <Image
              src={FFDarkLogo}
              alt="Film Flask Logo"
              fill
              priority={true}
              className="hidden dark:block"
            />
          </div>
        </Link>
        <div className="mt-10 space-y-1">
          {routes.map((route) => {
            if ((route.requiresAuth && user) || !route.requiresAuth)
              return (
                <SidebarItem
                  key={route.href}
                  icon={route.icon}
                  href={route.href}
                  label={route.label}
                  pathname={pathname}
                />
              );
          })}
        </div>
      </div>
      {user ? (
        <button onClick={handleLogout}>
          <SidebarItem icon={PiSignOut} label="Sign out" />
        </button>
      ) : (
        <button onClick={() => authModal.onOpen("Welcome back")}>
          <SidebarItem icon={PiSignIn} label="Sign in" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
