"use client";

import { LordIcon } from "./LordIcon";

import useFilmDB from "@/hooks/useFilmDB";
import { OMDBFilm } from "@/types";

interface TitleBarProps {
  film: OMDBFilm;
}

const TitleBar: React.FC<TitleBarProps> = ({ film }) => {
  const { isLiked, likeFilmHandler } = useFilmDB();

  return (
    <div className="flex items-center justify-between px-2 pt-2">
      {film.Title}
      <button onClick={likeFilmHandler}>
        <LordIcon
          src={
            isLiked
              ? "https://cdn.lordicon.com/xryjrepg.json"
              : "https://cdn.lordicon.com/pnhskdva.json"
          }
          trigger="hover"
          colors={{ primary: isLiked ? "red" : "black" }}
          size={32}
        />
      </button>
    </div>
  );
};

export default TitleBar;
