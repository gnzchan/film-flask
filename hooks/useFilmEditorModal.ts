import { create } from "zustand";

import { OMDBFilm } from "@/types";

interface FilmEditorModalStore {
  film: OMDBFilm | null;
  isOpen: boolean;
  setFilm: (film: OMDBFilm) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  film: null,
  isOpen: false,
  setFilm: (film: OMDBFilm) => set({ film: film }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
