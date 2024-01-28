import { useEffect, useState } from "react";
import Image from "next/image";

import { Cast, CreditsResponse, Crew } from "@/types";

interface CreditsContainerProps {
  credits: CreditsResponse;
}

const CreditsContainer = ({ credits }: CreditsContainerProps) => {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [director, setDirector] = useState<string | undefined>(undefined);

  useEffect(() => {
    const castsFromProps = credits.cast.map((cast: any) => cast);
    const crewFromProps = credits.crew.map((cast: any) => cast);
    const director = crewFromProps.find((crew: Crew) => crew.job === "Director")
      ?.name;

    setCasts(castsFromProps);
    setDirector(director);
  }, [credits]);

  return (
    <>
      <div className="w-full snap-x snap-mandatory overflow-auto py-4">
        <div className="mx-auto flex max-w-[1500px] gap-4 px-3 xl:justify-around">
          {casts.slice(0, 7).map((cast) => (
            <div
              key={cast.cast_id}
              className="flex w-28 snap-end flex-col items-center gap-2"
            >
              <div className="relative aspect-[3/4] w-28 rounded-md ">
                <Image
                  src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`}
                  alt={cast.name}
                  fill
                  sizes="(min-width: 0px) 115px"
                  className="rounded-md"
                />
              </div>
              <p className="text-center text-xs">
                {cast.name}
                <br />
                <span className="text-gray-600">{cast.character}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {director && (
        <div className="flex items-center justify-center">
          <p className="text-center">
            <span className="text-sm text-gray-600">film by</span>
            <br />
            {director}
          </p>
        </div>
      )}
    </>
  );
};

export default CreditsContainer;
