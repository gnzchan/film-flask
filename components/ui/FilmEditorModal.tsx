import { useState } from "react";

import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";

import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import { Status } from "@/types";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();
  const [review, setReview] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>(Status.TO_WATCH_LATER);

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };

  return (
    <Modal
      title="Edit film record"
      description={`You are currently editing ${
        filmEditorModal.film?.Title ?? ""
      }`}
      isOpen={filmEditorModal.isOpen}
      onChange={onChangeHandler}
    >
      <div className="flex flex-col">
        <textarea
          className="mb-10 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          placeholder="Leave a review"
        />
        <div className="flex items-center justify-center gap-4">
          <button>
            <FilmStatusButton
              id="add"
              color="white"
              src="https://cdn.lordicon.com/ynwbvguu.json"
              description="Add to watch later"
            />
          </button>

          <FilmStatusButton
            id="current"
            color="white"
            src="https://cdn.lordicon.com/ycwlopoz.json"
            description="Currently watching"
          />
          <FilmStatusButton
            id="complete"
            color="#FFFFFF"
            src="https://cdn.lordicon.com/tyvtvbcy.json"
            description="Finished watching"
          />
        </div>
      </div>
    </Modal>
  );
};

export default FilmEditorModal;
