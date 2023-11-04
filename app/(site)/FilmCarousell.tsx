import { TMDBFilm } from "@/types";
import FilmItemTMDB from "@/components/custom-ui/FilmItemTMDB";

interface FilmCarousellProps {
  title: string;
  films: TMDBFilm[];
  handleSetFilm: (film: TMDBFilm) => void;
}

const FilmCarousell: React.FC<FilmCarousellProps> = ({
  title,
  films,
  handleSetFilm,
}) => {
  if (films.length === 0) return;

  return (
    <div className="flex h-full snap-end snap-always flex-col pb-5">
      <h1 className="m-3 pl-3 text-2xl font-light text-neutral-800 dark:text-white">
        {title}
      </h1>
      <div className="no-scrollbar flex h-[200px] w-full snap-x snap-mandatory overflow-auto">
        {films.map((film) => (
          <div
            key={film.id}
            className="ml-3 aspect-[3/4] h-full"
            onClick={() => handleSetFilm(film)}
            onTouchStart={() => handleSetFilm(film)}
          >
            <FilmItemTMDB film={film} />  
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmCarousell;
