import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "./Button";

import getFilmById from "@/actions/getFilmById";
import { OMDBFilm } from "@/types";

interface FilmBannerProps {
  filmId: string;
}

const FilmBanner: React.FC<FilmBannerProps> = ({ filmId }) => {
  const [film, setFilm] = useState<OMDBFilm>();

  useEffect(() => {
    const fetchFilmInfo = async () => {
      const data = await getFilmById(filmId, "short");

      setFilm(data);
    };

    fetchFilmInfo();
  }, []);

  if (!film) {
    return;
  }

  return (
    <div className="mx-8 mb-10 flex h-[65vh] min-h-[450px] overflow-hidden rounded-md bg-black shadow-xl shadow-zinc-950">
      <div className="flex w-full flex-col justify-center gap-5 px-7">
        <h1 className="text-xl font-extrabold text-white md:text-4xl">
          {film.Title}
        </h1>
        <div className="flex items-center">
          {film.Genre.split(",").map((genre, i) => (
            <div
              key={`${genre}-${i}`}
              className="m-1 flex items-center justify-center rounded-full border border-gray-300  px-2 py-1 font-medium text-gray-400 "
            >
              <div className="max-w-full flex-initial text-xs font-normal leading-none">
                <h1 className="text-white">{genre}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 text-xs font-medium capitalize text-white">
          <p>{film.Language}</p>
          <p>{film.Type}</p>
          <p>{film.Year}</p>
        </div>
        <p className="text-justify text-sm font-normal text-gray-400">
          {film.Plot}
        </p>
        <Link href={`/film/${film.imdbID}`}>
          <Button className="max-w-sm font-medium">View more info</Button>
        </Link>
      </div>
      <div
        className="hidden aspect-[3/4] overflow-visible bg-cover bg-center md:block"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)), 
        url(${film.Poster})`,
        }}
      ></div>
    </div>
  );
};

export default FilmBanner;
