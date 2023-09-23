import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";
import Button from "./Button";

import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilmDB from "@/hooks/useFilmDB";
import { Status } from "@/types";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();

  const {
    status,
    review,
    updateFilm,
    statusChangeHandler,
    reviewChangeHandler,
  } = useFilmDB();

  const onToggleModal = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };

  return (
    <Modal
      title="Change record"
      description={`You are currently editing ${
        filmEditorModal.film?.Title ?? ""
      }`}
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
