"use server";

import { getData } from "@/lib/helpers";
import { CreditsResponse, FilmCategory } from "@/types";

const getFilmCreditsById = async (
  category: FilmCategory,
  id: string,
): Promise<CreditsResponse> => {
  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${tmdbKey}&language=en-US`;

  const credits = await getData<CreditsResponse>(url);

  return credits;
};

export default getFilmCreditsById;
