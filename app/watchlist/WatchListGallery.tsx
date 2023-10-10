import ScrollableFilmContent from "@/components/ui/ScrollableFilmContent";
import SeeMoreContent from "@/components/ui/SeeMoreContent";
import { Film, Status } from "@/types";

interface WatchListGalleryProps {
  status?: string;
  watchLaterFilms: Film[];
  currentWatchFilms: Film[];
  finishedWatchFilms: Film[];
}

const WatchListGallery: React.FC<WatchListGalleryProps> = ({
  status,
  watchLaterFilms,
  currentWatchFilms,
  finishedWatchFilms,
}) => {
  switch (status) {
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

export default WatchListGallery;
