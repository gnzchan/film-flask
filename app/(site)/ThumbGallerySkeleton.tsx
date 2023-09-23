const ThumbGallerySkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="mx-8 mb-12 flex h-[65vh] min-h-[450px] animate-pulse overflow-hidden rounded-md bg-gray-300"></div>

      <div className="mx-8 flex justify-between gap-8">
        {[...Array(6)].map((movie, i) => (
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
