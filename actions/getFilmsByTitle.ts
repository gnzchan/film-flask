"use server";

import { getData } from "@/lib/helpers";
import { FilmCategory, TMDBSearch } from "@/types";

export const getFilmsByTitle = async (
  category: FilmCategory,
  title: string,
  page: number,
): Promise<TMDBSearch> => {
  if (title === "" || title === undefined) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const tmdbKey = process.env.TMDB_KEY;
  const formattedTitleForUrl = title.replaceAll(" ", "%20");
  const url = `https://api.themoviedb.org/3/search/${category}?query=${formattedTitleForUrl}&api_key=${tmdbKey}&include_adult=false&language=en-US&page=${page}`;

  const films = await getData<TMDBSearch>(url);

  return films;
};
