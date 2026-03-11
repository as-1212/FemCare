import { clsx } from "clsx";

export default function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex rounded-2xl bg-white/60 p-1 shadow-sm shadow-slate-900/5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={clsx(
              "soft-ring flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
              active
                ? "bg-white text-slate-900 shadow-sm shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

