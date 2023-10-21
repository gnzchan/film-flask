"use server";

import { getData } from "@/libs/helpers";
import { FilmCategory, TMDBSearch } from "@/types";

// export const getFilmsByTitle = async (
//   title: string,
//   page: number = 1,
// ): Promise<OMDBSearch> => {
//   if (title === "" || title === undefined) {
//     return {
//       Response: "False",
//       Search: [],
//       totalResults: 0,
//     };
//   }

//   const omdbKey = process.env.OMDB_KEY;
//   const formattedTitleForUrl = title.replaceAll(" ", "+");
//   const url = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${formattedTitleForUrl}&page=${page}`;

//   const films = await getData<OMDBSearch>(url);

//   return films;
// };

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
