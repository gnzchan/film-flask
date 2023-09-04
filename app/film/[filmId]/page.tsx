import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/ui/FilmInfo";
import Header from "@/components/ui/Header";

interface FilmProps {
  params: {
    filmId: string;
  };
}

const Film: React.FC<FilmProps> = async ({ params }) => {
  const film = await getFilmById(params.filmId);

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex h-full w-full flex-col">
        <div>{film.Title}</div>
        <FilmInfo film={film} />
      </div>
    </div>
  );
};

export default Film;
