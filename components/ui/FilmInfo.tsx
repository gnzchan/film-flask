"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AiOutlineFire } from "react-icons/ai";

import Button from "./Button";
import UploadImage from "./UploadImage";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilmReviewsAndImages from "@/hooks/useFilmReviewsAndImages";
import { Cast, Crew, TMDBFilm } from "@/types";
import { getFormattedTime } from "@/libs/helpers";
import { genres } from "@/constants";
import axios from "axios";

interface FilmInfoProps {
  film: TMDBFilm;
}

const FilmInfo: React.FC<FilmInfoProps> = ({ film }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();
  // const { fetchReviews } = useFilmReviewsAndImages(film.imdbID);

  const [casts, setCasts] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);

  useEffect(() => {
    filmEditorModal.setFilm(film);

    const fetchCredits = async () => {
      const response = await axios.get(
        `/api/credits?category=${film.category}&id=${film.id}`,
      );
      const castsFromApi = response.data.cast.map((cast: any) => cast);
      const crewFromApi = response.data.crew.map((cast: any) => cast);

      setCasts(castsFromApi);
      setCrew(crewFromApi);
    };

    fetchCredits();
  }, []);

  const handleClick = () => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    return filmEditorModal.onOpen();
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex min-h-screen w-full items-end bg-white bg-cover bg-center pb-5 dark:bg-black"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgb(${
            theme === "light" ? "255, 255, 255" : "0, 0, 0"
          }) 100%),
          url(${
            film.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`
              : "/images/movie-poster.jpg"
          })`,
        }}
      >
        <div className="w-full items-center gap-4 md:grid md:grid-cols-3">
          <div className="flex flex-col gap-5 p-5 md:col-span-2">
            <div className="flex items-center justify-center gap-1">
              {film.genres.map((genre, i) => (
                <div
                  key={`${genre}-${i}`}
                  className="flex items-center justify-center rounded-full border border-gray-600 px-2 py-1 text-xs font-medium text-gray-600 dark:border-gray-400 dark:text-gray-400 "
                >
                  <p>{genres.find((g) => g.id === genre.id)?.name}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 text-xs font-medium">
              <div className="flex items-center justify-center gap-1">
                <AiOutlineFire />
                <p>{film.popularity}</p>
              </div>
              <p className=" capitalize">
                {film.spoken_languages.map((l) => l.english_name).join(", ")}
              </p>
              <p className="uppercase">{film.category}</p>
              <p>{film.release_date ?? film.first_air_date}</p>
            </div>
            <h1 className="text-4xl font-extrabold ">
              {film.name ?? film.title}
            </h1>
            <p className="text-justify text-sm font-normal text-gray-600 dark:text-gray-400">
              {film.overview}
            </p>
            <div className="flex items-center justify-center">
              <Button onClick={handleClick} className="font-medium">
                Change status
              </Button>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative aspect-[3/4] w-52 drop-shadow-2xl">
              <Image
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w780/${film.poster_path}`
                    : "/images/movie-poster.jpg"
                }
                alt={`${film.title ?? film.name} Poster`}
                priority={true}
                fill
                sizes="(max-width: 750px) 100vw"
                className="rounded-lg border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5 bg-white dark:bg-black">
        <div className="relative aspect-[3/4] w-52 drop-shadow-2xl md:hidden">
          <Image
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w780/${film.poster_path}`
                : "/images/movie-poster.jpg"
            }
            alt={`${film.title ?? film.name} Poster`}
            priority={true}
            fill
            sizes="(max-width: 750px) 100vw"
            className="rounded-lg border"
          />
        </div>
        <div className="w-full overflow-auto py-4">
          <div className="flex items-center gap-4 px-3 lg:justify-around">
            {casts.slice(0, 7).map((cast) => (
              <div
                key={cast.cast_id}
                className="flex w-28 flex-col items-center gap-2"
              >
                <div className="relative aspect-[3/4] w-28 rounded-md ">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`}
                    alt={cast.name}
                    fill
                    className="rounded-md"
                  />
                </div>
                <p className="text-center text-xs">
                  {cast.name}
                  <br />
                  <span className="text-gray-600">{cast.character}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center">
            <span className="text-sm text-gray-600">film by</span>
            <br />
            {crew.find((crew) => crew.job === "Director")?.name}
          </p>
        </div>
      </div>

      {/* <div className="flex h-full flex-col gap-3 bg-white px-5 py-3 dark:bg-black">
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
      </div> */}
    </div>
  );
};

export default FilmInfo;
