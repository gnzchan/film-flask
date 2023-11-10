import { useEffect, useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { User } from "@supabase/gotrue-js";
import axios from "axios";

import GenreChips from "./GenreChips";
import Button from "./Button";
import Spinner from "./Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FilmCategory, SeasonEpisode, TMDBFilm } from "@/types";
import useAuthModal from "@/hooks/useAuthModal";
import useEpSelectModal from "@/hooks/useEpSelectModal";

interface FilmInfoBannerProps {
  film: TMDBFilm;
  user: User | null;
  clickStatusHandler: () => void;
}

const FilmInfoBanner = ({
  film,
  user,
  clickStatusHandler,
}: FilmInfoBannerProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const authModal = useAuthModal();
  const epSelectModal = useEpSelectModal();

  const [season, setSeason] = useState(film?.number_of_seasons);
  const [episodes, setEpisodes] = useState<SeasonEpisode[]>([]);
  const [epLoading, setEpLoading] = useState(true);

  const fetchEpisodes = async (season: string | number) => {
    setEpLoading(true);
    const response = await axios.get(
      `/api/episodes?category=${film.category}&id=${film.id}&season=${season}`,
    );

    setEpisodes(response.data.episodes);
    setEpLoading(false);
  };

  useEffect(() => {
    if (film.category === FilmCategory.TV) {
      fetchEpisodes(film.number_of_seasons.toString());
    }
  }, []);

  const handleClickPlay = () => {
    if (!user) {
      return authModal.onOpen("You need to sign in to access this content");
    }

    if (film.category === FilmCategory.TV) {
      return epSelectModal.onOpen(film.name, episodes, film.id, season);
    }

    return router.replace(`/film/play/${film.category}/${film.id}`);
  };

  const handleSeasonChange = async (seasonInput: string) => {
    const value = parseInt(seasonInput);
    setSeason(value);
    await fetchEpisodes(seasonInput);
  };

  return (
    <div
      className="flex min-h-screen w-full items-end bg-white bg-cover bg-center bg-no-repeat pb-5 pt-56 dark:bg-black"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgb(${
            theme === "dark" ? "0, 0, 0" : "255, 255, 255"
          }) 100%),
          url(${
            film.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`
              : "/images/movie-poster.jpg"
          })`,
      }}
    >
      <div className="w-full items-center gap-4 md:grid md:grid-cols-3">
        <div className="flex flex-col gap-5 p-5 md:col-span-2">
          <GenreChips genreProp={film.genres} />
          <div className="flex items-center gap-6 text-xs font-medium">
            <div className="flex items-center justify-center gap-1">
              <AiOutlineFire />
              <p>{film.popularity}</p>
            </div>
            <p className=" capitalize">
              {film.spoken_languages.map((l) => l.english_name).join(", ")}
            </p>
            <p className="uppercase">{film.category}</p>
            <p>{film.release_date ?? film.first_air_date}</p>
          </div>
          <h1 className="text-4xl font-extrabold ">
            {film.name ?? film.title}
          </h1>
          <p className="text-justify text-sm font-normal text-gray-600 dark:text-gray-400">
            {film.overview}
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row md:justify-start">
            <Button
              onClick={handleClickPlay}
              disabled={film.category === FilmCategory.TV && epLoading}
              className="grid grid-cols-3 items-center bg-white font-medium text-black shadow-lg shadow-zinc-300 dark:bg-black dark:text-white"
            >
              {film.category === FilmCategory.TV && epLoading ? (
                <Spinner className="h-6 w-6" />
              ) : (
                <BsPlayFill className="col-span-1 h-6 w-6" />
              )}
              <span className="col-span-2">Play</span>
            </Button>
            {film.category === FilmCategory.TV && (
              <Select
                onValueChange={handleSeasonChange}
                disabled={epLoading}
                defaultValue={film.number_of_seasons.toString()}
              >
                <SelectTrigger className="w-[150px] max-w-[360px] rounded-sm border border-gray-300 border-transparent bg-white text-black shadow-lg shadow-zinc-300 transition hover:opacity-75 dark:border-gray-300 dark:bg-black dark:text-white dark:shadow-none">
                  {epLoading ? (
                    <div className="flex w-full items-center justify-center">
                      <Spinner className="h-6 w-6" />
                    </div>
                  ) : (
                    <SelectValue />
                  )}
                </SelectTrigger>
                <SelectContent className="w-[150px] max-w-[360px] rounded-sm border border-gray-300 border-transparent bg-white text-black shadow-lg shadow-zinc-300 transition hover:opacity-75 dark:border-gray-300 dark:bg-black dark:text-white dark:shadow-none">
                  {film.seasons.map((season) => (
                    <SelectItem
                      key={season.id}
                      className="w-[150px] max-w-[360px] truncate focus:outline-none sm:w-full"
                      value={season.season_number.toString()}
                    >
                      {`Season ${season.season_number}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              onClick={clickStatusHandler}
              className="min-w-[150px] font-medium"
            >
              Change status
            </Button>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <div className="relative aspect-[3/4] w-52 drop-shadow-2xl">
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
        </div>
      </div>
    </div>
  );
};

export default FilmInfoBanner;
