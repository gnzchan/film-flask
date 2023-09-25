import { create } from "zustand";

import { OMDBFilm, Review } from "@/types";

interface FilmEditorModalStore {
  omdbFilm: OMDBFilm | null;
  listed: boolean;
  reviews: Review[];
  isOpen: boolean;
  setFilm: (omdbFilm: OMDBFilm) => void;
  setListed: (isListed: boolean) => void;
  setReviews: (reviews: Review[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  omdbFilm: null,
  listed: false,
  reviews: [],
  isOpen: false,
  setFilm: (omdbFilm) => set({ omdbFilm }),
  setListed: (isListed) => set({ listed: isListed }),
  setReviews: (reviews) => set({ reviews }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
