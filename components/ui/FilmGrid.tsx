import FilmItem from "./FilmItem";

import { Film } from "@/types";

interface FilmGridProps {
  films: Film[];
}

const FilmGrid: React.FC<FilmGridProps> = ({ films }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[1700px] grid-cols-2 place-items-center gap-5 px-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        {films && films.map((film) => <FilmItem key={film.id} film={film} />)}
      </div>
    </div>
  );
};

export default FilmGrid;
