"use client";

import useLikedFilms from "@/hooks/useLikedFilms";

const Test = () => {
  const { films } = useLikedFilms();

  return (
    <div>
      {films.map((film) => (
        <div>{film.title}</div>
      ))}
    </div>
  );
};

export default Test;
