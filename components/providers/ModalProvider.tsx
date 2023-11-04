"use client";

import { useEffect, useState } from "react";

import FilmEditorModal from "../customUI/FilmEditorModal";
import AuthModal from "../customUI/AuthModal";
import EpSelectModal from "../customUI/EpSelectModal";

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
