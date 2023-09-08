"use server";

import { getData } from "@/libs/helpers";
import { OMDBSearch } from "@/types";

const getFilmsByTitle = async (
  title: string,
  page: number = 1,
): Promise<OMDBSearch> => {
  if (title === "" || title === undefined) {
    return {
      Response: "False",
      Search: [],
      totalResults: 0,
    };
  }

  const omdbKey = process.env.OMDB_KEY;
  const formattedTitleForUrl = title.replaceAll(" ", "+");
  const url = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${formattedTitleForUrl}&page=${page}`;

  const films = await getData<OMDBSearch>(url);

  return films;
};

export default getFilmsByTitle;
