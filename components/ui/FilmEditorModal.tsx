import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import Modal from "./Modal";
import FilmStatusButton from "./FilmStatusButton";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();

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
          <FilmStatusButton
            id="add"
            color="white"
            src="https://cdn.lordicon.com/ynwbvguu.json"
            description="Add to watch later"
          />
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
