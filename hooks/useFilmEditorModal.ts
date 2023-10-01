import { create } from "zustand";

import { ImageReview, OMDBFilm, CommentReview, Review } from "@/types";

interface FilmEditorModalStore {
  omdbFilm: OMDBFilm | null;
  listed: boolean;
  isOpen: boolean;
  reviewsAndImages: Review[];
  setFilm: (omdbFilm: OMDBFilm) => void;
  setListed: (isListed: boolean) => void;
  setReviewsAndImages: (reviewsAndImages: Review[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  omdbFilm: null,
  listed: false,
  isOpen: false,
  reviewsAndImages: [],
  setFilm: (omdbFilm) => set({ omdbFilm }),
  setListed: (isListed) => set({ listed: isListed }),
  setReviewsAndImages: (reviewsAndImages) => set({ reviewsAndImages }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
