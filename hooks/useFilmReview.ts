import { ChangeEvent, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmReview = (filmId: string) => {
  const [review, setReview] = useState("");
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();

  const fetchReview = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from("review_films")
      .select("review")
      .eq("film_id", filmId)
      .eq("user_id", user.id)
      .single();

    if (data) {
      setReview(data.review);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [user, filmId]);

  useEffect(() => {
    if (!filmEditorModal.isOpen) fetchReview();
  }, [filmEditorModal.isOpen]);

  const addReviewHandler = async (filmId: string) => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    const { error } = await supabaseClient.from("review_films").upsert({
      user_id: user.id,
      film_id: filmId,
      review,
    });

    if (error) return toast.error(error.message);
  };

  const reviewChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setReview(e.target.value);

  return {
    review,
    addReviewHandler,
    reviewChangeHandler,
  };
};

export default useFilmReview;
