import { create } from "zustand";

import { Review, TMDBFilm } from "@/types";

interface FilmEditorModalStore {
  tmdbFilm: TMDBFilm | null;
  listed: boolean;
  isOpen: boolean;
  reviewsAndImages: Review[];
  setFilm: (tmdbFilm: TMDBFilm) => void;
  setListed: (isListed: boolean) => void;
  setReviewsAndImages: (reviewsAndImages: Review[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  tmdbFilm: null,
  listed: false,
  isOpen: false,
  reviewsAndImages: [],
  setFilm: (tmdbFilm) => set({ tmdbFilm }),
  setListed: (isListed) => set({ listed: isListed }),
  setReviewsAndImages: (reviewsAndImages) => set({ reviewsAndImages }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
