import ThumbGallery from "@/app/(site)/ThumbGallery";
import Header from "@/components/custom-ui/Header";
import { getTMDBFilms } from "@/actions/getSBFilms";
import { getPopularMovies, getUpcomingMovies } from "@/actions/getTMDBFilms";
import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";
import HomeLoader from "@/components/custom-ui/HomeLoader";

const Home = async () => {
  return (
    <div className="relative flex h-full flex-col bg-white dark:bg-black">
      <Header className="absolute left-0 right-0 top-0 z-[2] bg-transparent shadow-none transition-all duration-700 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-zinc-800" />
      <CenterContentWrapper>
        <HomeLoader />
      </CenterContentWrapper>
    </div>
  );
};

export default Home;
