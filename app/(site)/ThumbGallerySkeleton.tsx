"use client";

import { useEffect, useState } from "react";

const ThumbGallerySkeleton = () => {
  const [size, setSize] = useState(1);

  const updateArraySize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 500) {
      setSize(1);
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
    <div className="flex max-w-[1700px] flex-col">
      <div className="mx-8 mb-12 flex h-[65vh] min-h-[450px] animate-pulse overflow-hidden rounded-md bg-gray-300"></div>

      <div className="mx-8 flex justify-between gap-8">
        {[...Array(size)].map((movie, i) => (
          <div
            key={i}
            className="mt-2 h-[15vh] min-h-[100px] w-full animate-pulse rounded-md bg-gray-300"
          >
            <div className="flex h-full items-center justify-center p-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbGallerySkeleton;
