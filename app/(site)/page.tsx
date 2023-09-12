import getSBFilms from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import FilmItem from "@/components/ui/FilmItem";

export default async function Home() {
  const films = await getSBFilms();

  return (
    <div>
      <Header />
      <div className="flex h-full w-full flex-col bg-red-50">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-neutral-700">
            What others have added
          </h1>
          <div className="flex gap-3">
            {films.map((film) => (
              <FilmItem key={film.id} film={film} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
