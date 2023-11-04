"use client";

import { useEffect, useState } from "react";

const ThumbGallerySkeleton = () => {
  const [size, setSize] = useState(1);

  const updateArraySize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 500) {
      setSize(3);
    } else if (screenWidth <= 800) {
      setSize(5);
    } else {
      setSize(7);
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
    <div className="flex h-full flex-col bg-white dark:bg-black">
      <div className="mb-5 flex aspect-video h-[60%] w-full flex-col items-center justify-end bg-gray-300 p-1 sm:items-start sm:p-5">
        <div className="mb-7 h-6 w-[40%] min-w-[200px] animate-pulse rounded-full bg-gray-400"></div>
        <div className="h-12 w-[160px] animate-pulse rounded-sm bg-gray-400 "></div>
      </div>
      <div className="mb-7 ml-5 h-6 w-[45%] min-w-[230px] animate-pulse rounded-full bg-gray-400"></div>
      <div className="mx-8 flex justify-between gap-8">
        {[...Array(size)].map((movie, i) => (
          <div
            key={i}
            className="h-[170px] w-full animate-pulse rounded-md bg-gray-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ThumbGallerySkeleton;
