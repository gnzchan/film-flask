import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getListedFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import ScrollableFilmContent from "@/components/ui/ScrollableFilmContent";
import SeeMoreContent from "@/components/ui/SeeMoreContent";
import { Status } from "@/types";

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

  const watchLaterFilms = await getListedFilms(Status.TO_WATCH_LATER);
  const currentWatchFilms = await getListedFilms(Status.CURRENTLY_WATCHING);
  const finishedWatchFilms = await getListedFilms(Status.FINISHED_WATCHING);

  const content = () => {
    switch (searchParams.status?.toLowerCase()) {
      case Status.TO_WATCH_LATER.toLowerCase():
        return <SeeMoreContent films={watchLaterFilms} />;

      case Status.CURRENTLY_WATCHING.toLowerCase():
        return <SeeMoreContent films={currentWatchFilms} />;

      case Status.FINISHED_WATCHING.toLowerCase():
        return <SeeMoreContent films={finishedWatchFilms} />;

      default:
        return (
          <>
            <ScrollableFilmContent
              title={Status.TO_WATCH_LATER}
              films={watchLaterFilms}
            />
            <ScrollableFilmContent
              title={Status.CURRENTLY_WATCHING}
              films={currentWatchFilms}
            />
            <ScrollableFilmContent
              title={Status.FINISHED_WATCHING}
              films={finishedWatchFilms}
            />
          </>
        );
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div>{content()}</div>
    </div>
  );
};

export default Watchlist;
