import { clsx } from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

export function Label({
  children,
  hint,
}: {
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="mb-2 flex items-end justify-between gap-3">
      <div className="text-sm font-semibold text-slate-800">{children}</div>
      {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "soft-ring w-full rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

export function FieldRow({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      {icon ? (
        <div className="mt-9 grid h-10 w-10 place-items-center rounded-2xl bg-white/60 text-slate-700 shadow-sm shadow-slate-900/5">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

