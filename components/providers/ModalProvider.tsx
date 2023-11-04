"use client";

import { useEffect, useState } from "react";

import FilmEditorModal from "../modals/FilmEditorModal";
import AuthModal from "../modals/AuthModal";
import EpSelectModal from "../modals/EpSelectModal";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FilmEditorModal />
      <AuthModal />
      <EpSelectModal />
    </>
  );
};

export default ModalProvider;
