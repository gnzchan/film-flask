"use client";

import { useTheme } from "next-themes";

import { LordIcon } from "./LordIcon";

import useFilmLike from "@/hooks/useFilmLike";
import { OMDBFilm } from "@/types";

interface FilmTitleBarProps {
  film: OMDBFilm;
}

const FilmTitleBar: React.FC<FilmTitleBarProps> = ({ film }) => {
  const { liked, likeFilmHandler } = useFilmLike(film);
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between px-2 pt-2">
      {film.Title}
      <button onClick={likeFilmHandler}>
        <LordIcon
          src={
            liked
              ? "https://cdn.lordicon.com/xryjrepg.json"
              : "https://cdn.lordicon.com/pnhskdva.json"
          }
          trigger="hover"
          colors={{
            primary: liked ? "red" : theme === "light" ? "black" : "white",
          }}
          size={32}
        />
      </button>
    </div>
  );
};

export default FilmTitleBar;
