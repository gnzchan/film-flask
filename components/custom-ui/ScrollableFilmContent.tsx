"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";
import qs from "query-string";

import { TMDBFilm } from "@/types";
import FilmItemTMDB from "./FilmItemTMDB";

interface ScrollableFilmContentProps {
  title: string;
  films: TMDBFilm[];
}

const ScrollableFilmContent: React.FC<ScrollableFilmContentProps> = ({
  films,
  title,
}) => {
  const [seeMore, setSeeMore] = useState(false);
  const { ref: firstItemRef, inView: firstItemInView } = useInView();
  const { ref: lastItemRef, inView: lastItemInView } = useInView();
  const router = useRouter();

  useEffect(() => {
    if (firstItemInView && lastItemInView) {
      setSeeMore(false);
    } else {
      setSeeMore(true);
    }
  }, [firstItemInView, lastItemInView]);

  const setItemRef = (index: number) => {
    if (index === 0) return firstItemRef;
    else if (index + 1 === films.length) return lastItemRef;
  };

  const seeMoreHandler = () => {
    const query = {
      status: title,
    };

    const url = qs.stringifyUrl({
      url: "/watchlist",
      query,
    });

    router.push(url);
  };

  return (
    <div className="h-full snap-end snap-always pb-5">
      <div className="m-3 flex h-full items-center justify-between py-3">
        <h1 className="text-2xl font-light text-neutral-800 dark:text-white">
          {title}
        </h1>
        {films.length >= 2 && seeMore && (
          <button
            onClick={seeMoreHandler}
            className="flex items-center gap-2 text-sm font-light text-neutral-400 transition hover:text-neutral-600 dark:text-neutral-300"
          >
            <span>See all</span>
            <HiArrowRight />
          </button>
        )}
      </div>
      {films.length === 0 ? (
        <p className="text-center text-sm font-light text-neutral-400  dark:text-neutral-300">
          No films for status {title}
        </p>
      ) : (
        <div className="no-scrollbar flex h-[270px] w-full snap-x snap-mandatory overflow-auto">
          {films.map((film, i) => (
            <div
              key={film.id}
              className="ml-3 aspect-[3/4] h-full"
              ref={setItemRef(i)}
            >
              <FilmItemTMDB film={film} priority={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollableFilmContent;
