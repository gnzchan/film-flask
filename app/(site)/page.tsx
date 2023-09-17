import getSBFilms from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ScrollableFilmContent from "@/components/ui/ScrollableFilmContent";

export default async function Home() {
  const films = await getSBFilms();

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-5 px-3">
        <ScrollableFilmContent title="Trending now" films={films} />

        {/* TODO: Change content */}
        <ScrollableFilmContent title="What you have added" films={films} />
      </div>
    </div>
  );
}
