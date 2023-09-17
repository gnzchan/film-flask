"use client";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import FilmItem from "./FilmItem";

import { Film } from "@/types";
import { useRef } from "react";

enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

interface ScrollableFilmContentProps {
  title: string;
  films: Film[];
}

const ScrollableFilmContent: React.FC<ScrollableFilmContentProps> = ({
  title,
  films,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slide = (direction: Direction) => {
    if (sliderRef.current) {
      if (direction === Direction.LEFT) {
        sliderRef.current.scrollLeft -= 250;
      } else {
        sliderRef.current.scrollLeft += 250;
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-neutral-700">{title}</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => slide(Direction.LEFT)}
          className="hover-opacity-100 flex h-44 cursor-pointer items-center justify-center rounded-md bg-neutral-200 opacity-50 transition hover:scale-110"
        >
          <MdChevronLeft size={40} />
        </button>
        <div
          ref={sliderRef}
          className="flex w-full gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {films.map((film) => (
            <FilmItem key={film.id} film={film} />
          ))}
        </div>
        <button
          onClick={() => slide(Direction.RIGHT)}
          className="hover-opacity-100 flex h-44 cursor-pointer items-center justify-center rounded-md bg-neutral-200 opacity-50 transition hover:scale-110"
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default ScrollableFilmContent;
