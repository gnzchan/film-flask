"use server";

import { getData } from "@/lib/helpers";
import { FilmCategory, TMDBFilm } from "@/types";

const getFilmById = async (
  category: FilmCategory,
  id: string,
): Promise<TMDBFilm> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${category}/${id}?api_key=${tmdbKey}&language=en-US`;

  const film = await getData<TMDBFilm>(url);

  film.category = category;

  return film;
};

export default getFilmById;
