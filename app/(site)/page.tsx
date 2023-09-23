import { Suspense } from "react";

import { getOmdbFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ThumbGallery from "@/app/(site)/ThumbGallery";
import ThumbGallerySkeleton from "./ThumbGallerySkeleton";
import Await from "@/components/ui/Await";

export default async function Home() {
  const promise = getOmdbFilms();

  return (
    <div className="flex h-full flex-col">
      <Header>
        <h1 className="m-3 pl-3 text-2xl font-light text-neutral-800 dark:text-white">
          Popular on Film Flask
        </h1>
      </Header>
      <Suspense fallback={<ThumbGallerySkeleton />}>
        <Await promise={promise}>
          {(data) => <ThumbGallery films={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
