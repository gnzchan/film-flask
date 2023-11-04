import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-black dark:border-r-white",
          className,
        )}
        role="status"
        {...props}
      ></div>
    );
  },
);

Spinner.displayName = "Spinner";

export default Spinner;
