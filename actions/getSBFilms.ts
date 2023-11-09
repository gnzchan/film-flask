"use server";

import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { FilmCategory, Status, TMDBFilm } from "@/types";
import getFilmById from "./getFilmById";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
});

const getTMDBFilms = async (): Promise<TMDBFilm[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("films")
    .select("id, category")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.log(error);
  }

  const tmdbDataPromise = data?.map(({ id, category }) =>
    getFilmById(category, id),
  );
  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getLikedFilms = async (): Promise<TMDBFilm[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("films")
    .select("id, category, liked_films!inner()")
    .eq("liked_films.user_id", user?.id)
    .returns<{ id: string; category: FilmCategory }[]>();

  if (error) {
    console.log(error);
  }

  const tmdbDataPromise = data?.map(({ id, category }) =>
    getFilmById(category, id),
  );
  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

const getListedFilms = async (status: Status): Promise<TMDBFilm[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("films")
    .select("id, category, status_films!inner()")
    .eq("status_films.user_id", user?.id)
    .eq("status_films.status", status)
    .returns<{ id: string; category: FilmCategory }[]>();

  if (error) {
    console.log(error);
  }

  const tmdbDataPromise = data?.map(({ id, category }) =>
    getFilmById(category, id),
  );
  const tmdbData = await Promise.all(tmdbDataPromise || []);

  return (tmdbData as unknown as TMDBFilm[]) || [];
};

export { getTMDBFilms, getLikedFilms, getListedFilms };
