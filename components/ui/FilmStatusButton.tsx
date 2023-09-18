import { ChangeEvent, useEffect, useState } from "react";

import { LordIcon } from "./LordIcon";
import { Status } from "@/types";

interface FilmStatusButtonProps {
  id: string;
  src: string;
  status: Status;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FilmStatusButton: React.FC<FilmStatusButtonProps> = ({
  id,
  src,
  status,
  checked,
  onChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const linkToFocus = document.getElementById(id);

    if (isHovered) {
      linkToFocus?.dispatchEvent(new Event("mouseenter"));
    }
  }, [isHovered]);

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
        checked={checked}
        onChange={onChange}
      />
      <label
        className="absolute z-10 h-full w-full cursor-pointer opacity-0"
        htmlFor={status}
      />
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-b from-pink-600 to-purple-600 opacity-75 blur peer-checked:scale-110 peer-checked:from-blue-600 peer-checked:to-green-600"></div>
      <div className="relative flex h-full w-full flex-row items-center gap-5 rounded-md border-gray-400 bg-neutral-700 p-3 transition-all group-hover:scale-105 peer-checked:scale-105 sm:min-h-[150px] sm:flex-col md:items-start">
        <LordIcon
          id={id}
          src={src}
          trigger="hover"
          colors={{ primary: "white" }}
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
