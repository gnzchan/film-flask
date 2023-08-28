import getFilmsByTitle from "@/actions/getFilmsByTitle";
import Header from "@/components/ui/Header";

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
    <div className="">
      <Header>
        <div className="mb-2 flex flex-col gap-y-5">
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent films={films} error={error} />
    </div>
  );
};

export default Search;
