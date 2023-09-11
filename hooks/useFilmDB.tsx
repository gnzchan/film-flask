import { ChangeEvent, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { Film, FilmCategory, Review, Status } from "@/types";
import { useUser } from "./useUser";
import useFilmEditorModal from "./useFilmEditorModal";
import useFilmStore from "./useFilmStore";

const useFilmDB = () => {
  const filmStore = useFilmStore();

  const [status, setStatus] = useState<Status>(Status.TO_WATCH_LATER);
  const [review, setReview] = useState("");

  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const filmEditorModal = useFilmEditorModal();

  const cachedFilm = filmEditorModal.film;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabaseClient
        .from("films")
        .select("*")
        .eq("id", cachedFilm?.imdbID)
        .single();

      if (data) filmStore.setFilm(data as Film);
      else {
        filmStore.setFilm();
        filmStore.setReviews([]);
        setReview("");
        setStatus(Status.TO_WATCH_LATER);
      }
    };

    fetchData();
  }, [supabaseClient, cachedFilm]);

  useEffect(() => {
    if (filmStore.film) {
      fetchFilmReviews();
    }
  }, [filmStore.film]);

  useEffect(() => {
    if (filmStore.film && !filmEditorModal.isOpen) {
      const fetchFilmReviewStatus = async () => {
        const { data: reviewFromDB } = await supabaseClient
          .from("review_films")
          .select("*")
          .eq("film_id", cachedFilm?.imdbID)
          .eq("user_id", user?.id)
          .single();

        const { data: statusFromDB } = await supabaseClient
          .from("status_films")
          .select("*")
          .eq("film_id", cachedFilm?.imdbID)
          .eq("user_id", user?.id)
          .single();

        if (statusFromDB) {
          setStatus(statusFromDB.status);
        }
        if (reviewFromDB) {
          setReview(reviewFromDB.review);
        }
      };

      fetchFilmReviewStatus();
    }
  }, [filmEditorModal.isOpen]);

  const fetchFilmReviews = async () => {
    const { data: reviewsFromDB } = await supabaseClient
      .from("review_films")
      .select("*, users(*)")
      .eq("film_id", cachedFilm?.imdbID);

    filmStore.setReviews(reviewsFromDB as Review[]);
  };

  const updateFilm = async () => {
    if ((review || status) && !filmStore.film) {
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

    filmEditorModal.onClose();
    toast.success("Film updated");
    await fetchFilmReviews();
  };

  const statusChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setStatus(e.target.value as Status);

  const reviewChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setReview(e.target.value);

  return {
    status,
    review,
    updateFilm,
    statusChangeHandler,
    reviewChangeHandler,
  };
};

export default useFilmDB;
