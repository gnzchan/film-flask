import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import useFilmEditorModal from "./useFilmEditorModal";
import { Review } from "@/types";

const useFilmReviews = (filmId: string) => {
  const { supabaseClient } = useSessionContext();
  const filmEditorModal = useFilmEditorModal();

  const fetchFilmReviews = async () => {
    const { data } = await supabaseClient
      .from("review_films")
      .select("*, users(*)")
      .eq("film_id", filmId);

    filmEditorModal.setReviews(data as Review[]);
  };

  useEffect(() => {
    fetchFilmReviews();
  }, []);

  return { fetchFilmReviews };
};

export default useFilmReviews;
