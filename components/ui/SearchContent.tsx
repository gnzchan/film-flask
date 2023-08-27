"use client";

import FilmItem from "./FilmItem";

import { SearchFilm } from "@/types";

interface SearchContentProps {
  films: SearchFilm[];
  error?: string;
}

const SearchContent: React.FC<SearchContentProps> = ({ films, error }) => {
  if (error) {
    return (
      <div>
        Were finding it difficult to find what you're searching. {error}
      </div>
    );
  }

  if (films.length === 0) {
    return <div>No films found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {films.map((film) => (
        <FilmItem key={film.imdbID} film={film} />
      ))}
    </div>
  );
};

export default SearchContent;
