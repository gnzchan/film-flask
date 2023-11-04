import { ChangeEvent, useEffect, useState } from "react";
import { IconType } from "react-icons";

import { Status } from "@/types";

interface FilmStatusButtonProps {
  id: string;
  icon: IconType;
  status: Status;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FilmStatusButton: React.FC<FilmStatusButtonProps> = ({
  id,
  icon: Icon,
  status,
  checked,
  onChange,
}) => {
  return (
    <div className="group relative h-full w-full min-w-[120px]">
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
      {/* <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-b from-pink-600 to-purple-600 opacity-75 blur peer-checked:scale-110 peer-checked:from-blue-600 peer-checked:to-green-600"></div> */}
      <div className="relative flex h-full w-full min-w-[170px] flex-row items-center justify-center gap-5 rounded-md border-gray-400 bg-neutral-700 p-3 transition-all group-hover:scale-105 peer-checked:scale-105 sm:min-h-[150px] sm:min-w-[10px] sm:flex-col sm:items-start">
        <Icon className="h-10 w-10 text-white" />
        <h2 className="text-md text-center font-semibold text-white md:text-left md:text-lg">
          {status}
        </h2>
      </div>
    </div>
  );
};

export default FilmStatusButton;
