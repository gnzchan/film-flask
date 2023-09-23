import { ChangeEvent, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import { Status } from "@/types";
import useFilmEditorModal from "./useFilmEditorModal";

const useFilmStatus = (filmId: string) => {
  const [status, setStatus] = useState("");
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const filmEditorModal = useFilmEditorModal();

  const fetchStatus = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from("status_films")
      .select("status")
      .eq("film_id", filmId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setStatus(data.status);
    } else {
      setStatus(Status.TO_WATCH_LATER);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [user, filmId]);

  useEffect(() => {
    if (!filmEditorModal.isOpen) fetchStatus();
  }, [filmEditorModal.isOpen]);

  const addStatusHandler = async (filmId: string) => {
    if (!user)
      return authModal.onOpen("You need to sign in to access this content");

    const { error } = await supabaseClient.from("status_films").upsert({
      user_id: user.id,
      film_id: filmId,
      status,
    });

    if (error) return toast.error(error.message);
  };

  const statusChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setStatus(e.target.value as Status);

  return { status, addStatusHandler, statusChangeHandler };
};

export default useFilmStatus;
