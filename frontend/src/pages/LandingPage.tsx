import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedHealthIllustration from "../components/AnimatedHealthIllustration";
import TopNav from "../components/TopNav";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5"
            >
              <Sparkles size={16} className="text-fuchsia-600" />
              AI-guided anemia risk check
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl"
            >
              AI-Powered Women&apos;s Health Intelligence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600"
            >
              Early detection starts with gentle signals. Answer a few questions
              about symptoms and hemoglobin to estimate your anemia risk—then get
              clear next steps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/predict">
                <Button leftIcon={<ArrowRight size={18} />}>
                  Check My Health Risk
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary">Open Dashboard</Button>
              </Link>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Feature
                icon={<ShieldCheck size={18} />}
                title="Friendly + private"
                text="This demo stores history locally in your browser."
              />
              <Feature
                icon={<Sparkles size={18} />}
                title="Expandable modules"
                text="Designed to add PCOS/PCOD and cancer screening later."
              />
            </div>
          </div>

          <div className="lg:pl-6">
            <AnimatedHealthIllustration />
          </div>
        </div>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="rounded-3xl">
      <CardBody className="p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-slate-700 shadow-sm shadow-slate-900/5">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <div className="mt-1 text-sm leading-relaxed text-slate-600">
              {text}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

