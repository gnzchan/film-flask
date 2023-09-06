import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LordIcon } from "./LordIcon";
import { Status } from "@/types";

interface FilmStatusButtonProps {
  id: string;
  color: string;
  src: string;
  status: Status;
  active: boolean;
  onClick: (status: Status) => void;
}

const FilmStatusButton: React.FC<FilmStatusButtonProps> = ({
  id,
  color,
  src,
  status,
  active,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkToFocus = document.getElementById(id);

  useEffect(() => {
    if (isHovered) {
      linkToFocus?.dispatchEvent(new Event("mouseenter"));
    }
  }, [isHovered, linkToFocus]);

  return (
    <div>
      <input
        className="absolute hidden"
        id={status}
        type="radio"
        name="status"
        value={status}
        checked={active}
      />

      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(status)}
      >
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-b from-pink-600 to-purple-600 opacity-75 blur"></div>
        <div
          className={twMerge(
            "relative flex flex-col gap-5 rounded-md border-gray-400 bg-neutral-700 p-3 drop-shadow-md transition-all hover:scale-105",
            active && "scale-110",
          )}
        >
          <LordIcon
            id={id}
            src={src}
            trigger="hover"
            colors={{ primary: color }}
            size={48}
          />

          {/* <label className="font-md text-lg text-white" htmlFor={status}>
            {status}
          </label> */}
          <h2 className="font-md text-lg text-white">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default FilmStatusButton;
