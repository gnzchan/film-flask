import { forwardRef } from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-black dark:border-r-white"
      role="status"
      {...props}
    ></div>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
