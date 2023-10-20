"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FilmGrid from "../../components/ui/FilmGrid";
import Spinner from "../../components/ui/Spinner";

import { Film, OMDBSearchFilm } from "@/types";
import { delay } from "@/libs/helpers";
import getFilmsByTitle from "@/actions/getFilmsByTitle";

interface SearchFilmContentProps {
  propFilms: OMDBSearchFilm[];
  searchString: string;
  totalPages: number;
  error: string | undefined;
}

const SearchFilmContent: React.FC<SearchFilmContentProps> = ({
  propFilms,
  searchString,
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
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    setFilms([]);
    setPagesLoaded(0);
    setIsAllPagesLoaded(searchString === "");
  }, [searchString]);

  useEffect(() => {
    setFilms(mapToFilm(propFilms));
    setIsAllPagesLoaded(pagesLoaded === totalPages);

    if (films.length === 10 && !isAllPagesLoaded) {
      loadMoreFilms();
    }
  }, [propFilms, isAllPagesLoaded]);

  useEffect(() => {
    if (inView) {
      loadMoreFilms();
    }
  }, [inView]);

  const loadMoreFilms = async () => {
    await delay(1000);
    const nextPage = pagesLoaded + 1;

    if (nextPage > totalPages - 1) {
      setPagesLoaded(nextPage);
      return setIsAllPagesLoaded(true);
    }

    const { Search: newFilms } = await getFilmsByTitle(
      searchString,
      nextPage + 1,
    );

    if (newFilms) {
      setFilms((prevItems) => [...prevItems, ...mapToFilm(newFilms)]);
    }

    setPagesLoaded(nextPage);
  };

  const content = isAllPagesLoaded ? (
    <p className="text-md font-normal">
      {films.length !== 0
        ? "You're all caught up"
        : "Enter movie title or keywords"}
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
