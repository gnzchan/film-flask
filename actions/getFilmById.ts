import { getData } from "@/libs/helpers";
import { FilmDetails } from "@/types";

const getFilmById = async (id: string): Promise<FilmDetails> => {
  const omdbKey = process.env.OMDB_KEY;
  const url = `https://www.omdbapi.com/?apikey=${omdbKey}&i=${id}&plot=full`;

  const film = await getData<FilmDetails>(url);

  return film;
};

export default getFilmById;
