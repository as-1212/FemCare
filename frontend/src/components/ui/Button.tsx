import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  leftIcon?: ReactNode;
};

export default function Button({
  className,
  variant = "primary",
  leftIcon,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "soft-ring inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-[1.03]",
        variant === "secondary" &&
          "glass text-slate-900 hover:bg-white/70",
        variant === "ghost" &&
          "text-slate-700 hover:bg-white/60 hover:text-slate-900",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}

