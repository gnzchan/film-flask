import { getFilmsByTitle, getFilmsTMDB } from "@/actions/getFilmsByTitle";
import Header from "@/components/ui/Header";
import SearchFilmInput from "@/components/ui/SearchFilmInput";
import { getTotalPages } from "@/libs/helpers";
import SearchFilmContent from "./SearchFilmContent";
import SearchFilmContentTmdb from "./SearchFilmContentTmdb";
import { FilmTMDBCategory } from "@/types";

interface SearchProps {
  searchParams: {
    title: string;
    category: FilmTMDBCategory;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  // const {
  //   Search: films = [],
  //   Error: error,
  //   totalResults = 0,
  // } = await getFilmsByTitle(searchParams.title);

  const response = await getFilmsTMDB(
    searchParams.category,
    searchParams.title,
    1,
  );
  return (
    <div>
      <Header>
        <div className="sticky -top-1 z-10 flex flex-col gap-y-5 rounded-b-lg bg-neutral-100/30 px-5 py-3 backdrop-blur-lg dark:bg-zinc-900/30">
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchFilmInput />
        </div>

        <SearchFilmContentTmdb
          propFilms={response.results}
          searchString={searchParams.title ?? ""}
          category={searchParams.category}
          totalPages={response.total_pages}
        />
        {/* <SearchFilmContent
          propFilms={films ?? []}
          searchString={searchParams.title ?? ""}
          totalPages={getTotalPages(totalResults)}
          error={error}
        /> */}
      </Header>
    </div>
  );
};

export default Search;
