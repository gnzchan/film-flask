import toast from "react-hot-toast";

import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";
import Button from "./Button";

import { Status } from "@/types";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilm from "@/hooks/useFilm";
import useFilmReview from "@/hooks/useFilmReview";
import useFilmStatus from "@/hooks/useFilmStatus";
import useFilmReviews from "@/hooks/useFilmReviews";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();
  const cachedFilm = filmEditorModal.omdbFilm;

  const { listed, addFilmToListHandler } = useFilm(cachedFilm?.imdbID ?? "");
  const { review, addReviewHandler, reviewChangeHandler } = useFilmReview(
    cachedFilm?.imdbID ?? "",
  );
  const { status, addStatusHandler, statusChangeHandler } = useFilmStatus(
    cachedFilm?.imdbID ?? "",
  );
  const { fetchFilmReviews } = useFilmReviews(cachedFilm?.imdbID ?? "");

  if (!cachedFilm) return;

  const onToggleModal = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };

  const updateFilm = () => {
    if ((review || status) && !listed) {
      if (cachedFilm) addFilmToListHandler(cachedFilm);
    }

    if (review) {
      addReviewHandler(cachedFilm.imdbID);
    }

    if (status) {
      addStatusHandler(cachedFilm.imdbID);
    }

    filmEditorModal.onClose();
    toast.success("Film updated");
    fetchFilmReviews();
  };

  return (
    <Modal
      title="Change record"
      description={`You are currently editing ${cachedFilm.Title}`}
      isOpen={filmEditorModal.isOpen}
      onChange={onToggleModal}
    >
      <div className="flex flex-col">
        <form
          action={updateFilm}
          className="flex flex-col items-center justify-center gap-10"
        >
          <textarea
            name="review"
            rows={2}
            className="focus:shadow-outline block w-full resize-none appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-tight text-gray-900 shadow-sm focus:outline-none"
            placeholder="Leave a review"
            value={review}
            onChange={reviewChangeHandler}
          />

          <div className="flex w-full flex-col items-center justify-center gap-7 px-7 sm:flex-row">
            <FilmStatusButton
              id="add"
              src="https://cdn.lordicon.com/ynwbvguu.json"
              status={Status.TO_WATCH_LATER}
              checked={status === Status.TO_WATCH_LATER}
              onChange={statusChangeHandler}
            />
            <FilmStatusButton
              id="current"
              src="https://cdn.lordicon.com/ycwlopoz.json"
              status={Status.CURRENTLY_WATCHING}
              checked={status === Status.CURRENTLY_WATCHING}
              onChange={statusChangeHandler}
            />
            <FilmStatusButton
              id="complete"
              src="https://cdn.lordicon.com/tyvtvbcy.json"
              status={Status.FINISHED_WATCHING}
              checked={status === Status.FINISHED_WATCHING}
              onChange={statusChangeHandler}
            />
          </div>

          <Button className="max-w-sm" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default FilmEditorModal;
