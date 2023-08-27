import getFilmsByTitle from "@/actions/getFilmsByTitle";

import SearchContent from "@/components/ui/SearchContent";
import SearchInput from "@/components/ui/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const { Search: films, Error: error } = await getFilmsByTitle(
    searchParams.title,
  );

  return (
    <div className="h-screen w-full overflow-hidden overflow-y-auto">
      <h1 className="text-3xl font-semibold ">Search</h1>
      <SearchInput />
      <SearchContent films={films} error={error} />
    </div>
  );
};

export default Search;
