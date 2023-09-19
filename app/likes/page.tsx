import { getLikedFilms } from "@/actions/getSBFilms";
import FilmGrid from "@/components/ui/FilmGrid";
import Header from "@/components/ui/Header";

const Likes = async () => {
  const films = await getLikedFilms();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <FilmGrid films={films} />
    </div>
  );
};

export default Likes;
