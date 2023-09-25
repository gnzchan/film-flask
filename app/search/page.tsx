import getFilmsByTitle from "@/actions/getFilmsByTitle";
import Header from "@/components/ui/Header";
import SearchFilmInput from "@/components/ui/SearchFilmInput";
import { getTotalPages } from "@/libs/helpers";
import SearchFilmContent from "./SearchFilmContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const {
    Search: films,
    Error: error,
    totalResults,
  } = await getFilmsByTitle(searchParams.title);

  return (
    <div>
      <Header>
        <div className="sticky -top-1 z-10 flex flex-col gap-y-5 rounded-b-lg bg-neutral-100/30 px-5 py-3 backdrop-blur-lg dark:bg-zinc-900/30">
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchFilmInput />
        </div>

        <SearchFilmContent
          propFilms={films}
          searchString={searchParams.title ?? ""}
          totalPages={getTotalPages(totalResults)}
          error={error}
        />
      </Header>
    </div>
  );
};

export default Search;
