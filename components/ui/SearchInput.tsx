"use client";

import { useEffect, useState } from "react";
import qs from "query-string";

import Input from "./Input";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => {
    if (debouncedValue !== "") {
      const query = {
        title: debouncedValue,
      };

      console.log(debouncedValue);

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
    <Input
      placeholder="Search for movies or series"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
