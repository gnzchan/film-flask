import { NextResponse } from "next/server";

import { getTMDBFilms } from "@/actions/getSBFilms";

export const GET = async (request: Request) => {
  const data = await getTMDBFilms();

  return NextResponse.json(data);
};
