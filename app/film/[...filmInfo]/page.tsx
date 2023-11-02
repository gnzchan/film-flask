import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params }: FilmProps,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  const film = await getFilmById(params.filmInfo[0], params.filmInfo[1]);

  return {
    title: `${film.title ?? film.name} - Film Flask`,
    openGraph: {
      title: `${film.title ?? film.name} - Film Flask`,
      description:
        "${film.title ?? film.name}: Watch film, read overview, change status, and leave a review.",
      url: `https://film-flask.vercel.app/film/${film.category}/${film.id}`,
      siteName: "Film Flask",
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`,
        },
      ],
    },
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
