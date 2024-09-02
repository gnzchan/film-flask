import { getTMDBFilms } from "@/actions/getSBFilms";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/actions/getTMDBFilms";
import ThumbGallery from "@/app/(site)/ThumbGallery";
import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";
import Header from "@/components/custom-ui/Header";

const Home = async () => {
  const popularInSBPromise = getTMDBFilms();
  const popularMoviePromise = getPopularMovies();
  const upcomingMoviePromise = getUpcomingMovies();
  const nowPlayingMoviePromise = getNowPlayingMovies();
  const topRatedMoviePromise = getTopRatedMovies();

  const [sbPopular, tmdbPopular, tmdbUpcoming, tmdbNowPlaying, tmdbTopRated] =
    await Promise.all([
      popularInSBPromise,
      popularMoviePromise,
      upcomingMoviePromise,
      nowPlayingMoviePromise,
      topRatedMoviePromise,
    ]);

  return (
    <div className="relative flex h-[100dvh] flex-col bg-white dark:bg-black">
      <Header className="absolute left-0 right-0 top-0 z-[2] bg-transparent shadow-none transition-all duration-700 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-zinc-800" />
      <CenterContentWrapper>
        <ThumbGallery
          films={sbPopular}
          popularMovies={tmdbPopular}
          upcomingMovies={tmdbUpcoming}
          nowPlayingMovies={tmdbNowPlaying}
          topRatedMovies={tmdbTopRated}
        />
      </CenterContentWrapper>
    </div>
  );
};

export default Home;
