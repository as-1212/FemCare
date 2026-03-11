import { clsx } from "clsx";
import {
  Activity,
  Droplet,
  LayoutDashboard,
  Microscope,
  ShieldPlus,
} from "lucide-react";

type Item = {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

const items: Item[] = [
  { key: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { key: "anemia", label: "Anemia", icon: <Droplet size={18} />, badge: "Live" },
  {
    key: "pcos",
    label: "PCOS / PCOD",
    icon: <Activity size={18} />,
    badge: "Live",
  },
  {
    key: "cervical",
    label: "Cervical cancer",
    icon: <ShieldPlus size={18} />,
    badge: "Soon",
  },
  {
    key: "breast",
    label: "Breast cancer",
    icon: <Microscope size={18} />,
    badge: "Soon",
  },
];

export default function DashboardSidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="glass rounded-[2rem] p-3">
      <div className="px-3 pb-2 pt-1 text-xs font-semibold tracking-wide text-slate-500">
        Modules
      </div>
      <div className="grid gap-1">
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              className={clsx(
                "soft-ring flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition",
                isActive
                  ? "bg-white/75 shadow-sm shadow-slate-900/5"
                  : "hover:bg-white/60",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "grid h-9 w-9 place-items-center rounded-2xl shadow-sm shadow-slate-900/5",
                    isActive
                      ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white"
                      : "bg-white/65 text-slate-700",
                  )}
                >
                  {it.icon}
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {it.label}
                </div>
              </div>
              {it.badge ? (
                <div
                  className={clsx(
                    "rounded-2xl px-2.5 py-1 text-xs font-semibold",
                    it.badge === "Live"
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-slate-900/5 text-slate-600",
                  )}
                >
                  {it.badge}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

