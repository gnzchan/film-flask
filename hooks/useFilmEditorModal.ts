import { create } from "zustand";

import { OMDBFilm, Review } from "@/types";

interface FilmEditorModalStore {
  omdbFilm: OMDBFilm | null;
  reviews: Review[];
  isOpen: boolean;
  setFilm: (omdbFilm: OMDBFilm) => void;
  setReviews: (reviews: Review[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  omdbFilm: null,
  reviews: [],
  isOpen: false,
  setFilm: (omdbFilm) => set({ omdbFilm }),
  setReviews: (reviews) => set({ reviews }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
