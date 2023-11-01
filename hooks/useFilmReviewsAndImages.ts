import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { ImageReview, CommentReview } from "@/types";
import useFilmEditorModal from "./useFilmEditorModal";
import useCommonFunctions from "./useCommonFunctions";

const useFilmReviewsAndImages = (
  filmId: number | undefined,
  filmCategory: string | undefined,
) => {
  const { supabaseClient } = useSessionContext();
  const { fetchImage } = useCommonFunctions();
  const { setReviewsAndImages } = useFilmEditorModal();

  useEffect(() => {
    fetchReviews();
  }, [filmId, filmCategory]);

  const fetchReviews = async () => {
    if (!filmId || !filmCategory) return;

    const reviews = await fetchFilmReviews();
    const images = await fetchFilmImages();

    mergeCommentAndImageReview(reviews, images);
  };

  const fetchFilmReviews = async () => {
    const { data } = await supabaseClient
      .from("review_films")
      .select(
        "review, created_at, updated_at, user:users!inner(*), films!inner()",
      )
      .eq("film_id", filmId)
      .eq("films.category", filmCategory)
      .returns<CommentReview[]>();

    return data ?? [];
  };

  const fetchFilmImages = async () => {
    const { data } = await supabaseClient
      .from("image_films")
      .select("*, user:users!inner(*), films!inner()")
      .eq("film_id", filmId)
      .eq("films.category", filmCategory)
      .returns<ImageReview[]>();

    return data ?? [];
  };

  const mergeCommentAndImageReview = async (
    reviews: CommentReview[],
    imageReviews: ImageReview[],
  ) => {
    // Create a map to group ImageReviews by user_id
    const imageReviewMap = new Map<string, File[]>();

    for (const imageReview of imageReviews) {
      const { user, image_path } = imageReview;
      if (!imageReviewMap.has(user.id)) {
        imageReviewMap.set(user.id, []);
      }
      const imageFile = await fetchImage(image_path);
      imageReviewMap.get(user.id)?.push(imageFile);
    }

    // Merge ImageReviews into corresponding Reviews
    const mergedReviews = reviews.map((review) => ({
      ...review,
      image_path: imageReviewMap.get(review.user.id) || [],
    }));

    setReviewsAndImages(mergedReviews);
  };

  return { fetchReviews };
};

export default useFilmReviewsAndImages;
