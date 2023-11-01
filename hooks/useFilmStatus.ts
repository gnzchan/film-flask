import { ChangeEvent, useEffect, useState, startTransition } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import { FilmCategory, Status } from "@/types";
import useFilmEditorModal from "./useFilmEditorModal";
import { useRouter } from "next/navigation";

const useFilmStatus = (
  filmId: number | undefined,
  filmCategory: FilmCategory | undefined,
) => {
  const router = useRouter();
  const [status, setStatus] = useState(Status.UNLISTED);
  const [listed, setListed] = useState(false);
  const [dateFinished, setDateFinished] = useState<string>("");
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();

  const fetchStatus = async () => {
    if (!user || !filmId || !filmCategory) return;

    const { data } = await supabaseClient
      .from("status_films")
      .select("status, date_finished, films!inner()")
      .eq("film_id", filmId)
      .eq("user_id", user.id)
      .eq("films.category", filmCategory)
      .maybeSingle<{ status: Status; date_finished: string }>();

    if (data) {
      setStatus(data.status);
      setDateFinished(data.date_finished);
      setListed(true);
    } else {
      setStatus(Status.UNLISTED);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [user, filmId, filmCategory]);

  useEffect(() => {
    if (!filmEditorModal.isOpen) fetchStatus();
  }, [filmEditorModal.isOpen]);

  const addStatusHandler = async (filmId: number) => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    if (status === Status.UNLISTED) {
      if (listed) {
        if (!user) return;

        const { error } = await supabaseClient
          .from("status_films")
          .delete()
          .eq("film_id", filmId)
          .eq("user_id", user.id);

        if (error) {
          return toast.error(error.message);
        } else {
          setListed(false);
        }
      }
    } else {
      const { error } = await supabaseClient.from("status_films").upsert({
        user_id: user.id,
        film_id: filmId,
        date_finished: status === Status.FINISHED_WATCHING ? dateFinished : "",
        status,
      });

      if (error) return toast.error(error.message);
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const statusChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setStatus(e.target.value as Status);

  const dateFinishedHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDateFinished(e.target.value);

  return {
    status,
    dateFinished,
    addStatusHandler,
    statusChangeHandler,
    dateFinishedHandler,
  };
};

export default useFilmStatus;
