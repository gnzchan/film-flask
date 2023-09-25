import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import useFilm from "./useFilm";
import { OMDBFilm } from "@/types";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmLike = (film: OMDBFilm) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { listed } = useFilmEditorModal();
  const { fetchListed, addFilmToListHandler } = useFilm(film.imdbID);

  const fetchLikeStatus = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from("liked_films")
      .select("*")
      .eq("user_id", user.id)
      .eq("film_id", film.imdbID)
      .maybeSingle();

    setLiked(data ? true : false);
  };

  useEffect(() => {
    fetchLikeStatus();
  }, []);

  useEffect(() => {
    fetchLikeStatus();
  }, [user]);

  const likeFilmHandler = async () => {
    if (!user)
      return authModal.onOpen("You need to sign in to use this feature");

    if (!listed) {
      await addFilmToListHandler(film);
      await fetchListed();
    }

    if (liked) {
      const { error } = await supabaseClient
        .from("liked_films")
        .delete()
        .eq("user_id", user.id)
        .eq("film_id", film.imdbID);

      if (error) {
        return toast.error(error.message);
      } else {
        setLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient.from("liked_films").insert({
        user_id: user.id,
        film_id: film.imdbID,
      });

      if (error) {
        return toast.error(error.message);
      } else {
        setLiked(true);
        toast.success("Liked");
      }
    }
  };

  return { liked, likeFilmHandler };
};

export default useFilmLike;
