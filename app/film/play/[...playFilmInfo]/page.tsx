import Header from "@/components/ui/Header";
import { FilmCategory } from "@/types";

interface PlayFilmProps {
  params: {
    category: string;
    playFilmInfo: [FilmCategory, string];
  };
}

const PlayFilm: React.FC<PlayFilmProps> = async ({ params }) => {
  const videoUrl = `https://vidsrc.me/embed/${params.playFilmInfo[0]}?tmdb=${params.playFilmInfo[1]}&color=18181b`;

  return (
    <div className="h-full">
      <div className="relative">
        <Header className="absolute left-0 right-0 top-0 z-[2] bg-transparent shadow-none transition-all duration-700 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-zinc-800" />
      </div>
      <iframe
        src={videoUrl}
        className="aspect-video h-full w-full"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlayFilm;
