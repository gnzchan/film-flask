import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getLikedFilms } from "@/actions/getSBFilms";
import FilmGrid from "@/components/ui/FilmGrid";
import Header from "@/components/ui/Header";
import Await from "@/components/ui/Await";
import LikesSkeleton from "./LikesSkeleton";

const Likes = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const promise = getLikedFilms();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <Suspense fallback={<LikesSkeleton />}>
        <Await promise={promise}>{(data) => <FilmGrid films={data} />}</Await>
      </Suspense>
    </div>
  );
};

export default Likes;
