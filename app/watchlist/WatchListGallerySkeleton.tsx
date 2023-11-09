const WatchListGallerySkeleton = () => {
  const size = 7;

  return (
    <div className="overflow-hidden">
      <div className="my-2">
        <div className="mx-5 my-5 h-10 w-72 animate-pulse rounded-md bg-gray-300"></div>
        <div className="mx-5 my-5 flex gap-5">
          {[...Array(size)].map((f, i) => (
            <div
              key={i}
              className="aspect-[3/4] h-[270px] animate-pulse rounded-md bg-gray-300"
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
              className="aspect-[3/4] h-[270px] animate-pulse rounded-md bg-gray-300"
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
              className="aspect-[3/4] h-[270px] animate-pulse rounded-md bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchListGallerySkeleton;
