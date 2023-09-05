import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const authModal = useAuthModal();

  // TODO: Refactor with other modals
  // TODO: also refactor useModal hooks

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      authModal.onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={authModal.isOpen}
      onChange={onChangeHandler}
    >
      test
    </Modal>
  );
};

export default AuthModal;
