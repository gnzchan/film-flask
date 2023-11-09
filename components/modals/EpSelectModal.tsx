import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";

import Modal from "./Modal";
import useEpSelectModal from "@/hooks/useEpSelectModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const EpSelectModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const epSelectModal = useEpSelectModal();
  const authModal = useAuthModal();

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      epSelectModal.onClose();
    }
  };

  const handleClickPlay = (episodeNumber: number) => {
    epSelectModal.onClose();

    if (!user) {
      return authModal.onOpen("You need to sign in to access this content");
    }

    return router.replace(
      `/film/play/tv/${epSelectModal.filmId}/${epSelectModal.season}/${episodeNumber}`,
    );
  };

  return (
    <Modal
      title="Select Episode"
      description={epSelectModal.title}
      isOpen={epSelectModal.isOpen}
      onChange={onChangeHandler}
    >
      <div className="flex flex-col">
        {epSelectModal.episodes.map((episode, i) => (
          <div
            key={episode.id}
            onClick={() => handleClickPlay(episode.episode_number)}
            className="group flex scale-95 cursor-pointer flex-col justify-center gap-2 py-2 transition hover:scale-100"
          >
            <div className="flex w-full gap-2">
              <div className="relative aspect-video min-w-[140px] shadow-zinc-900 drop-shadow-lg sm:min-w-[185px]">
                <Image
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w300/${episode.still_path}`
                      : "/images/movie-poster.jpg"
                  }
                  alt={`${episode.name} Poster`}
                  priority={true}
                  fill
                  className="rounded-md group-hover:blur-sm"
                />
                <div className="absolute left-[50%] top-[50%] z-[100] -ml-3 -mt-3 opacity-0 group-hover:opacity-100">
                  <BsPlayCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col justify-center text-sm font-bold">
                <p>{`${i + 1}. ${episode.name}`}</p>
                <p>{`${episode.runtime}m`}</p>
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {episode.overview}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EpSelectModal;
