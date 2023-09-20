"use client";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Film } from "@/types";
import FilmBanner from "./FilmBanner";
import { twMerge } from "tailwind-merge";

interface ThumbGalleryProps {
  films: Film[];
}

const ThumbGallery: React.FC<ThumbGalleryProps> = ({ films }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-3 pl-3 text-2xl font-light text-neutral-800">
        Popular on Film Flask
      </h1>
      <div className="flex h-[85vh] min-h-[590px] flex-col justify-around">
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
              <SwiperSlide key={film.id}>
                <FilmBanner filmId={film.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            slidesPerView={4.5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {films.map((film, i) => (
              <SwiperSlide key={film.id}>
                <div
                  className={twMerge(
                    "m-2 h-[15vh] min-h-[100px] w-full overflow-hidden rounded-md bg-cover bg-center transition",
                    activeIndex === i ? "scale-105 shadow-md" : "",
                  )}
                  style={{
                    backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), 
        url(${film.poster_url})`,
                  }}
                >
                  <div className="flex h-full cursor-pointer items-center justify-center p-3 backdrop-blur-sm backdrop-brightness-50">
                    <p className="truncate text-center text-sm font-extrabold text-white md:text-xl">
                      {film.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ThumbGallery;
