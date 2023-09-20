"use server";

import { getData } from "@/libs/helpers";
import { OMDBFilm } from "@/types";

const getFilmById = async (
  id: string,
  plotLength: string = "full",
): Promise<OMDBFilm> => {
  const omdbKey = process.env.OMDB_KEY;
  const url = `https://www.omdbapi.com/?apikey=${omdbKey}&i=${id}&plot=${plotLength}`;

  const film = await getData<OMDBFilm>(url);

  return film;
};

export default getFilmById;
