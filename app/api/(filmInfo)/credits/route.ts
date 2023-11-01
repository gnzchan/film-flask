import { getData } from "@/libs/helpers";
import { CreditsResponse } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const id = searchParams.get("id");

  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${tmdbKey}&language=en-US`;

  const casts = await getData<CreditsResponse>(url);

  return NextResponse.json(casts);
};
