import { Metadata } from "next";

import getFilmCreditsById from "@/actions/getFilmCreditsById";
import getFilmById from "@/actions/getFilmById";
import FilmInfo from "@/components/custom-ui/FilmInfo";
import FilmTitleBar from "@/components/custom-ui/FilmTitleBar";
import Header from "@/components/custom-ui/Header";
import { FilmCategory } from "@/types";
import { description } from "@/constants";

interface FilmProps {
  params: {
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
  const filmPromise = getFilmById(params.filmInfo[0], params.filmInfo[1]);
  const creditsPromise = getFilmCreditsById(
    params.filmInfo[0],
    params.filmInfo[1],
  );

  const [film, credits] = await Promise.all([filmPromise, creditsPromise]);

  return (
    <div className="relative flex h-full flex-col">
      <Header>
        <FilmTitleBar film={film} />
      </Header>
      <FilmInfo film={film} credits={credits} />
    </div>
  );
};

export default Film;
