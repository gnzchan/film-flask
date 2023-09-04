import { create } from "zustand";

import { FilmDetails } from "@/types";

interface FilmEditorModalStore {
  film: FilmDetails | null;
  isOpen: boolean;
  setFilm: (film: FilmDetails) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilmEditorModal = create<FilmEditorModalStore>((set) => ({
  film: null,
  isOpen: false,
  setFilm: (film: FilmDetails) => set({ film: film }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilmEditorModal;
