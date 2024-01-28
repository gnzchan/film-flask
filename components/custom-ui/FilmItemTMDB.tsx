import Link from "next/link";
import { AiOutlineFire } from "react-icons/ai";
import Image from "next/image";

import { TMDBFilm, TMDBSearchFilm } from "@/types";
import Button from "./Button";

interface FilmItemTMDBProps {
  film: TMDBFilm | TMDBSearchFilm;
  priority: boolean;
}

const FilmItemTMDB: React.FC<FilmItemTMDBProps> = ({ film, priority }) => {
  return (
    <div className="group relative aspect-[3/4] h-full w-full cursor-pointer snap-end rounded-md">
      <Image
        alt={`Poster-${film.name ?? film.title}`}
        fill
        src={
          film.poster_path
            ? `https://image.tmdb.org/t/p/w342/${film.poster_path}`
            : "/images/movie-poster.jpg"
        }
        sizes="(min-width: 0) 200px"
        className="rounded-md"
        priority={priority}
      />
      <div className="h-full w-full rounded-md transition hover:justify-center hover:backdrop-brightness-50 group-hover:backdrop-blur-sm">
        <div className="hidden h-full w-full flex-col items-center justify-between rounded-md p-3 text-xs font-medium text-white group-hover:flex">
          <h1 className="text-md text-center text-white">
            {film.title ?? film.name}
          </h1>
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-center justify-evenly capitalize">
              <p>{film.original_language}</p>
              <p>{film.release_date ?? film.first_air_date}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <AiOutlineFire />
              <p>{film.popularity}</p>
            </div>
          </div>
          <Link href={`/film/${film.category}/${film.id}`}>
            <Button className="whitespace-nowrap bg-white text-black shadow-none">
              View more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilmItemTMDB;
