import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/ui/FilmInfo";
import FilmTitleBar from "@/components/ui/FilmTitleBar";
import Header from "@/components/ui/Header";

interface FilmProps {
  params: {
    filmId: string;
  };
}

const Film: React.FC<FilmProps> = async ({ params }) => {
  const film = await getFilmById(params.filmId, true);

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Header>
        <FilmTitleBar film={film} />
      </Header>
      <FilmInfo film={film} />
    </div>
  );
};

export default Film;
