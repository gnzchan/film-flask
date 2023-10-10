"use client";

import { useEffect, useState } from "react";

const WatchListGallerySkeleton = () => {
  const [size, setSize] = useState(1);

  const updateArraySize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 500) {
      setSize(1);
    } else if (screenWidth <= 850) {
      setSize(2);
    } else if (screenWidth <= 1120) {
      setSize(3);
    } else {
      setSize(4);
    }
  };

  useEffect(() => {
    updateArraySize();
    window.addEventListener("resize", updateArraySize);
    return () => {
      window.removeEventListener("resize", updateArraySize);
    };
  }, []);

  return (
    <>
      <div className="my-2">
        <div className="mx-5 my-5 h-10 w-72 animate-pulse rounded-md bg-gray-300"></div>
        <div className="mx-5 my-5 flex gap-5">
          {[...Array(size)].map((f, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
      <div className="my-2">
        <div className="mx-5 my-5 h-10 w-72 animate-pulse rounded-md bg-gray-300"></div>
        <div className="mx-5 my-5 flex gap-5">
          {[...Array(size)].map((f, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
      <div className="my-2">
        <div className="mx-5 my-5 h-10 w-72 animate-pulse rounded-md bg-gray-300"></div>
        <div className="mx-5 my-5 flex gap-5">
          {[...Array(size)].map((f, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchListGallerySkeleton;
