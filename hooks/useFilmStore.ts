import { create } from "zustand";

import { Film, Review } from "@/types";

interface FilmStore {
  film: Film | undefined;
  reviews: Review[];
  setFilm: (film?: Film) => void;
  setReviews: (reviews: Review[]) => void;
}

const useFilmStore = create<FilmStore>((set) => ({
  film: undefined,
  reviews: [],
  setFilm: (film?: Film) => set({ film }),
  setReviews: (reviews: Review[]) => set({ reviews }),
}));

export default useFilmStore;
