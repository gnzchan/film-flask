import { TMDBFilm, TMDBSearchFilm } from "@/types";
import FilmItemTMDB from "./FilmItemTMDB";

interface FilmGridTMDBProps {
  films: TMDBFilm[] | TMDBSearchFilm[];
}

const FilmGridTMDB: React.FC<FilmGridTMDBProps> = ({ films }) => {
  return (
    <div className="mb-5 h-full w-full">
      {films.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-sm font-light text-neutral-400  dark:text-neutral-300">
            Nothing to show
          </p>
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-2 place-items-center gap-5 px-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {films.map((film) => (
            <FilmItemTMDB key={film.id} film={film} priority={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmGridTMDB;
