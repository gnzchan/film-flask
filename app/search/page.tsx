import getFilmsByTitle from "@/actions/getFilmsByTitle";
import Header from "@/components/ui/Header";
import SearchContent from "@/components/ui/SearchFilmContent";
import SearchInput from "@/components/ui/SearchFilmInput";
import { getTotalPages } from "@/libs/helpers";

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
    <div className="">
      <Header>
        <div className="sticky top-0 z-30 flex flex-col gap-y-5 bg-yellow-400/30 px-2 py-3 backdrop-blur-md">
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>

        <SearchContent
          films={films}
          title={searchParams.title}
          totalPages={getTotalPages(totalResults)}
          error={error}
        />
      </Header>
    </div>
  );
};

export default Search;
