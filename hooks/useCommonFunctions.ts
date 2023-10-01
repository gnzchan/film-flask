import { useSessionContext } from "@supabase/auth-helpers-react";

const useCommonFunctions = () => {
  const { supabaseClient } = useSessionContext();

  const fetchImage = async (image_path: string) => {
    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(image_path);

    const response = await fetch(imageData.publicUrl);
    const blob = await response.blob();

    const file = new File([blob], image_path);

    return file;
  };

  return { fetchImage };
};

export default useCommonFunctions;
