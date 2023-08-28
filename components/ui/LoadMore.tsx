"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "./Spinner";
import SearchContent from "./SearchContent";
import { SearchFilm } from "@/types";
import getFilmsByTitle from "@/actions/getFilmsByTitle";
import { delay, getTotalPages } from "@/libs/helpers";

interface LoadMoreProps {
  title: string;
  totalResults: number;
  response: string;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  title,
  totalResults,
  response,
}) => {
  const [films, setFilms] = useState<SearchFilm[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(false);
  const { ref, inView } = useInView();

  const totalPages = getTotalPages(totalResults);

  useEffect(() => {
    if (inView) {
      loadMoreFilms();
    }
  }, [inView]);

  useEffect(() => {
    setFilms([]);
    setPagesLoaded(1);
    setIsAllPagesLoaded(false);
  }, [title]);

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

  const content = isAllPagesLoaded ? <div>All results shown</div> : <Spinner />;

  if (response === "False") return;

  return (
    <>
      {/* <SearchContent films={films} /> */}
      <div className="flex items-center justify-center" ref={ref}>
        {content}
      </div>
    </>
  );
};

export default LoadMore;
