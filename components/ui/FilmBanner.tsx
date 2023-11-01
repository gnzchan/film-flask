import Link from "next/link";
import { useTheme } from "next-themes";

import Button from "./Button";

import { TMDBFilm } from "@/types";
import { genres } from "@/constants";
import GenreChips from "./GenreChips";

interface FilmBannerProps {
  film: TMDBFilm | undefined;
}

const FilmBanner: React.FC<FilmBannerProps> = ({ film }) => {
  const { theme } = useTheme();

  if (!film) return;

  return (
    <div
      className="sticky top-0 flex aspect-video h-[60%] w-full flex-col items-center justify-end bg-white bg-cover bg-center p-1 dark:bg-black sm:items-start sm:p-5"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgb(${
            theme === "light" ? "255, 255, 255" : "0, 0, 0"
          }) 100%),
          url(${
            film.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`
              : "/images/movie-poster.jpg"
          })`,
      }}
    >
      <GenreChips genreProp={film.genres} className="sm:hidden" />
      <h1 className="my-1 text-center text-lg font-extrabold sm:my-4 sm:text-xl md:text-3xl">
        {film.title ?? film.name}
      </h1>
      <div className="flex w-full scale-75 flex-col items-center justify-between sm:scale-100 sm:flex-row-reverse">
        <GenreChips genreProp={film.genres} className="hidden sm:flex" />
        <Link href={`/film/${film.category}/${film.id}`}>
          <Button className="rounded-sm font-medium shadow-none">
            View more info
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FilmBanner;
