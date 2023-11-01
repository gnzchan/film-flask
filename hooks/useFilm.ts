import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import useFilmEditorModal from "./useFilmEditorModal";
import { FilmCategory, TMDBFilm } from "@/types";

const useFilm = (
  id: number | undefined,
  category: FilmCategory | undefined,
) => {
  const { setListed } = useFilmEditorModal();
  const { supabaseClient } = useSessionContext();

  const fetchListed = async () => {
    if (!id || !category) return;

    const { data } = await supabaseClient
      .from("films")
      .select("*")
      .eq("id", id)
      .eq("category", category)
      .maybeSingle();

    setListed(data ? true : false);
  };

  useEffect(() => {
    fetchListed();
  }, [id, category]);

  const addFilmToListHandler = async (film: TMDBFilm) => {
    const { error } = await supabaseClient.from("films").insert({
      id: film.id,
      title: film.title ?? film.name,
      category:
        film.category === "movie" ? FilmCategory.MOVIE : FilmCategory.TV,
    });

    if (error) return toast.error(error.message);
  };

  return {
    fetchListed,
    addFilmToListHandler,
  };
};

export default useFilm;
