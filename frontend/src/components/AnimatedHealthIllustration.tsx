import { motion } from "framer-motion";

export default function AnimatedHealthIllustration() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-sky-500/10 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass relative h-full w-full overflow-hidden rounded-[2.5rem]"
      >
        <motion.div
          className="absolute -left-10 -top-12 h-56 w-56 rounded-full bg-violet-500/15 blur-xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 -bottom-16 h-64 w-64 rounded-full bg-sky-500/12 blur-xl"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 p-6">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wide text-slate-500">
                  Live Health Snapshot
                </div>
                <div className="mt-1 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                  Hemoglobin & Symptoms
                </div>
              </div>
              <div className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-900/5">
                AI Assist
              </div>
            </div>

            <div className="grid gap-3">
              <MetricRow label="Energy" value="Balanced" pct={0.74} />
              <MetricRow label="Iron Intake" value="Needs focus" pct={0.45} />
              <MetricRow label="Hydration" value="Good" pct={0.68} />
            </div>

            <div className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold text-slate-500">
                Today’s gentle reminder
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Track fatigue + dizziness to spot early anemia signals.
              </div>
              <div className="mt-2 text-xs text-slate-600">
                Your data stays on your device in this demo.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="rounded-3xl bg-white/55 p-4 shadow-sm shadow-slate-900/5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="text-xs font-semibold text-slate-600">{value}</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(pct * 100)}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

