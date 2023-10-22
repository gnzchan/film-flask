import Link from "next/link";

import { Film, TMDBSearchFilm } from "@/types";
import { genres } from "@/constants";

interface FilmItemTMDBProps {
  film: TMDBSearchFilm;
}

const FilmItemTMDB: React.FC<FilmItemTMDBProps> = ({ film }) => {
  return (
    <Link
      href={`/film/${film.id}`}
      className="flex aspect-[3/4] w-full items-center justify-center"
    >
      <div className="w-full overflow-hidden rounded-md bg-black shadow-lg shadow-zinc-950">
        <div
          className="flex aspect-[3/4] w-full flex-col justify-end bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
           url(${
             film.poster_path
               ? `https://image.tmdb.org/t/p/w185/${film.poster_path}`
               : "/images/movie-poster.jpg"
           })`,
          }}
        >
          <div className="group flex h-full w-full flex-col items-start justify-end transition hover:justify-center hover:backdrop-blur-sm hover:backdrop-brightness-50">
            <div className="flex w-full flex-col gap-2 p-3">
              <h1 className="text-lg font-bold text-white">{film.title}</h1>
              <div className="hidden flex-col gap-2 text-xs font-medium capitalize text-white group-hover:flex">
                {film.genre_ids.map((genre, i) => (
                  <div
                    key={`${genre}-${i}`}
                    className="flex w-full items-center justify-center rounded-full border border-gray-300 px-2 py-1 font-medium text-gray-400 "
                  >
                    <div className="max-w-full flex-initial text-xs font-normal leading-none">
                      <h1 className="text-white">
                        {genres.find((g) => g.id === genre)?.name}
                      </h1>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-evenly">
                  <p>{film.original_language}</p>
                  {film.origin_country && <p>{film.origin_country}</p>}
                  <p>{film.release_date ?? film.first_air_date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmItemTMDB;
