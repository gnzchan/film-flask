import { NextResponse } from "next/server";

import { getPopularMovies } from "@/actions/getTMDBFilms";

export const GET = async (request: Request) => {
  const data = await getPopularMovies();

  return NextResponse.json(data);
};
