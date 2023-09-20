import getFilmById from "@/actions/getFilmById";
import Image from "next/image";
import { Film, OMDBFilm } from "@/types";
import { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";

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
    <div className="flex h-[65vh] min-h-[450px]">
      <div className="flex w-full flex-col justify-center gap-5 bg-black px-7">
        <h1 className="text-4xl font-extrabold text-white">{film.Title}</h1>
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
        className="w-full max-w-[400px] bg-cover bg-center md:w-[35vw]"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), 
        url(${film.Poster})`,
        }}
      ></div>
    </div>
  );
};

export default FilmBanner;
