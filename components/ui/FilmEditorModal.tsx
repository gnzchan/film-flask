

import useFilmEditorModal from "@/hooks/useFilmEditorModal";
import Modal from "./Modal";

const FilmEditorModal = () => {
  const filmEditorModal = useFilmEditorModal();

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      filmEditorModal.onClose();
    }
  };
  return (
    <Modal
      title="Edit film list"
      description={filmEditorModal.film?.Title ?? ""}
      isOpen
      // ={filmEditorModal.isOpen}
      onChange={onChangeHandler}
    >
      <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      placeholder="Leave a review"></textarea>

    </Modal>
  );
};

export default FilmEditorModal;
