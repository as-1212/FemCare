import { motion } from "framer-motion";
import type { AnemiaRiskLevel } from "../types/anemia";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function RiskGauge({
  score,
  level,
}: {
  score: number;
  level: AnemiaRiskLevel;
}) {
  const t = clamp01(score / 100);
  const radius = 86;
  const stroke = 14;
  const cx = 100;
  const cy = 100;

  const startAngle = 180;
  const endAngle = 0;
  const angle = startAngle + (endAngle - startAngle) * t;

  const toXY = (deg: number) => {
    const rad = (Math.PI / 180) * deg;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const start = toXY(startAngle);
  const end = toXY(endAngle);
  const needle = toXY(angle);

  const arcPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  const fillPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${needle.x} ${needle.y}`;

  const labelColor =
    level === "High Risk"
      ? "text-rose-600"
      : level === "Medium Risk"
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <div className="grid place-items-center">
      <div className="relative h-[170px] w-[220px]">
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <path
            d={arcPath}
            fill="none"
            stroke="rgba(148,163,184,0.35)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <motion.path
            d={fillPath}
            fill="none"
            stroke="url(#grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          <motion.line
            x1={cx}
            y1={cy}
            x2={needle.x}
            y2={needle.y}
            stroke="rgba(15,23,42,0.85)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ x2: cx, y2: cy }}
            animate={{ x2: needle.x, y2: needle.y }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          />
          <circle cx={cx} cy={cy} r="6" fill="rgba(15,23,42,0.85)" />
        </svg>
      </div>

      <div className="mt-1 text-center">
        <div className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">
          {Math.round(score)}
          <span className="text-base font-semibold text-slate-500">/100</span>
        </div>
        <div className={`mt-1 text-sm font-semibold ${labelColor}`}>{level}</div>
      </div>
    </div>
  );
}

