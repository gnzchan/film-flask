import toast from "react-hot-toast";
import { BiImageAdd } from "react-icons/bi";

import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";
import Button from "./Button";
import UploadImage from "./UploadImage";

import { Status } from "@/types";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import useFilm from "@/hooks/useFilm";
import useFilmReview from "@/hooks/useFilmReview";
import useFilmStatus from "@/hooks/useFilmStatus";
import useFilmImages from "@/hooks/useFilmImages";
import useFilmReviewsAndImages from "@/hooks/useFilmReviewsAndImages";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();
  const cachedFilm = filmEditorModal.omdbFilm;

  const { fetchListed, addFilmToListHandler } = useFilm(
    cachedFilm?.imdbID ?? "",
  );

  const {
    images,
    imagesForUpload,
    imagesForRemove,
    addImageForUploadHandler,
    removeImageForUploadHandler,
    uploadImagesHandler,
    removeImagesHandler,
  } = useFilmImages(cachedFilm?.imdbID ?? "");
  const { review, addReviewHandler, reviewChangeHandler } = useFilmReview(
    cachedFilm?.imdbID ?? "",
  );
  const {
    status,
    dateFinished,
    addStatusHandler,
    statusChangeHandler,
    dateFinishedHandler,
  } = useFilmStatus(cachedFilm?.imdbID ?? "");
  const { fetchReviews } = useFilmReviewsAndImages(cachedFilm?.imdbID ?? "");

  if (!cachedFilm) return;

  const onToggleModal = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };

  const updateFilm = async () => {
    if ((review || status || imagesForUpload) && !filmEditorModal.listed) {
      await addFilmToListHandler(cachedFilm);
      await fetchListed();
    }

    if (imagesForUpload.length !== 0) {
      await uploadImagesHandler();
    }

    if (imagesForRemove.length !== 0) {
      await removeImagesHandler();
    }

    if (review) {
      await addReviewHandler(cachedFilm.imdbID);
    }

    if (status) {
      await addStatusHandler(cachedFilm.imdbID);
    }

    filmEditorModal.onClose();
    toast.success("Film updated");
    await fetchReviews();
  };

  return (
    <Modal
      title="Change record"
      description={`You are currently editing: ${cachedFilm.Title}`}
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

          <div className="flex flex-col items-center justify-center gap-2">
            <label
              htmlFor="imageFiles"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 text-neutral-600 transition hover:text-neutral-400"
            >
              <BiImageAdd />
              Attach image
            </label>
            <input
              id="imageFiles"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={addImageForUploadHandler}
            />
            <div className="flex gap-1">
              {images.map((image) => (
                <UploadImage
                  key={image.name}
                  image={image}
                  uploaded={true}
                  removeImageHandler={removeImageForUploadHandler}
                />
              ))}
              {imagesForUpload.map((image) => (
                <UploadImage
                  key={image.name}
                  image={image}
                  uploaded={false}
                  removeImageHandler={removeImageForUploadHandler}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-10 px-7 sm:flex-row sm:gap-7">
            <FilmStatusButton
              id="unlist"
              status={Status.UNLISTED}
              checked={status === Status.UNLISTED}
              onChange={statusChangeHandler}
            />
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

          {status === Status.FINISHED_WATCHING && (
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="dateFinished">Date Finished</label>
              <input
                id="dateFinished"
                type="date"
                className="cursor-pointer rounded-md border p-2 text-neutral-600 transition hover:text-neutral-400"
                value={dateFinished}
                onChange={dateFinishedHandler}
              />
            </div>
          )}
          <Button className="max-w-sm font-medium" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default FilmEditorModal;
