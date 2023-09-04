"use client";

import { useEffect, useState } from "react";

import FilmEditorModal from "../ui/FilmEditorModal";

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
    </>
  );
};

export default ModalProvider;
