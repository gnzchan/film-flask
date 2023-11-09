import { NextResponse } from "next/server";

import { getUpcomingMovies } from "@/actions/getTMDBFilms";

export const GET = async (request: Request) => {
  const data = await getUpcomingMovies();

  return NextResponse.json(data);
};
