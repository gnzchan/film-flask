import { Metadata } from "next";

import { getFilmsByTitle } from "@/actions/getFilmsByTitle";
import Header from "@/components/custom-ui/Header";
import SearchFilmInput from "@/components/custom-ui/SearchFilmInput";
import SearchFilmContentTmdb from "./SearchFilmContentTmdb";
import { FilmCategory } from "@/types";
import { defaultOgImg, description } from "@/constants";
import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";

interface SearchProps {
  searchParams: {
    title: string;
    category: FilmCategory;
  };
}

export const metadata: Metadata = {
  title: "Film Flask - Search",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Search",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [defaultOgImg],
    locale: "en_US",
    type: "website",
  },
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const response = await getFilmsByTitle(
    searchParams.category,
    searchParams.title,
    1,
  );
  return (
    <Header>
      <div className="bg-neutral-100 transition duration-500 ease-in-out dark:bg-zinc-900">
        <div className="sticky -top-1 z-10 flex flex-col gap-y-5 rounded-b-lg bg-neutral-100/30 px-5 py-3 backdrop-blur-lg dark:bg-zinc-900/30">
          <CenterContentWrapper>
            <SearchFilmInput />
          </CenterContentWrapper>
        </div>
        <CenterContentWrapper>
          <SearchFilmContentTmdb
            propFilms={response.results}
            searchString={searchParams.title ?? ""}
            category={searchParams.category}
            totalPages={response.total_pages}
          />
        </CenterContentWrapper>
      </div>
    </Header>
  );
};

export default Search;
