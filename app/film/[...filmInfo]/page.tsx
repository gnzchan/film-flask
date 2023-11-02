import { Metadata, ResolvingMetadata } from "next";
import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/customUI/FilmInfo";
import FilmTitleBar from "@/components/customUI/FilmTitleBar";
import Header from "@/components/customUI/Header";
import { FilmCategory } from "@/types";
import { description } from "@/constants";

interface FilmProps {
  params: {
    category: string;
    filmInfo: [FilmCategory, string];
  };
}

export async function generateMetadata({
  params,
}: FilmProps): Promise<Metadata> {
  const film = await getFilmById(params.filmInfo[0], params.filmInfo[1]);
  const genreTitle = film.genres.map((g) => g.name).join(", ");

  const title = `${film.title ?? film.name} | ${genreTitle} - Film Flask`;

  return {
    title,
    appleWebApp: true,
    openGraph: {
      title,
      description: `${film.title ?? film.name}: ${description}`,
      url: `https://film-flask.vercel.app/film/${film.category}/${film.id}`,
      siteName: "Film Flask",
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`,
          height: 630,
          width: 1200,
        },
      ],
      locale: "en_US",
      type: "website",
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
