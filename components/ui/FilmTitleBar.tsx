"use client";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import useFilmLike from "@/hooks/useFilmLike";
import { TMDBFilm } from "@/types";

interface FilmTitleBarProps {
  film: TMDBFilm;
}

const FilmTitleBar: React.FC<FilmTitleBarProps> = ({ film }) => {
  const { liked, likeFilmHandler } = useFilmLike(film);

  return (
    <div className="flex items-center justify-between px-2 py-2">
      {film.title ?? film.name}
      <button onClick={likeFilmHandler}>
        {liked ? (
          <AiFillHeart className="h-7 w-7 text-red-500" />
        ) : (
          <AiOutlineHeart className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

export default FilmTitleBar;
