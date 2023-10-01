import { create } from "zustand";

import { ImageReview, OMDBFilm, CommentReview } from "@/types";

interface FilmEditorModalStore {
  omdbFilm: OMDBFilm | null;
  listed: boolean;
  reviews: CommentReview[];
  imageReviews: ImageReview[];
  isOpen: boolean;
  setFilm: (omdbFilm: OMDBFilm) => void;
  setListed: (isListed: boolean) => void;
  setReviews: (reviews: CommentReview[]) => void;
  setImageReviews: (imageReviews: ImageReview[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  omdbFilm: null,
  listed: false,
  reviews: [],
  imageReviews: [],
  isOpen: false,
  setFilm: (omdbFilm) => set({ omdbFilm }),
  setListed: (isListed) => set({ listed: isListed }),
  setReviews: (reviews) => set({ reviews }),
  setImageReviews: (imageReviews) => set({ imageReviews }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
