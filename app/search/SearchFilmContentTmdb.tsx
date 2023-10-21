"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FilmGrid from "../../components/ui/FilmGrid";
import Spinner from "../../components/ui/Spinner";

import { Film, OMDBSearchFilm, TMDBFilm, TMDBSearchFilm } from "@/types";
import { delay } from "@/libs/helpers";
import { getFilmsTMDB } from "@/actions/getFilmsByTitle";
import FilmGridTMDB from "@/components/ui/FilmGridTMDB";

interface SearchFilmContentTmdbProps {
  propFilms: TMDBSearchFilm[];
  searchString: string;
  totalPages: number;
}

const SearchFilmContentTmdb: React.FC<SearchFilmContentTmdbProps> = ({
  propFilms,
  searchString,
  totalPages,
}) => {
  const mapToFilm = (tmdbFilms: TMDBSearchFilm[]) =>
    tmdbFilms?.map((tmdbFilm) => ({
      id: tmdbFilm.id,
      title: tmdbFilm.name,
      poster_url: tmdbFilm.poster_path,
      year: tmdbFilm.release_date ?? tmdbFilm.first_air_date,
      category: tmdbFilm.media_type,
    }));

  const [films, setFilms] = useState<TMDBFilm[]>(mapToFilm(propFilms));
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
      // console.log("fetch 20");
      loadMoreFilms();
    }
  }, [propFilms, isAllPagesLoaded]);

  useEffect(() => {
    if (inView) {
      console.log("hehe");
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

    const { results: newFilms } = await getFilmsTMDB(
      searchString,
      nextPage + 1,
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
    <Spinner />
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
      <div className="my-5 flex items-center justify-center" ref={ref}>
        {content}
      </div>
    </>
  );
};

export default SearchFilmContentTmdb;
