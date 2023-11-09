"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "../../components/custom-ui/Spinner";

import { FilmCategory, TMDBSearchFilm } from "@/types";
import { delay } from "@/lib/helpers";
import { getFilmsByTitle } from "@/actions/getFilmsByTitle";
import FilmGridTMDB from "@/components/custom-ui/FilmGridTMDB";

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
  const [films, setFilms] = useState<TMDBSearchFilm[]>(propFilms);
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
      setFilms(propFilms.map((pf) => ({ ...pf, category })));
    }
  }, [propFilms, category]);

  useEffect(() => {
    setIsAllPagesLoaded(pagesLoaded === totalPages);
  }, [films, isAllPagesLoaded]);

  useEffect(() => {
    const loadMoreFilms = async () => {
      await delay(1000);
      const nextPage = pagesLoaded + 1;

      if (nextPage > totalPages) {
        setPagesLoaded(nextPage);
        return setIsAllPagesLoaded(true);
      }

      const { results: newFilms } = await getFilmsByTitle(
        category,
        searchString,
        nextPage,
      );

      if (newFilms) {
        setFilms((prevItems) => [
          ...prevItems,
          ...newFilms.map((nf) => ({ ...nf, category })),
        ]);
      }

      setPagesLoaded(nextPage);
    };

    if (inView) {
      loadMoreFilms();
    }
  }, [inView]);

  const content = isAllPagesLoaded ? (
    <p className="text-center text-sm font-light text-neutral-400  dark:text-neutral-300">
      {films.length !== 0
        ? "You're all caught up"
        : "Enter movie title or keywords"}
    </p>
  ) : (
    <Spinner ref={ref} />
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <FilmGridTMDB films={films} />
      <div className="my-5">{content}</div>
    </div>
  );
};

export default SearchFilmContentTmdb;
