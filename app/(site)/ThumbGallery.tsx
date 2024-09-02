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
  trendingMovies: TMDBFilm[];
  trendingSeries: TMDBFilm[];
  popularSeries: TMDBFilm[];
}

const ThumbGallery: React.FC<ThumbGalleryProps> = ({
  films,
  popularMovies,
  upcomingMovies,
  nowPlayingMovies,
  trendingMovies,
  trendingSeries,
  popularSeries,
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
          title="Trending Movies this Week"
          films={trendingMovies}
          priority={true}
          handleSetFilm={handleSetFilm}
        />
        <FilmCarousell
          title="Trending Series this Week"
          films={trendingSeries}
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
          title="Popular Series"
          films={popularSeries}
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
