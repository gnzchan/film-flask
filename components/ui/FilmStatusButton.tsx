import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LordIcon } from "./LordIcon";
import { Status } from "@/types";

interface FilmStatusButtonProps {
  id: string;
  color: string;
  src: string;
  status: Status;
}

const FilmStatusButton: React.FC<FilmStatusButtonProps> = ({
  id,
  color,
  src,
  status,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkToFocus = document.getElementById(id);

  useEffect(() => {
    if (isHovered) {
      linkToFocus?.dispatchEvent(new Event("mouseenter"));
    }
  }, [isHovered, linkToFocus]);

  return (
    <div
      className="group relative h-full w-full min-w-[150px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        className="peer absolute hidden"
        id={status}
        type="radio"
        name="status"
        value={status}
      />
      <label
        className="absolute z-10 h-full w-full cursor-pointer opacity-0"
        htmlFor={status}
      />
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-b from-pink-600 to-purple-600 opacity-75 blur peer-checked:scale-110 peer-checked:from-blue-600 peer-checked:to-green-600"></div>
      <div className="relative flex h-full min-h-[150px] w-full flex-col items-center gap-5 rounded-md border-gray-400 bg-neutral-700 p-3 transition-all group-hover:scale-105 peer-checked:scale-105 md:items-start">
        <LordIcon
          id={id}
          src={src}
          trigger="hover"
          colors={{ primary: color }}
          size={48}
        />
        <h2 className="text-md text-center font-semibold text-white md:text-left md:text-lg">
          {status}
        </h2>
      </div>
    </div>
  );
};

export default FilmStatusButton;
