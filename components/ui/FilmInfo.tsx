"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import Button from "./Button";
import UploadImage from "./UploadImage";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilmReviewsAndImages from "@/hooks/useFilmReviewsAndImages";
import { OMDBFilm } from "@/types";
import { getFormattedTime } from "@/libs/helpers";

interface FilmInfoProps {
  film: OMDBFilm;
}

const FilmInfo: React.FC<FilmInfoProps> = ({ film }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();
  const { fetchReviews } = useFilmReviewsAndImages(film.imdbID);

  useEffect(() => {
    filmEditorModal.setFilm(film);
    fetchReviews();
  }, []);

  const handleClick = () => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    return filmEditorModal.onOpen();
  };

  return (
    <>
      <div
        className="bg-white bg-cover bg-center dark:bg-black"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(${
            theme === "light" ? "255, 255, 255" : "0, 0, 0"
          }) 70%), 
          url(${
            film?.Poster !== "N/A" ? film.Poster : "/images/movie-poster.jpg"
          })`,
        }}
      >
        <div className="flex flex-col items-center gap-5 px-5 py-4 backdrop-blur-sm">
          <div className="relative aspect-[3/4] min-h-[350px] w-[60%] min-w-[263px] max-w-[400px] drop-shadow-2xl">
            <Image
              src={
                film.Poster !== "N/A" ? film.Poster : "/images/movie-poster.jpg"
              }
              alt={`${film.Title} Poster`}
              priority={true}
              fill
              sizes="(max-width: 750px) 100vw"
              className="rounded-lg border"
            />
          </div>
          <div className="flex items-center justify-center">
            {film.Genre.split(",").map((genre, i) => (
              <div
                key={`${genre}-${i}`}
                className="m-1 flex items-center justify-center rounded-full border border-gray-500 px-2  py-1 font-medium text-gray-600 dark:border-gray-300 dark:text-gray-400 "
              >
                <div className="max-w-full flex-initial text-xs font-normal leading-none">
                  <p>{genre}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-6 text-xs font-medium capitalize">
              <div className="flex items-center justify-center gap-2">
                <div className="relative aspect-square h-8">
                  <Image
                    src="/images/imdb.png"
                    alt="IMDb Logo"
                    sizes="(max-width: 70px) 100vw"
                    fill
                  />
                </div>
                <p>{film.imdbRating} / 10</p>
              </div>
              <p>{film.Language}</p>
              <p>{film.Type}</p>
              <p>{film.Year}</p>
            </div>
            <h1 className="text-4xl font-extrabold ">{film.Title}</h1>
            <p className="text-justify text-sm font-normal text-gray-600 dark:text-gray-400">
              {film.Plot}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-white px-5 py-3 dark:bg-black">
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
        <div className="flex items-center justify-center">
          <Button onClick={handleClick} className="font-medium">
            Change status
          </Button>
        </div>
      </div>

      <div className="flex h-full flex-col gap-3 bg-white px-5 py-3  dark:bg-black">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-center text-sm italic text-gray-400">
          Add film to add a review
        </p>
        <div className="flex flex-col gap-2 divide-y">
          {filmEditorModal.reviewsAndImages.map((review, i) => (
            <div key={i} className="flex flex-col">
              <p className="text-md font-medium">{review.users.full_name}</p>
              <p className="text-sm">{review.review}</p>
              <div className="flex gap-1">
                {review.image_path.map((image) => (
                  <UploadImage key={image.name} image={image} />
                ))}
              </div>
              <p className="text-right text-xs text-gray-600">
                {getFormattedTime(
                  review.updated_at ? review.updated_at : review.created_at,
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilmInfo;
