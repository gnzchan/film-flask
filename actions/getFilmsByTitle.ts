import { getData } from "@/libs/helpers";
import { Search, SearchFilm } from "@/types";

const getFilmsByTitle = async (title: string): Promise<Search> => {
  if (title === "" || title === undefined) {
    return {
      Response: false,
      Search: [],
      totalResults: 0,
    };
  }

  const omdbKey = process.env.OMDB_KEY;
  const formattedTitleForUrl = title.replaceAll(" ", "+");
  const url = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${formattedTitleForUrl}`;
  const films = await getData<Search>(url);

  console.log(films);

  return films;
};

export default getFilmsByTitle;
