import { Film, Status } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFilms = async (): Promise<Film[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("films")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as Film[]) || [];
};

const getLikedFilms = async (): Promise<Film[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("liked_films")
    .select("films(*)")
    .eq("user_id", user?.id);

  if (error) {
    console.log(error);
  }

  const filmData = data?.map((item) => item.films as unknown as Film);

  return filmData || [];
};

const getListedFilms = async (status: Status): Promise<Film[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("status_films")
    .select("films(*)")
    .eq("user_id", user?.id)
    .eq("status", status);

  if (error) {
    console.log(error);
  }

  const filmData = data?.map((item) => item.films as unknown as Film);

  return filmData || [];
};

export { getFilms, getLikedFilms, getListedFilms };
