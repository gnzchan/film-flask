import ThumbGallery from "@/app/(site)/ThumbGallery";
import Header from "@/components/custom-ui/Header";
import { getTMDBFilms } from "@/actions/getSBFilms";
import { getPopularMovies, getUpcomingMovies } from "@/actions/getTMDBFilms";

const Home = async () => {
  const popularInSBPromise = getTMDBFilms();
  const popularMoviePromise = getPopularMovies();
  const upcomingMoviePromise = getUpcomingMovies();

  const data = await Promise.all([
    popularInSBPromise,
    popularMoviePromise,
    upcomingMoviePromise,
  ]);

  return (
    <div className="relative flex h-full flex-col ">
      <Header className="absolute left-0 right-0 top-0 z-[2] bg-transparent shadow-none transition-all duration-700 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-zinc-800" />
      <div className="flex h-full items-center justify-center">
        <div className="h-full w-full max-w-[1700px]">
          <ThumbGallery
            films={data[0]}
            popularMovies={data[1]}
            upcomingMovies={data[2]}
          />
          {/* <Suspense fallback={<ThumbGallerySkeleton />}>
            <Await promise={promise}>
              {(data) => (
                <ThumbGallery
                  films={data[0]}
                  popularMovies={data[1]}
                  upcomingMovies={data[2]}
                />
              )}
            </Await>
          </Suspense> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
