import getFilmsByTitle from "@/actions/getFilmsByTitle";
import Header from "@/components/ui/Header";
import LoadMore from "@/components/ui/LoadMore";
import SearchContent from "@/components/ui/SearchContent";
import SearchInput from "@/components/ui/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const {
    Response,
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
        <SearchContent films={films} error={error} />

        {searchParams.title && (
          <LoadMore
            title={searchParams.title}
            totalResults={totalResults}
            response={Response}
          />
        )}
      </Header>
    </div>
  );
};

export default Search;
