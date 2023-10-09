"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { twMerge } from "tailwind-merge";

import FilmBanner from "../../components/ui/FilmBanner";

import { OMDBFilm } from "@/types";

interface ThumbGalleryProps {
  films: OMDBFilm[];
}

const ThumbGallery: React.FC<ThumbGalleryProps> = ({ films }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: 5000,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper2"
      >
        {films.map((film) => (
          <SwiperSlide key={film.imdbID}>
            <FilmBanner film={film} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          550: { slidesPerView: 4.5 },
          800: { slidesPerView: 6.5 },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {films.map((film, i) => (
          <SwiperSlide key={film.imdbID}>
            <div
              className={twMerge(
                "m-8 mt-2 h-[15vh] min-h-[100px] w-full overflow-hidden rounded-md bg-cover bg-center shadow-xl shadow-zinc-950 transition",
                activeIndex === i && "scale-105",
              )}
              style={{
                backgroundImage: `url(${
                  film?.Poster !== "N/A"
                    ? film.Poster
                    : "/images/movie-poster.jpg"
                })`,
              }}
            >
              <div className="flex h-full cursor-pointer items-center justify-center p-3 backdrop-brightness-50">
                <p className="truncate text-center text-xs font-semibold text-white md:text-sm ">
                  {film.Title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbGallery;
