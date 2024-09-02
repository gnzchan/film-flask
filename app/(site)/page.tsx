import { getTMDBFilms } from "@/actions/getSBFilms";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularSeries,
  getTrendingMovies,
  getTrendingSeries,
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
  const trendingMoviePromise = getTrendingMovies();

  const trendingSeriesPromise = getTrendingSeries();
  const popularSeriesPromise = getPopularSeries();

  const [
    sbPopular,
    tmdbPopular,
    tmdbUpcoming,
    tmdbNowPlaying,
    tmdbTrendingMovies,
    tmdbTrendingSeries,
    tmdbPopularSeries,
  ] = await Promise.all([
    popularInSBPromise,
    popularMoviePromise,
    upcomingMoviePromise,
    nowPlayingMoviePromise,
    trendingMoviePromise,
    trendingSeriesPromise,
    popularSeriesPromise,
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
          trendingMovies={tmdbTrendingMovies}
          trendingSeries={tmdbTrendingSeries}
          popularSeries={tmdbPopularSeries}
        />
      </CenterContentWrapper>
    </div>
  );
};

export default Home;
