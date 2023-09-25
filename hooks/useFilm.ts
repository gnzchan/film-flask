import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import useFilmEditorModal from "./useFilmEditorModal";
import { FilmCategory, OMDBFilm } from "@/types";

const useFilm = (filmId: string) => {
  const { setListed } = useFilmEditorModal();
  const { supabaseClient } = useSessionContext();

  const fetchListed = async () => {
    const { data } = await supabaseClient
      .from("films")
      .select("*")
      .eq("id", filmId)
      .maybeSingle();

    setListed(data ? true : false);
  };

  useEffect(() => {
    fetchListed();
  }, []);

  const addFilmToListHandler = async (film: OMDBFilm) => {
    const { error } = await supabaseClient.from("films").insert({
      id: film.imdbID,
      title: film.Title,
      genre: film.Genre ?? "",
      category:
        film.Type === "movie" ? FilmCategory.MOVIE : FilmCategory.SERIES,
      year: film.Year ?? "",
      language: film.Language ?? "",
      poster_url: film.Poster ?? "",
    });

    if (error) return toast.error(error.message);
  };

  return { fetchListed, addFilmToListHandler };
};

export default useFilm;
