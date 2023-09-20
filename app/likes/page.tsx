import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getLikedFilms } from "@/actions/getSBFilms";
import FilmGrid from "@/components/ui/FilmGrid";
import Header from "@/components/ui/Header";
import { redirect } from "next/navigation";

const Likes = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const films = await getLikedFilms();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <FilmGrid films={films} />
    </div>
  );
};

export default Likes;
