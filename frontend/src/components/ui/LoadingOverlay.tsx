import { AnimatePresence, motion } from "framer-motion";

export default function LoadingOverlay({
  show,
  title = "Analyzing your health signals…",
  subtitle = "This takes a moment.",
}: {
  show: boolean;
  title?: string;
  subtitle?: string;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-white/40 p-6 backdrop-blur-sm"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="glass w-full max-w-sm rounded-3xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-sky-500/15" />
                <motion.div
                  className="absolute inset-1 rounded-2xl border border-slate-200/60 bg-white/60"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.25,
                    ease: "linear",
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-slate-900">
                  {title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200/60">
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
                animate={{ x: ["-40%", "140%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

