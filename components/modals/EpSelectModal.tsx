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
      <div className="flex flex-col gap-4">
        {epSelectModal.episodes.map((episode, i) => (
          <div key={episode.id} className="flex flex-col justify-center gap-2">
            <div className="flex w-full gap-2">
              <div
                onClick={() => handleClickPlay(episode.episode_number)}
                className="group relative aspect-video min-w-[140px] cursor-pointer shadow-zinc-900 drop-shadow-lg sm:min-w-[185px]"
              >
                <Image
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w300/${episode.still_path}`
                      : "/images/movie-poster.jpg"
                  }
                  alt={`${episode.name} Poster`}
                  priority={true}
                  fill
                  sizes="(max-width: 342px) 100vw"
                  className="rounded-md group-hover:blur-sm"
                />
                <div className="absolute left-[50%] top-[50%] z-[100] -ml-3 -mt-3 opacity-0 transition group-hover:opacity-100">
                  <BsPlayCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col justify-center text-sm">
                <p>{`${i + 1}. ${episode.name}`}</p>
                <p>{`${episode.runtime}m`}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              {episode.overview}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EpSelectModal;
