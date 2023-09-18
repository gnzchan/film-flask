import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "./useUser";

import { Film } from "@/types";

const useLikedFilms = () => {
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchLikedFilms = async () => {
      if (!user) {
        return;
      }

      const { data } = await supabaseClient
        .from("liked_films")
        .select("films(*)")
        .eq("user_id", user.id);

      console.log(data);
      const filmData = data?.map((item) => item.films as unknown as Film);

      setFilms(filmData as Film[]);
    };

    fetchLikedFilms();
  }, []);

  return { films };
};

export default useLikedFilms;
