import { getFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ThumbGallery from "@/components/ui/ThumbGallery";

export default async function Home() {
  const films = await getFilms();

  return (
    <div className="flex h-[100vh] flex-col">
      <Header />
      <ThumbGallery films={films} />
    </div>
  );
}
