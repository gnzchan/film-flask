import { ChangeEvent, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { Film, FilmCategory, Review, Status } from "@/types";
import { useUser } from "./useUser";
import useFilmEditorModal from "./useFilmEditorModal";
import useFilmStore from "./useFilmStore";
import useAuthModal from "./useAuthModal";

const useFilmDB = () => {
  const authModal = useAuthModal();
  const filmStore = useFilmStore();

  const [status, setStatus] = useState<Status>(Status.TO_WATCH_LATER);
  const [review, setReview] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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
      fetchFilmReviewStatus();
      fetchFilmLikeStatus();
    }
  }, [filmStore.film]);

  useEffect(() => {
    if (filmStore.film && !filmEditorModal.isOpen) {
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

  const fetchFilmLikeStatus = async () => {
    if (!user) {
      return;
    }

    const { data } = await supabaseClient
      .from("liked_films")
      .select("*")
      .eq("user_id", user.id)
      .eq("film_id", cachedFilm?.imdbID)
      .single();

    setIsLiked(data ? true : false);
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
        poster_url: cachedFilm?.Poster ?? "",
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

  const likeFilmHandler = async () => {
    if (!user) {
      return authModal.onOpen("You need to sign in to use this feature");
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_films")
        .delete()
        .eq("user_id", user.id)
        .eq("film_id", cachedFilm!.imdbID);

      if (error) {
        return toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient.from("liked_films").insert({
        user_id: user!.id,
        film_id: cachedFilm!.imdbID,
      });

      if (error) {
        return toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }
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
    isLiked,
    updateFilm,
    statusChangeHandler,
    reviewChangeHandler,
    likeFilmHandler,
  };
};

export default useFilmDB;
