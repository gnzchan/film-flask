"use client";

import { useInView } from "react-intersection-observer";

import { useEffect, useState } from "react";
import FilmItem from "./SearchFilmContentItem";
import Spinner from "./Spinner";

import { OMDBSearchFilm } from "@/types";
import { delay } from "@/libs/helpers";
import getFilmsByTitle from "@/actions/getFilmsByTitle";

interface SearchFilmContentProps {
  films: OMDBSearchFilm[];
  title: string;
  totalPages: number;
  error?: string;
}

const SearchFilmContent: React.FC<SearchFilmContentProps> = ({
  films: propFilms,
  title,
  totalPages,
  error,
}) => {
  const [films, setFilms] = useState<OMDBSearchFilm[]>(propFilms);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    setFilms([]);
    setPagesLoaded(1);
    setIsAllPagesLoaded(false);
  }, [title]);

  useEffect(() => {
    setFilms(propFilms);
  }, [propFilms]);

  useEffect(() => {
    if (inView) {
      loadMoreFilms();
    }
  }, [inView]);

  const loadMoreFilms = async () => {
    await delay(1000);
    const nextPage = pagesLoaded + 1;

    if (nextPage >= totalPages) {
      return setIsAllPagesLoaded(true);
    }

    const { Search: newFilms } = await getFilmsByTitle(title, nextPage);
    setFilms((prevItems) => [...prevItems, ...newFilms]);
    setPagesLoaded(nextPage);
  };

  const content = isAllPagesLoaded ? (
    <div>{films.length === 0 ? "Start searching" : "All results shown"}</div>
  ) : (
    <Spinner />
  );

  if (error) {
    return (
      <div>
        Were finding it difficult to find what you&apos;re searching. {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-3">
        {films &&
          films.map((film) => <FilmItem key={film.imdbID} film={film} />)}
      </div>
      <div className="flex items-center justify-center" ref={ref}>
        {content}
      </div>
    </>
  );
};

export default SearchFilmContent;
