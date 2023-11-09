import { getData } from "@/lib/helpers";
import { SeasonDetails } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const id = searchParams.get("id");
  const season = searchParams.get("season");

  const tmdbKey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${category}/${id}/season/${season}?api_key=${tmdbKey}&language=en-US`;

  const SeasonDetails = await getData<SeasonDetails>(url);

  return NextResponse.json(SeasonDetails);
};
