"use client";

import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FilmTMDBCategory } from "@/types";

const SearchInput = () => {
  const router = useRouter();
  const [searchString, setSearchString] = useState("");
  const [searchCategory, setSearchCategory] = useState(FilmTMDBCategory.MOVIE);
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
        id={FilmTMDBCategory.MOVIE}
        name="film_category"
        value={FilmTMDBCategory.MOVIE}
        checked={searchCategory === FilmTMDBCategory.MOVIE}
        onChange={(e) =>
          setSearchCategory(e.currentTarget.value as FilmTMDBCategory)
        }
      />
      <label htmlFor={FilmTMDBCategory.MOVIE}>Movie</label>
      <input
        type="radio"
        id={FilmTMDBCategory.TV}
        name="film_category"
        value={FilmTMDBCategory.TV}
        checked={searchCategory === FilmTMDBCategory.TV}
        onChange={(e) =>
          setSearchCategory(e.currentTarget.value as FilmTMDBCategory)
        }
      />
      <label htmlFor={FilmTMDBCategory.TV}>TV</label>
    </div>
  );
};

export default SearchInput;
