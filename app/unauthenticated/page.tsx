import { defaultOgImg, description } from "@/constants";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unauthenticated: Film Flask",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Unauthenticated: Film Flask",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [defaultOgImg],
    locale: "en_US",
    type: "website",
  },
};

const Unauthenticated = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <p className="text-md font-normal">
        You need to sign-in to access this content
      </p>
      <Link href="/">
        <p className="text-md font-normal">
          back to <span className="mx-1 text-lg font-bold underline">home</span>
        </p>
      </Link>
    </div>
  );
};

export default Unauthenticated;
