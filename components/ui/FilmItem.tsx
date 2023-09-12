import Link from "next/link";

import { Film } from "@/types";

interface FilmItemProps {
  film: Film;
}

const FilmItem: React.FC<FilmItemProps> = ({ film }) => {
  return (
    <Link href={`/film/${film.id}`}>
      <div className="h-64 w-min overflow-hidden rounded-md bg-black shadow-lg">
        <div
          className="flex aspect-[3/4] h-56 flex-col justify-end bg-cover px-2"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
        url(${film.poster_url})`,
          }}
        >
          <h1 className="text-lg font-bold text-white">{film.title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default FilmItem;
