import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getListedFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import { Status } from "@/types";
import Await from "@/components/ui/Await";
import WatchListGallery from "./WatchListGallery";
import WatchListGallerySkeleton from "./WatchListGallerySkeleton";

interface WatchlistProps {
  searchParams: {
    status?: string;
  };
}

const Watchlist: React.FC<WatchlistProps> = async ({ searchParams }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const watchLaterFilmsPromise = getListedFilms(Status.TO_WATCH_LATER);
  const currentWatchFilmsPromise = getListedFilms(Status.CURRENTLY_WATCHING);
  const finishedWatchFilmsPromise = getListedFilms(Status.FINISHED_WATCHING);

  const promise = Promise.all([
    watchLaterFilmsPromise,
    currentWatchFilmsPromise,
    finishedWatchFilmsPromise,
  ]);

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1700px]">
          <Suspense fallback={<WatchListGallerySkeleton />}>
            <Await promise={promise}>
              {(data) => (
                <WatchListGallery
                  status={searchParams.status?.toLowerCase()}
                  watchLaterFilms={data[0]}
                  currentWatchFilms={data[1]}
                  finishedWatchFilms={data[2]}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
