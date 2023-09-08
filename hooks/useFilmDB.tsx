import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { Film, FilmCategory, Status } from "@/types";
import { useUser } from "./useUser";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmDB = () => {
  const [film, setFilm] = useState<Film | null>(null);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<Status>(Status.TO_WATCH_LATER);

  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const filmEditorModal = useFilmEditorModal();

  const cachedFilm = filmEditorModal.film;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabaseClient
        .from("films")
        .select("*")
        .eq("id", filmEditorModal.film?.imdbID)
        .single();

      setFilm(data as Film);

      if (data) {
        const { data: reviewFromDB } = await supabaseClient
          .from("review_films")
          .select("*")
          .eq("film_id", filmEditorModal.film?.imdbID)
          .eq("user_id", user?.id)
          .single();

        const { data: statusFromDB } = await supabaseClient
          .from("status_films")
          .select("*")
          .eq("film_id", filmEditorModal.film?.imdbID)
          .eq("user_id", user?.id)
          .single();

        if (statusFromDB) {
          setStatus(statusFromDB.status);
        }
        if (reviewFromDB) {
          setReview(reviewFromDB.review);
        }
      }
    };

    fetchData();
  }, [filmEditorModal.film?.imdbID, supabaseClient, user?.id, filmEditorModal]);

  const updateFilm = async (e: FormData) => {
    if ((review || status) && !film) {
      const { error } = await supabaseClient.from("films").insert({
        id: cachedFilm!.imdbID,
        title: cachedFilm!.Title,
        genre: cachedFilm?.Genre ?? "",
        category:
          cachedFilm!.Type === "movie"
            ? FilmCategory.MOVIE
            : FilmCategory.SERIES,
        year: cachedFilm?.Year ?? "",
        language: cachedFilm?.Language ?? "",
      });

      if (error) {
        return toast.error(error.message);
      }
    }

    if (review) {
      const { error } = await supabaseClient.from("review_films").upsert({
        user_id: user!.id,
        film_id: cachedFilm!.imdbID,
        review,
      });

      if (error) {
        return toast.error(error.message);
      }
    }
    if (status) {
      const { error } = await supabaseClient.from("status_films").upsert({
        user_id: user!.id,
        film_id: cachedFilm!.imdbID,
        status,
      });

      if (error) {
        return toast.error(error.message);
      }
    }

    toast.success("Film updated");
  };

  const statusHandler = (s: Status) => setStatus(s);

  const reviewHandler = (r: string) => setReview(r);

  return { film, status, review, updateFilm, statusHandler, reviewHandler };
};

export default useFilmDB;
