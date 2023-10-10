import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
    w-full min-w-[120px] max-w-sm rounded-full border border-transparent bg-zinc-900 px-3 py-2 font-bold text-white shadow-sm shadow-zinc-950 transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-300 dark:bg-white dark:text-black dark:shadow-none`,
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
