import CenterContentWrapper from "@/components/custom-ui/CenterContentWrapper";

const LikesSkeleton = () => {
  return (
    <CenterContentWrapper>
      <div className="grid w-full grid-cols-2 place-items-center gap-5 px-5 pt-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...Array(14)].map((f, i) => (
          <div
            key={i}
            className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-300"
          ></div>
        ))}
      </div>
    </CenterContentWrapper>
  );
};

export default LikesSkeleton;
