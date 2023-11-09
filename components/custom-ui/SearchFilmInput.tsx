"use client";

import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FilmCategory } from "@/types";
import CategoryButton from "./CategoryButton";

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

  const handleCategoryChange = (cat: FilmCategory) => {
    setSearchCategory(cat);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">Search</h1>
      </div>
      <input
        placeholder="Search for movies or series"
        value={searchString}
        className="focus:shadow-outline w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:outline-none"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="grid grid-cols-2 items-center gap-1">
        <CategoryButton
          id={FilmCategory.MOVIE}
          checked={searchCategory === FilmCategory.MOVIE}
          handleCategoryChange={handleCategoryChange}
        />
        <CategoryButton
          id={FilmCategory.TV}
          checked={searchCategory === FilmCategory.TV}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
