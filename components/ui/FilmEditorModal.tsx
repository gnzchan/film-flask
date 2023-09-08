import { useState } from "react";

import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";

import { Status } from "@/types";
import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import Button from "./Button";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };

  const create = (e: FormData) => {
    const review = e.get("comment")?.toString();
    const status = e.get("status")?.toString();

    console.log(e);
    console.log(review);
    console.log(status);
  };

  return (
    <Modal
      title="Edit film record"
      description={`You are currently editing ${
        filmEditorModal.film?.Title ?? ""
      }`}
      isOpen
      // ={filmEditorModal.isOpen}
      onChange={onChangeHandler}
    >
      <div className="flex flex-col">
        <form
          action={create}
          className="flex flex-col items-center justify-center gap-10"
        >
          <textarea
            name="comment"
            rows={5}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Leave a review"
          />

          <div className="flex w-full flex-col items-center justify-center gap-7 px-7 sm:flex-row">
            <FilmStatusButton
              id="add"
              color="white"
              src="https://cdn.lordicon.com/ynwbvguu.json"
              status={Status.TO_WATCH_LATER}
            />
            <FilmStatusButton
              id="current"
              color="white"
              src="https://cdn.lordicon.com/ycwlopoz.json"
              status={Status.CURRENTLY_WATCHING}
            />
            <FilmStatusButton
              id="complete"
              color="#FFFFFF"
              src="https://cdn.lordicon.com/tyvtvbcy.json"
              status={Status.FINISHED_WATCHING}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Modal>
  );
};

export default FilmEditorModal;
