"use client";

import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value.trim(), 800);

  useEffect(() => {
    if (debouncedValue !== "") {
      const query = {
        title: debouncedValue,
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query,
      });

      router.push(url);
    } else {
      router.push("/search");
    }
  }, [debouncedValue]);

  return (
    <input
      placeholder="Search for movies or series"
      value={value}
      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:outline-none"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
