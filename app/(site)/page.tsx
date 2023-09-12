import getSBFilms from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ScrollableFilmContent from "@/components/ui/ScrollableFilmContent";

export default async function Home() {
  const films = await getSBFilms();

  return (
    <div>
      <Header />
      <div className="flex flex-col px-3">
        <ScrollableFilmContent title={"What others have added"} films={films} />
      </div>
    </div>
  );
}
