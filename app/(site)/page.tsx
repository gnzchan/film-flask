import { getFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ThumbGallery from "@/components/ui/ThumbGallery";
import { Suspense } from "react";

export default async function Home() {
  const films = await getFilms();

  return (
    <div className="flex h-full flex-col">
      <Header>
        <h1 className="m-3 pl-3 text-2xl font-light text-neutral-800 dark:text-white">
          Popular on Film Flask
        </h1>
      </Header>
      <Suspense fallback="loading from suspense...">
        <ThumbGallery films={films} />
      </Suspense>
    </div>
  );
}
