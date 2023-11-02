import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";

import { getLikedFilms } from "@/actions/getSBFilms";
import Header from "@/components/ui/Header";
import Await from "@/components/ui/Await";
import LikesSkeleton from "./LikesSkeleton";
import { FilmCategory } from "@/types";
import FilmGridTMDB from "@/components/ui/FilmGridTMDB";
import { description } from "@/constants";
interface SearchProps {
  searchParams: {
    category: FilmCategory;
  };
}

export const metadata: Metadata = {
  title: "Film Flask - Liked Films",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Liked Films",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [
      {
        url: "https://raw.githubusercontent.com/gnzchan/film-flask/main/public/images/ff-logo-whitebg.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const Likes: React.FC<SearchProps> = async ({ searchParams }) => {
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
        <Await promise={promise}>
          {(data) => <FilmGridTMDB films={data} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Likes;
