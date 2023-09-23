import FilmItem from "./FilmItem";

import { Film } from "@/types";

interface FilmGridProps {
  films: Film[];
}

const FilmGrid: React.FC<FilmGridProps> = ({ films }) => {
  return (
    <div className="grid grid-cols-2 place-items-center gap-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {films && films.map((film) => <FilmItem key={film.id} film={film} />)}
    </div>
  );
};

export default FilmGrid;
