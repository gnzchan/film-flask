import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/ui/FilmInfo";
import Header from "@/components/ui/Header";
import TitleBar from "@/components/ui/TitleBar";

interface FilmProps {
  params: {
    filmId: string;
  };
}

const Film: React.FC<FilmProps> = async ({ params }) => {
  const film = await getFilmById(params.filmId);

  return (
    <div className="flex h-full flex-col">
      <Header>
        <TitleBar film={film} />
      </Header>
      <FilmInfo film={film} />
    </div>
  );
};

export default Film;
