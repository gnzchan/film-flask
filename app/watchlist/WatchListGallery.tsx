import ScrollableFilmContent from "@/components/custom-ui/ScrollableFilmContent";
import SeeMoreContent from "@/components/custom-ui/SeeMoreContent";
import { Status, TMDBFilm } from "@/types";

interface WatchListGalleryProps {
  status?: string;
  watchLaterFilms: TMDBFilm[];
  currentWatchFilms: TMDBFilm[];
  finishedWatchFilms: TMDBFilm[];
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
        <div>
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
        </div>
      );
  }
};

export default WatchListGallery;
