import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/ui/FilmInfo";
import FilmTitleBar from "@/components/ui/FilmTitleBar";
import Header from "@/components/ui/Header";
import { FilmCategory } from "@/types";

interface FilmProps {
  params: {
    category: string;
    filmInfo: [FilmCategory, string];
  };
}

const Film: React.FC<FilmProps> = async ({ params }) => {
  const film = await getFilmById(params.filmInfo[0], params.filmInfo[1]);

  return (
    <div className="h-full">
      <Header>
        <FilmTitleBar film={film} />
      </Header>
      <FilmInfo film={film} />
    </div>
  );
};

export default Film;
