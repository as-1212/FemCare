import { clsx } from "clsx";
import type { ReactNode } from "react";

export default function ToggleRow({
  label,
  description,
  icon,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  icon?: ReactNode;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="soft-ring flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-3 text-left transition hover:bg-white/70"
    >
      <div className="flex min-w-0 items-center gap-3">
        {icon ? (
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/70 text-slate-700 shadow-sm shadow-slate-900/5">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="truncate text-[15px] font-semibold text-slate-900">
            {label}
          </div>
          {description ? (
            <div className="mt-0.5 truncate text-xs text-slate-500">
              {description}
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={clsx(
          "relative h-7 w-12 rounded-full border transition",
          value
            ? "border-violet-300/50 bg-gradient-to-r from-violet-500 to-fuchsia-500"
            : "border-slate-300/60 bg-slate-200/70",
        )}
        aria-hidden="true"
      >
        <div
          className={clsx(
            "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm shadow-slate-900/10 transition",
            value ? "left-[calc(100%-1.625rem)]" : "left-0.5",
          )}
        />
      </div>
    </button>
  );
}

