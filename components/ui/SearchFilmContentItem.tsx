import { OMDBSearchFilm } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface FilmItemProps {
  film: OMDBSearchFilm;
}

const FilmItem: React.FC<FilmItemProps> = ({ film }) => {
  return (
    <Link href={`/film/${film.imdbID}`}>
      <div className="flex cursor-pointer items-center gap-x-3 overflow-hidden rounded-md bg-slate-400 p-2">
        <div className="relative min-h-[160px] min-w-[108px] overflow-hidden rounded-md">
          <Image
            src={
              film.Poster !== "N/A" ? film.Poster : "/images/movie-poster.jpg"
            }
            alt={`${film.Title} Poster`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className=" text-xs">{film.Title}</p>
          <p className="truncate text-sm ">{film.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default FilmItem;
