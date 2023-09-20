import Link from "next/link";

const Unauthenticated = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <p className="text-md font-normal">
        You need to sign-in to access this content
      </p>
      <Link href="/">
        <p className="text-md font-normal">
          back to <span className="mx-1 text-lg font-bold underline">home</span>
        </p>
      </Link>
    </div>
  );
};

export default Unauthenticated;
