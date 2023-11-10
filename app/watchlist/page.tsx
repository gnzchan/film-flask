import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { getListedFilms } from "@/actions/getSBFilms";
import Header from "@/components/custom-ui/Header";
import { Status } from "@/types";
import Await from "@/components/custom-ui/Await";
import WatchListGallery from "./WatchListGallery";
import WatchListGallerySkeleton from "./WatchListGallerySkeleton";
import { defaultOgImg, description } from "@/constants";
import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";

interface WatchlistProps {
  searchParams: {
    status?: string;
  };
}

export const metadata: Metadata = {
  title: "Film Flask - Watchlist",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Watchlist",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [defaultOgImg],
    locale: "en_US",
    type: "website",
  },
};

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
    <div className="">
      <Header />
      <CenterContentWrapper>
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
      </CenterContentWrapper>
    </div>
  );
};

export default Watchlist;
