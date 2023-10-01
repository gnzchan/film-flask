import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import useFilmEditorModal from "./useFilmEditorModal";
import useFilmImages from "./useFilmImages";
import { ImageReview, CommentReview, Review } from "@/types";

const useFilmReviewsAndImages = (filmId: string) => {
  const [reviewsAndImages, setReviewsAndImages] = useState<Review[]>([]);
  const { supabaseClient } = useSessionContext();
  const { fetchImage } = useFilmImages(filmId);
  const filmEditorModal = useFilmEditorModal();

  useEffect(() => {
    fetchFilmReviews();
    fetchFilmImages();
  }, []);

  useEffect(() => {
    if (!filmEditorModal.isOpen) {
      fetchFilmReviews();
      fetchFilmImages();
    }
  }, [filmEditorModal.isOpen]);

  useEffect(() => {
    mergeCommentAndImageReview(
      filmEditorModal.reviews,
      filmEditorModal.imageReviews,
    );
  }, [filmEditorModal.reviews, filmEditorModal.imageReviews]);

  const fetchFilmReviews = async () => {
    const { data } = await supabaseClient
      .from("review_films")
      .select("*, users(*)")
      .eq("film_id", filmId);

    filmEditorModal.setReviews(data as CommentReview[]);
  };

  const fetchFilmImages = async () => {
    const { data } = await supabaseClient
      .from("image_films")
      .select("*, users(*)")
      .eq("film_id", filmId);

    filmEditorModal.setImageReviews(data as ImageReview[]);
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

  return { reviewsAndImages, fetchFilmReviews, fetchFilmImages };
};

export default useFilmReviewsAndImages;
