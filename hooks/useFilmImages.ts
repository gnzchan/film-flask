import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmImages = (filmId: string) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagesForUpload, setImagesForUpload] = useState<File[]>([]);
  const [imagesForRemove, setImagesForRemove] = useState<File[]>([]);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();

  const fetchImage = async (image_path: string) => {
    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(image_path);

    const response = await fetch(imageData.publicUrl);
    const blob = await response.blob();

    const file = new File([blob], image_path);

    return file;
  };

  const fetchImages = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from("image_films")
      .select("image_path")
      .eq("film_id", filmId)
      .eq("user_id", user.id);

    if (data) {
      const imagesPromise = data.map(({ image_path }) =>
        fetchImage(image_path),
      );
      const imagesData = await Promise.all(imagesPromise || []);
      setImages(imagesData);
    } else {
      setImages([]);
    }
  };

  useEffect(() => {
    if (!filmEditorModal.isOpen) {
      setImagesForUpload([]);
      fetchImages();
    }
  }, [filmEditorModal.isOpen]);

  useEffect(() => {
    fetchImages();
  }, [user, filmId]);

  const addImageForUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (!newImage) return;

    for (const image of [...images, ...imagesForUpload]) {
      if (image.name === newImage.name) {
        console.log("dupe");
        return;
      }
    }

    setImagesForUpload((existingImages) => [...existingImages, newImage]);
  };

  const removeImageForUploadHandler = (
    e: MouseEvent<HTMLButtonElement>,
    imageToRemove: File,
    uploaded: boolean,
  ) => {
    e.preventDefault();

    if (uploaded) {
      setImagesForRemove((existingImages) => [
        ...existingImages,
        imageToRemove,
      ]);
      const updatedItems = images.filter(
        (image) => image.name !== imageToRemove.name,
      );
      setImages(updatedItems);
    } else {
      const updatedItems = imagesForUpload.filter(
        (image) => image.name !== imageToRemove.name,
      );
      setImagesForUpload(updatedItems);
    }
  };

  const uploadImagesHandler = async () => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    for (const uploadImage of imagesForUpload) {
      const uniqueId = uuidv4();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${user.email}-${uniqueId}`, uploadImage, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        return toast.error("Failed to upload image.");
      } else {
        const { data } = await supabaseClient.from("image_films").insert({
          user_id: user.id,
          film_id: filmId,
          image_path: `image-${user.email}-${uniqueId}`,
        });
      }
    }
    setImagesForUpload([]);
  };

  const removeImagesHandler = async () => {
    for (const removeImage of imagesForRemove) {
      const { data: imageData, error: imageError } =
        await supabaseClient.storage.from("images").remove([removeImage.name]);

      if (imageError) {
        return toast.error("Failed to remove image.");
      } else {
        const { data, error } = await supabaseClient
          .from("image_films")
          .delete()
          .eq("image_path", removeImage.name);

        if (error) {
          console.log(error);
        }
      }
    }
    setImagesForRemove([]);
  };

  return {
    fetchImage,
    images,
    imagesForUpload,
    imagesForRemove,
    addImageForUploadHandler,
    removeImageForUploadHandler,
    uploadImagesHandler,
    removeImagesHandler,
  };
};

export default useFilmImages;
