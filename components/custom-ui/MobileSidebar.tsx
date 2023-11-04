"use client";

import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useSidebar from "@/hooks/useSidebar";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, setIsOpen } = useSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-start">
        <RxHamburgerMenu className="lg:hidden" size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
