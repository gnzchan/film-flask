import SearchInput from "@/components/ui/SearchInput";

const Search = () => {
  return (
    <div className="">
      <h1 className="text-3xl font-semibold ">Search</h1>
      <SearchInput />
      {/* <Header className="from-bg-neutral-900">
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className="text-3xl font-semibold text-white">Search</h1>
        <SearchInput />
      </div>
    </Header>
    <SearchContent songs={songs} /> */}
    </div>
  );
};

export default Search;
