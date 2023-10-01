import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import useFilmImages from "./useFilmImages";
import { ImageReview, CommentReview } from "@/types";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmReviewsAndImages = (filmId: string) => {
  const { supabaseClient } = useSessionContext();
  const { fetchImage } = useFilmImages(filmId);
  const { setReviewsAndImages } = useFilmEditorModal();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const reviews = await fetchFilmReviews();
    const images = await fetchFilmImages();

    mergeCommentAndImageReview(reviews, images);
  };

  const fetchFilmReviews = async () => {
    const { data } = await supabaseClient
      .from("review_films")
      .select("*, users(*)")
      .eq("film_id", filmId);

    return data as CommentReview[];
  };

  const fetchFilmImages = async () => {
    const { data } = await supabaseClient
      .from("image_films")
      .select("*, users(*)")
      .eq("film_id", filmId);

    return data as ImageReview[];
  };

  const mergeCommentAndImageReview = async (
    reviews: CommentReview[],
    imageReviews: ImageReview[],
  ) => {
    // Create a map to group ImageReviews by user_id
    const imageReviewMap = new Map<string, File[]>();

    for (const imageReview of imageReviews) {
      const { user_id, image_path } = imageReview;
      if (!imageReviewMap.has(user_id)) {
        imageReviewMap.set(user_id, []);
      }
      const imageFile = await fetchImage(image_path);
      imageReviewMap.get(user_id)?.push(imageFile);
    }

    // Merge ImageReviews into corresponding Reviews
    const mergedReviews = reviews.map((review) => ({
      ...review,
      image_path: imageReviewMap.get(review.user_id) || [],
    }));

    setReviewsAndImages(mergedReviews);
  };

  return { fetchReviews };
};

export default useFilmReviewsAndImages;
