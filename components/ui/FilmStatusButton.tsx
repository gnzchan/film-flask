import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { LordIcon } from "./LordIcon";

interface FilmStatusButtonProps {
  id: string;
  color: string;
  src: string;
  description: string;
}

const FilmStatusButton: React.FC<FilmStatusButtonProps> = ({
  id,
  color,
  src,
  description,
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
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-b from-pink-600 to-purple-600 opacity-75 blur"></div>
      <div
        className={twMerge(
          "relative flex flex-col gap-5 rounded-md border-gray-400 bg-neutral-700 p-3 drop-shadow-md transition-all hover:scale-105",
        )}
      >
        <LordIcon
          id={id}
          src={src}
          trigger="hover"
          colors={{ primary: color }}
          size={48}
        />
        <h2 className="font-md text-lg text-white">{description}</h2>
      </div>
    </div>
  );
};

export default FilmStatusButton;
