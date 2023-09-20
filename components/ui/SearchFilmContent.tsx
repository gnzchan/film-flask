"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FilmGrid from "./FilmGrid";
import Spinner from "./Spinner";

import { Film, OMDBSearchFilm } from "@/types";
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
  const mapToFilm = (omdbFilms: OMDBSearchFilm[]) =>
    omdbFilms?.map((omdbFilm) => ({
      id: omdbFilm.imdbID,
      title: omdbFilm.Title,
      poster_url: omdbFilm.Poster,
      year: omdbFilm.Year,
      category: omdbFilm.Type,
    }));

  const [films, setFilms] = useState<Film[]>(mapToFilm(propFilms));
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    setFilms([]);
    setPagesLoaded(1);
    setIsAllPagesLoaded(false);
  }, [title]);

  useEffect(() => {
    setFilms(mapToFilm(propFilms));
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
    setFilms((prevItems) => [...prevItems, ...mapToFilm(newFilms)]);
    setPagesLoaded(nextPage);
  };

  const content = isAllPagesLoaded ? (
    <p className="text-md font-normal">
      {films.length === 0 ? "Start searching" : "You're all caught up"}
    </p>
  ) : (
    <Spinner />
  );

  if (error) {
    return (
      <div className="my-5 flex items-center justify-center">
        <p className="text-md font-normal">
          We&apos;re finding it difficult to find what you&apos;re searching.{" "}
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <FilmGrid films={films} />
      <div className="my-5 flex items-center justify-center" ref={ref}>
        {content}
      </div>
    </>
  );
};

export default SearchFilmContent;
