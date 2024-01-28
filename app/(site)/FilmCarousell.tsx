import { TMDBFilm } from "@/types";
import FilmItemTMDB from "@/components/custom-ui/FilmItemTMDB";

interface FilmCarousellProps {
  title: string;
  films: TMDBFilm[];
  priority: boolean;
  handleSetFilm: (film: TMDBFilm) => void;
}

const FilmCarousell: React.FC<FilmCarousellProps> = ({
  title,
  films,
  priority,
  handleSetFilm,
}) => {
  if (films.length === 0) return;

  return (
    <div className="flex h-full snap-end snap-always flex-col">
      <h1 className="m-2 pl-3 text-2xl font-light text-neutral-800 dark:text-white">
        {title}
      </h1>
      <div className="flex h-full w-full snap-x snap-mandatory items-center overflow-auto pb-3">
        {films.map((film) => (
          <div
            key={film.id}
            className="ml-3 aspect-[3/4] h-full max-h-[300px]"
            onClick={() => handleSetFilm(film)}
            onTouchStart={() => handleSetFilm(film)}
          >
            <FilmItemTMDB film={film} priority={priority} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmCarousell;
