import { Film } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSBFilms = async (): Promise<Film[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase.from("films").select("*");

  if (error) {
    console.log(error);
  }

  return (data as Film[]) || [];
};

export default getSBFilms;
