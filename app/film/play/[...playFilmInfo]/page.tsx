import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";

import Header from "@/components/customUI/Header";
import { FilmCategory } from "@/types";
import getFilmById from "@/actions/getFilmById";
import { description } from "@/constants";

interface PlayFilmProps {
  params: {
    category: string;
    playFilmInfo: [FilmCategory, string, string, string];
  };
}

export async function generateMetadata({
  params,
}: PlayFilmProps): Promise<Metadata> {
  const film = await getFilmById(
    params.playFilmInfo[0],
    params.playFilmInfo[1],
  );
  const genreTitle = film.genres.map((g) => g.name).join(", ");

  const title = `Stream  ${
    film.title ?? film.name
  } | ${genreTitle} - Film Flask`;

  return {
    title,
    appleWebApp: true,
    openGraph: {
      title,
      description: `Stream ${film.title ?? film.name} Online: ${description}`,
      url: `https://film-flask.vercel.app/film/play/${film.category}/${film.id}`,
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

const PlayFilm: React.FC<PlayFilmProps> = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const movieUrl = `https://vidsrc.me/embed/movie?tmdb=${params.playFilmInfo[1]}&color=18181b`;
  const tvUrl = `https://vidsrc.me/embed/tv?tmdb=${params.playFilmInfo[1]}&season=${params.playFilmInfo[2]}&episode=${params.playFilmInfo[3]}&color=18181b`;

  const isMovie = params.playFilmInfo[0] === FilmCategory.MOVIE;

  return (
    <div className="h-full">
      <div className="relative">
        <Header className="absolute left-0 right-0 top-0 z-[2] bg-transparent shadow-none transition-all duration-700 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-zinc-800" />
      </div>
      <iframe
        src={isMovie ? movieUrl : tvUrl}
        className="aspect-video h-full w-full"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlayFilm;
