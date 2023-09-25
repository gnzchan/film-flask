import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const authModal = useAuthModal();

  const onChangeHandler = (open: boolean) => {
    if (!open) {
      authModal.onClose();
    }
  };

  return (
    <Modal
      title={authModal.title}
      description="Login to your account"
      isOpen={authModal.isOpen}
      onChange={onChangeHandler}
    >
      <Auth
        theme="dark"
        providers={["google"]}
        supabaseClient={supabaseClient}
        view="sign_in"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#525252",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
