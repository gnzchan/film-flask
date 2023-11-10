import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

interface LoadingContentProps {
  className?: string;
  string: string;
}

const LoadingContent = ({ className, string }: LoadingContentProps) => {
  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center gap-7",
        className,
      )}
    >
      <Spinner />
      <p className="animate-pulse text-sm font-light text-neutral-700 dark:text-neutral-300">
        {string}
      </p>
    </div>
  );
};

export default LoadingContent;
