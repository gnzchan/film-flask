"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

import FilmGrid from "./FilmGrid";
import Header from "./Header";

import { Film } from "@/types";

interface SeeMoreContentProps {
  films: Film[];
}

const SeeMoreContent: React.FC<SeeMoreContentProps> = ({ films }) => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col">
      <button onClick={() => router.back()}>
        <HiArrowLeft />
      </button>
      <FilmGrid films={films} />
    </div>
  );
};

export default SeeMoreContent;
