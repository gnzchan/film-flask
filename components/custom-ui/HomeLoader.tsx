"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ThumbGallery from "@/app/(site)/ThumbGallery";
import { TMDBFilm } from "@/types";
import Spinner from "./Spinner";

const HomeLoader = () => {
  const [loaded, setLoaded] = useState(false);
  const [sbPopular, setSbPopular] = useState<TMDBFilm[]>([]);
  const [tmdbPopular, setTmdbPopular] = useState<TMDBFilm[]>([]);
  const [tmdbUpcoming, setTmdbUpcoming] = useState<TMDBFilm[]>([]);

  useEffect(() => {
    setLoaded(false);

    const popularInSBPromise = axios.get<TMDBFilm[]>("/api/sb");
    const popularMoviePromise = axios.get<TMDBFilm[]>("/api/tmdb/popular");
    const upcomingMoviePromise = axios.get<TMDBFilm[]>("/api/tmdb/upcoming");

    const fetchHome = async () => {
      const [sbPopularResponse, tmdbPopularResponse, tmdbUpcomingResponse] =
        await Promise.all([
          popularInSBPromise,
          popularMoviePromise,
          upcomingMoviePromise,
        ]);

      setSbPopular(sbPopularResponse.data);
      setTmdbPopular(tmdbPopularResponse.data);
      setTmdbUpcoming(tmdbUpcomingResponse.data);
    };

    fetchHome();
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-7">
        <Spinner />
        <p className="animate-pulse text-sm font-light text-neutral-700 dark:text-neutral-300">
          Your adventure awaits...
        </p>
      </div>
    );
  }

  return (
    <div>
      <ThumbGallery
        films={sbPopular}
        popularMovies={tmdbPopular}
        upcomingMovies={tmdbUpcoming}
      />
    </div>
  );
};

export default HomeLoader;
