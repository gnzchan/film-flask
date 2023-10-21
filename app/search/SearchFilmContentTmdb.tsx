"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FilmGrid from "../../components/ui/FilmGrid";
import Spinner from "../../components/ui/Spinner";

import { Film, FilmCategory, TMDBSearchFilm } from "@/types";
import { delay } from "@/libs/helpers";
import { getFilmsTMDB } from "@/actions/getFilmsByTitle";
import FilmGridTMDB from "@/components/ui/FilmGridTMDB";

interface SearchFilmContentTmdbProps {
  propFilms: TMDBSearchFilm[];
  searchString: string;
  category: FilmCategory;
  totalPages: number;
}

const SearchFilmContentTmdb: React.FC<SearchFilmContentTmdbProps> = ({
  propFilms,
  searchString,
  category,
  totalPages,
}) => {
  const mapToFilm = (tmdbFilms: TMDBSearchFilm[]) =>
    tmdbFilms?.map((tmdbFilm) => ({
      id: tmdbFilm.id,
      title: tmdbFilm.title ?? tmdbFilm.name,
      poster_url: tmdbFilm.poster_path,
      year: tmdbFilm.release_date ?? tmdbFilm.first_air_date,
      category: tmdbFilm.media_type,
    }));

  const [films, setFilms] = useState<Film[]>(mapToFilm(propFilms));
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    setFilms([]);
    setPagesLoaded(0);
    setIsAllPagesLoaded(false);
  }, [searchString, category]);

  useEffect(() => {
    if (propFilms.length !== 0) {
      setPagesLoaded(1);
      setFilms(mapToFilm(propFilms));
    }
  }, [propFilms]);

  useEffect(() => {
    setIsAllPagesLoaded(pagesLoaded === totalPages);
  }, [films, isAllPagesLoaded]);

  useEffect(() => {
    if (inView) {
      loadMoreFilms();
    }
  }, [inView]);

  const loadMoreFilms = async () => {
    await delay(1000);
    const nextPage = pagesLoaded + 1;

    if (nextPage > totalPages) {
      setPagesLoaded(nextPage);
      return setIsAllPagesLoaded(true);
    }

    const { results: newFilms } = await getFilmsTMDB(
      category,
      searchString,
      nextPage,
    );

    if (newFilms) {
      setFilms((prevItems) => [...prevItems, ...mapToFilm(newFilms)]);
    }

    setPagesLoaded(nextPage);
  };

  const content = isAllPagesLoaded ? (
    <p className="text-md font-normal text-gray-400">
      {films.length !== 0
        ? "You're all caught up"
        : "Enter movie title or keywords"}
    </p>
  ) : (
    <Spinner ref={ref} />
  );

  // if (error) {
  //   return (
  //     <div className="my-5 flex items-center justify-center">
  //       <p className="text-md font-normal">
  //         We&apos;re finding it difficult to find what you&apos;re searching.{" "}
  //         {error}
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <>
      <FilmGridTMDB films={films} />
      <div className="my-5 flex items-center justify-center">{content}</div>
    </>
  );
};

export default SearchFilmContentTmdb;
