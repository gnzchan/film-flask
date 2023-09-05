import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  title: string;
  onOpen: (title: string) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  title: "",
  onOpen: (title) => set({ title, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
