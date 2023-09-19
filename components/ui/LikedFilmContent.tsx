"use client";

import FilmGrid from "./FilmGrid";

import useLikedFilms from "@/hooks/useLikedFilms";

const LikedFilmContent = () => {
  const { films } = useLikedFilms();

  return <FilmGrid films={films} />;
};

export default LikedFilmContent;
