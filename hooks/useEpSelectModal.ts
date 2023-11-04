import { SeasonEpisode } from "@/types";
import { create } from "zustand";

interface EpSelectModalStore {
  isOpen: boolean;
  title: string;
  filmId: number | undefined;
  season: number | undefined;
  episodes: SeasonEpisode[];
  onOpen: (
    title: string,
    episodes: SeasonEpisode[],
    filmId: number,
    season: number,
  ) => void;
  onClose: () => void;
}

const useEpSelectModal = create<EpSelectModalStore>((set) => ({
  isOpen: false,
  title: "",
  filmId: undefined,
  season: undefined,
  episodes: [],
  onOpen: (title, episodes, filmId, season) =>
    set({ title, episodes, filmId, season, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEpSelectModal;
