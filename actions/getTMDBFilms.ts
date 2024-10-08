"use server";

import { getData } from "@/lib/helpers";
import { FilmCategory, TMDBFilm, TMDBSearch } from "@/types";

import getFilmById from "./getFilmById";

const getPopularMovies = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.MOVIE, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getUpcomingMovies = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}&language=en-US`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.MOVIE, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getNowPlayingMovies = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbKey}&language=en-US`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.MOVIE, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getTrendingMovies = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbKey}`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.MOVIE, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getPopularSeries = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${tmdbKey}&language=en-US`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.TV, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getTrendingSeries = async (): Promise<TMDBFilm[]> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${tmdbKey}`;

  const { results } = await getData<TMDBSearch>(url);

  const tmdbDataPromise = results?.map(({ id }) =>
    getFilmById(FilmCategory.TV, id.toString()),
  );

  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

export {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularSeries,
  getTrendingMovies,
  getTrendingSeries,
  getUpcomingMovies,
};
