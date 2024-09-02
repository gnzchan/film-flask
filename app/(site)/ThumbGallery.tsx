"use client";

import { useEffect, useState } from "react";

import { TMDBFilm } from "@/types";
import FilmBanner from "../../components/custom-ui/FilmBanner";
import FilmCarousell from "./FilmCarousell";

interface ThumbGalleryProps {
  films: TMDBFilm[];
  popularMovies: TMDBFilm[];
  upcomingMovies: TMDBFilm[];
  nowPlayingMovies: TMDBFilm[];
  topRatedMovies: TMDBFilm[];
}

const ThumbGallery: React.FC<ThumbGalleryProps> = ({
  films,
  popularMovies,
  upcomingMovies,
  nowPlayingMovies,
  topRatedMovies,
}) => {
  const [activeFilm, setActiveFilm] = useState<TMDBFilm>(
    films[0] || popularMovies[0] || upcomingMovies[0],
  );

  useEffect(() => {
    setActiveFilm(films[0] || popularMovies[0] || upcomingMovies[0]);
  }, [films, popularMovies, upcomingMovies]);

  const handleSetFilm = (film: TMDBFilm) => {
    setActiveFilm(film);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="h-[60vh] min-h-[360px]">
        <FilmBanner film={activeFilm} />
      </div>
      <div className="no-scrollbar h-[40vh] snap-y overflow-y-auto">
        <FilmCarousell
          title="Popular on Film Flask"
          films={films}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Popular Movies"
          films={popularMovies}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Now Playing"
          films={nowPlayingMovies}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Top Rated Movies"
          films={topRatedMovies}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Upcoming Movies"
          films={upcomingMovies}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
      </div>
    </div>
  );
};

export default ThumbGallery;
