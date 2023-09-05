"use client";

import Image from "next/image";

import Button from "./Button";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import { FilmDetails } from "@/types";
import { useEffect } from "react";

interface FilmInfoProps {
  film: FilmDetails;
}

const FilmInfo: React.FC<FilmInfoProps> = ({ film }) => {
  const filmEditorModal = useFilmEditorModal();

  useEffect(() => {
    filmEditorModal.setFilm(film);
  }, []);

  return (
    <>
      <div
        className="bg-cover"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
        url(${film.Poster})`,
        }}
      >
        <div className="flex flex-col items-center gap-5 px-5 py-7 backdrop-blur-sm backdrop-brightness-50">
          <div className="relative aspect-[3/4] w-[60%] max-w-[400px] drop-shadow-2xl">
            <Image
              src={
                film.Poster !== "N/A" ? film.Poster : "/images/movie-poster.jpg"
              }
              alt={`${film.Title} Poster`}
              fill
              className="rounded-lg border"
            />
          </div>
          <div className="flex items-center justify-center">
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
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-6 text-xs font-medium capitalize text-white">
              <div className="flex items-center justify-center gap-2">
                <div className="relative aspect-square h-8">
                  <Image src="/images/imdb.png" alt="IMDb Logo" fill />
                </div>
                <p>{film.imdbRating} / 10</p>
              </div>
              <p>{film.Language}</p>
              <p>{film.Type}</p>
              <p>{film.Year}</p>
            </div>
            <h1 className="text-4xl font-extrabold text-white">{film.Title}</h1>
            <p className="text-justify text-sm font-normal text-gray-400">
              {film.Plot}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-around bg-black px-5 text-white">
        <div className="flex items-center justify-center">
          <p className="text-md">{film.Director}</p>
        </div>
        <div className="flex justify-around">
          {film.Actors.split(",").map((actor, i) => (
            <p key={`${actor}-${i}`} className="text-xs">
              {actor}
            </p>
          ))}
        </div>
        <div>
          <Button onClick={filmEditorModal.onOpen} className="font-medium">
            Add to List
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilmInfo;
