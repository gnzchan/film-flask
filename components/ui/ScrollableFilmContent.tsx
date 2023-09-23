"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";
import qs from "query-string";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";

import FilmItem from "./FilmItem";

import { Film } from "@/types";

interface ScrollableFilmContentProps {
  title: string;
  films: Film[];
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
    if (index === 0) {
      return firstItemRef;
    } else if (index + 1 === films.length) {
      return lastItemRef;
    }
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
    <div className="my-2">
      <div className="my-1 flex h-10 items-center justify-between px-5 transition">
        <h1 className="text-2xl font-light text-neutral-800 dark:text-white">
          {title}
        </h1>
        {films.length !== 0 && seeMore && (
          <button
            onClick={seeMoreHandler}
            className="flex items-center gap-2 text-sm font-light text-neutral-400 transition hover:text-neutral-600 dark:text-neutral-300"
          >
            <span>See all</span>
            <HiArrowRight />
          </button>
        )}
      </div>
      {films.length !== 0 ? (
        <Swiper
          navigation={true}
          freeMode={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            500: { slidesPerView: 2.5 },
            750: { slidesPerView: 3.5 },
            1120: { slidesPerView: 4.5 },
          }}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
        >
          {films.map((film, i) => (
            <SwiperSlide key={film.id}>
              <div ref={setItemRef(i)} className="mx-3 mb-8 mt-2">
                <FilmItem film={film} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-l font-light text-neutral-800">no films found</h1>
        </div>
      )}
    </div>
  );
};

export default ScrollableFilmContent;
