import { useEffect, useState, startTransition } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import useFilm from "./useFilm";
import useFilmEditorModal from "./useFilmEditorModal";
import { useRouter } from "next/navigation";
import { TMDBFilm } from "@/types";

const useFilmLike = (film: TMDBFilm) => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean | null>(null);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { listed } = useFilmEditorModal();
  const { fetchListed, addFilmToListHandler } = useFilm(film.id, film.category);

  const fetchLikeStatus = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from("liked_films")
      .select("count, films!inner()")
      .eq("film_id", film.id)
      .eq("user_id", user.id)
      .eq("films.category", film.category)
      .maybeSingle<{ count: number }>();

    setLiked(data?.count !== 0);
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
        .eq("film_id", film.id);

      if (error) {
        return toast.error(error.message);
      } else {
        setLiked(false);
        startTransition(() => {
          router.refresh();
        });
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient.from("liked_films").insert({
        user_id: user.id,
        film_id: film.id,
      });

      if (error) {
        return toast.error(error.message);
      } else {
        setLiked(true);
        startTransition(() => {
          router.refresh();
        });
        toast.success("Liked");
      }
    }
  };

  return { liked, likeFilmHandler };
};

export default useFilmLike;
