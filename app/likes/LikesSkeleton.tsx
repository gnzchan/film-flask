const LikesSkeleton = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[1700px] grid-cols-2 place-items-center gap-5 px-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        {[...Array(14)].map(() => (
          <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default LikesSkeleton;
