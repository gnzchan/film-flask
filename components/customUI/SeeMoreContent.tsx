"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

import { TMDBFilm } from "@/types";
import FilmGridTMDB from "./FilmGridTMDB";

interface SeeMoreContentProps {
  films: TMDBFilm[];
}

const SeeMoreContent: React.FC<SeeMoreContentProps> = ({ films }) => {
  const router = useRouter();

  return (
    <div className="my-2 flex flex-col">
      <div className="flex h-10 items-center justify-between px-5 transition">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-light text-neutral-400 transition hover:text-neutral-600 dark:text-neutral-300"
        >
          <HiArrowLeft />
          <span>Back</span>
        </button>
      </div>
      <FilmGridTMDB films={films} />
    </div>
  );
};

export default SeeMoreContent;
