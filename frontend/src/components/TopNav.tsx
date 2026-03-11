import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import Button from "./ui/Button";

export default function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/40 bg-white/35 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="soft-ring inline-flex items-center gap-2 rounded-2xl px-2 py-1"
        >
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-sm shadow-fuchsia-500/25">
            <HeartPulse size={18} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
              FemCare
            </div>
            <div className="text-xs text-slate-500">Anemia Risk</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `soft-ring rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-white/70 text-slate-900 shadow-sm shadow-slate-900/5"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`
            }
          >
            Check Risk
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `soft-ring rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-white/70 text-slate-900 shadow-sm shadow-slate-900/5"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/predict" className="sm:hidden">
            <Button className="px-4 py-2.5 text-sm">Check Risk</Button>
          </Link>
          <Link to="/dashboard" className="hidden sm:block">
            <Button variant="secondary" className="px-4 py-2.5 text-sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

