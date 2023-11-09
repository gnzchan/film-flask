"use client";

import { useEffect, useState } from "react";

import FilmBanner from "../../components/custom-ui/FilmBanner";

import { TMDBFilm, TMDBSearchFilm } from "@/types";
import FilmCarousell from "./FilmCarousell";
import Spinner from "@/components/custom-ui/Spinner";

interface ThumbGalleryProps {
  films: TMDBFilm[];
  popularMovies: TMDBFilm[];
  upcomingMovies: TMDBFilm[];
}

const ThumbGallery: React.FC<ThumbGalleryProps> = ({
  films,
  popularMovies,
  upcomingMovies,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeFilm, setActiveFilm] = useState<TMDBFilm>(
    films[0] || popularMovies[0] || upcomingMovies[0],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-7">
        <Spinner />
        <p className="animate-pulse text-sm font-light text-neutral-700 dark:text-neutral-300">
          Your adventure awaits...
        </p>
      </div>
    );
  }

  const handleSetFilm = (film: TMDBFilm) => {
    setActiveFilm(film);
  };

  return (
    <div className="flex h-full min-h-[600px] flex-col">
      <div className="h-[60vh] min-h-[360px]">
        <FilmBanner film={activeFilm} />
      </div>
      <div className="no-scrollbar h-[40vh] min-h-[270px] snap-y overflow-y-auto">
        <FilmCarousell
          title="Popular on Film Flask"
          films={films}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Popular Movies"
          films={popularMovies}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Upcoming Movies"
          films={upcomingMovies}
          handleSetFilm={handleSetFilm}
        />
      </div>
    </div>
  );
};

export default ThumbGallery;
