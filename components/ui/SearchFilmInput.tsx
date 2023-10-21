"use client";

import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FilmCategory } from "@/types";

const SearchInput = () => {
  const router = useRouter();
  const [searchString, setSearchString] = useState("");
  const [searchCategory, setSearchCategory] = useState(FilmCategory.MOVIE);
  const debouncedValue = useDebounce(searchString.trim(), 800);

  useEffect(() => {
    if (debouncedValue !== "") {
      const query = {
        title: debouncedValue,
        category: searchCategory,
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query,
      });

      router.push(url);
    } else {
      router.push("/search");
    }
  }, [debouncedValue, searchCategory]);

  return (
    <div className="flex items-center justify-center">
      <input
        placeholder="Search for movies or series"
        value={searchString}
        className="focus:shadow-outline w-full max-w-[1700px] appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:outline-none"
        onChange={(e) => setSearchString(e.target.value)}
      />

      <input
        type="radio"
        id={FilmCategory.MOVIE}
        name="film_category"
        value={FilmCategory.MOVIE}
        checked={searchCategory === FilmCategory.MOVIE}
        onChange={(e) =>
          setSearchCategory(e.currentTarget.value as FilmCategory)
        }
      />
      <label htmlFor={FilmCategory.MOVIE}>Movie</label>
      <input
        type="radio"
        id={FilmCategory.TV}
        name="film_category"
        value={FilmCategory.TV}
        checked={searchCategory === FilmCategory.TV}
        onChange={(e) =>
          setSearchCategory(e.currentTarget.value as FilmCategory)
        }
      />
      <label htmlFor={FilmCategory.TV}>TV</label>
    </div>
  );
};

export default SearchInput;
