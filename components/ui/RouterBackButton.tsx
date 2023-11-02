"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

const RouterBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={twMerge("h-full", className)}
    >
      <RxCaretLeft className="h-6 w-6" />
    </button>
  );
};

export default RouterBackButton;
