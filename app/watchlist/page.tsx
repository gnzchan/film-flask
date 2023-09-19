import { getListedFilms } from "@/actions/getSBFilms";
import FilmGrid from "@/components/ui/FilmGrid";
import Header from "@/components/ui/Header";

const Watchlist = async () => {
  const films = await getListedFilms();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <FilmGrid films={films} />
    </div>
  );
};

export default Watchlist;
