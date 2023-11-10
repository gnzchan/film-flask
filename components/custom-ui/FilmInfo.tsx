"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilmReviewsAndImages from "@/hooks/useFilmReviewsAndImages";
import { CreditsResponse, TMDBFilm } from "@/types";

import Spinner from "./Spinner";
import CreditsContainer from "./CreditsContainer";
import FilmInfoBanner from "./FilmInfoBanner";
import ReviewsContainer from "./ReviewsContainer";
import CenterContentWrapper from "./CenterContentWrapper";
import LoadingContent from "./LoadingContent";

interface FilmInfoProps {
  film: TMDBFilm;
  credits: CreditsResponse;
}

const FilmInfo: React.FC<FilmInfoProps> = ({ film, credits }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();
  const { fetchReviews } = useFilmReviewsAndImages(film.id, film.category);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    filmEditorModal.setFilm(film);

    fetchReviews();
  }, [user, film]);

  const handleClickStatus = () => {
    if (!user) {
      return authModal.onOpen("You need to sign in to access this content");
    }
    return filmEditorModal.onOpen();
  };

  if (!mounted) {
    return (
      <LoadingContent
        className="h-[100vh]"
        string="Almost there, just a few more seconds..."
      />
    );
  }

  return (
    <div className="w-full bg-white dark:bg-black">
      <CenterContentWrapper>
        <div className="flex h-full w-full flex-col">
          <FilmInfoBanner
            film={film}
            user={user}
            clickStatusHandler={handleClickStatus}
          />
          <div className="flex w-full flex-col items-center gap-5 bg-white dark:bg-black">
            <div className="relative aspect-[3/4] w-52 drop-shadow-2xl md:hidden">
              <Image
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${film.poster_path}`
                    : "/images/movie-poster.jpg"
                }
                alt={`${film.title ?? film.name} Poster`}
                priority={true}
                fill
                sizes="(min-width: 0px) 215px"
                className="rounded-lg border"
              />
            </div>
            <CreditsContainer credits={credits} />
          </div>
          <ReviewsContainer reviews={filmEditorModal.reviewsAndImages} />
        </div>
      </CenterContentWrapper>
    </div>
  );
};

export default FilmInfo;
