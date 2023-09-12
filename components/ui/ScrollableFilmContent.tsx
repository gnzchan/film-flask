"use client";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import FilmItem from "./FilmItem";

import { Film } from "@/types";
import { useRef } from "react";

interface ScrollableFilmContentProps {
  title: string;
  films: Film[];
}

const ScrollableFilmContent: React.FC<ScrollableFilmContentProps> = ({
  title,
  films,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-neutral-700">{title}</h1>
      <div className="flex items-center gap-2">
        <div
          onClick={slideLeft}
          className="hover-opacity-100 flex h-44 cursor-pointer items-center justify-center rounded-md bg-neutral-200 opacity-50 transition hover:scale-110"
        >
          <MdChevronLeft size={40} />
        </div>
        <div
          ref={sliderRef}
          className="scrollbar-hide flex w-full gap-4 overflow-x-scroll scroll-smooth"
        >
          {films.map((film) => (
            <FilmItem key={film.id} film={film} />
          ))}
        </div>
        <div
          onClick={slideRight}
          className="hover-opacity-100 flex h-44 cursor-pointer items-center justify-center rounded-md bg-neutral-200 opacity-50 transition hover:scale-110"
        >
          <MdChevronRight size={40} />
        </div>
      </div>
    </div>
  );
};

export default ScrollableFilmContent;
