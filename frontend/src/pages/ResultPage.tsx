import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Stethoscope } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RiskGauge from "../components/RiskGauge";
import TopNav from "../components/TopNav";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import type { AnemiaHistoryItem } from "../types/anemia";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state as AnemiaHistoryItem | undefined;

  if (!item) {
    return (
      <div className="min-h-dvh">
        <TopNav />
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6">
          <Card className="rounded-[2rem]">
            <CardHeader
              title="No result to show"
              subtitle="Run a quick check to generate a result."
            />
            <CardBody className="flex flex-col gap-3 sm:flex-row">
              <Link to="/predict">
                <Button leftIcon={<ArrowRight size={18} />}>Check Risk</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            </CardBody>
          </Card>
        </main>
      </div>
    );
  }

  const { result, input } = item;

  return (
    <div className="min-h-dvh">
      <TopNav />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <Card className="rounded-[2rem]">
            <CardHeader
              title="Your anemia risk"
              subtitle={`Based on your inputs · ${new Date(item.createdAt).toLocaleString()}`}
            />
            <CardBody className="grid gap-6 pt-4">
              <RiskGauge score={result.riskScore} level={result.riskLevel} />

              <div className="rounded-3xl bg-white/60 p-5 shadow-sm shadow-slate-900/5">
                <div className="text-sm font-semibold text-slate-900">
                  AI explanation
                </div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600">
                  {result.explanation}
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-500">
                  Source: {result.modelSource}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link to="/predict">
                  <Button variant="secondary">Check Again</Button>
                </Link>
                <Link to="/dashboard">
                  <Button leftIcon={<ClipboardList size={18} />}>
                    Save & View History
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-[2rem]">
              <CardHeader
                title="Suggested actions"
                subtitle="Practical next steps you can take today."
              />
              <CardBody className="pt-4">
                <ul className="grid gap-3">
                  {result.suggestions.map((s) => (
                    <li
                      key={s}
                      className="rounded-2xl bg-white/60 p-4 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/5"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl border border-slate-200/60 bg-white/55 p-4 text-xs leading-relaxed text-slate-600">
                  If you feel faint, have chest pain, or symptoms are worsening,
                  seek urgent medical care.
                </div>
              </CardBody>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader
                title="Your snapshot"
                subtitle="A quick summary of the inputs you provided."
              />
              <CardBody className="pt-4">
                <div className="grid gap-3 text-sm">
                  <Row k="Age" v={`${input.age} years`} />
                  <Row k="Hemoglobin" v={`${input.hemoglobin} g/dL`} />
                  <Row k="Fatigue" v={`${input.fatigueLevel}/5`} />
                  <Row k="Dizziness" v={input.dizziness ? "Yes" : "No"} />
                  <Row k="Pale skin" v={input.paleSkin ? "Yes" : "No"} />
                  <Row
                    k="Diet"
                    v={input.dietType === "vegetarian" ? "Vegetarian" : "Non-vegetarian"}
                  />
                </div>

                <div className="mt-5">
                  <Button
                    variant="ghost"
                    leftIcon={<Stethoscope size={18} />}
                    onClick={() => navigate("/dashboard")}
                    className="w-full justify-center"
                  >
                    Explore your dashboard
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/55 px-4 py-3 shadow-sm shadow-slate-900/5">
      <div className="text-slate-600">{k}</div>
      <div className="font-semibold text-slate-900">{v}</div>
    </div>
  );
}

