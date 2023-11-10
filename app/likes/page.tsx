import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";

import { getLikedFilms } from "@/actions/getSBFilms";
import Header from "@/components/custom-ui/Header";
import Await from "@/components/custom-ui/Await";
import LikesSkeleton from "./LikesSkeleton";
import { FilmCategory } from "@/types";
import FilmGridTMDB from "@/components/custom-ui/FilmGridTMDB";
import { defaultOgImg, description } from "@/constants";
import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";
interface SearchProps {
  searchParams: {
    category: FilmCategory;
  };
}

export const metadata: Metadata = {
  title: "Film Flask - Liked",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Liked Films",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [defaultOgImg],
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
      <CenterContentWrapper>
        <Suspense fallback={<LikesSkeleton />}>
          <Await promise={promise}>
            {(data) => (
              <div className="mb-6">
                <FilmGridTMDB films={data} />
              </div>
            )}
          </Await>
        </Suspense>
      </CenterContentWrapper>
    </div>
  );
};

export default Likes;
