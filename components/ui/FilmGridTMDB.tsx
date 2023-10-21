import FilmItem from "./FilmItem";

import { Film } from "@/types";
import FilmItemTMDB from "./FilmItemTMDB";

interface FilmGridTMDBProps {
  films: Film[];
}

const FilmGridTMDB: React.FC<FilmGridTMDBProps> = ({ films }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[1700px] grid-cols-2 place-items-center gap-5 px-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {films &&
          films.map((film) => <FilmItemTMDB key={film.id} film={film} />)}
      </div>
    </div>
  );
};

export default FilmGridTMDB;
