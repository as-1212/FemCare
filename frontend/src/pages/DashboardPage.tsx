import { motion } from "framer-motion";
import { ArrowRight, Clock, Info, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import TopNav from "../components/TopNav";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { useHealthHistory } from "../hooks/useHealthHistory";
import { Input, Label } from "../components/ui/Field";
import ToggleRow from "../components/ui/ToggleRow";
import Segmented from "../components/ui/Segmented";
import type { PcosPredictInput, PcosPredictResult } from "../types/pcos";
import { fetchLatestPcosPrediction, predictPcosRisk } from "../services/pcos";

export default function DashboardPage() {
  const { history, clear } = useHealthHistory();
  const [active, setActive] = useState("overview");
  const [pcosLoading, setPcosLoading] = useState(false);
  const [pcosError, setPcosError] = useState<string | null>(null);
  const [pcosLatest, setPcosLatest] = useState<PcosPredictResult | null>(null);

  const [pcosForm, setPcosForm] = useState<PcosPredictInput>({
    age: 24,
    height: 160,
    weight: 60,
    irregular_periods: true,
    average_cycle_length: 35,
    recent_weight_gain: false,
    acne: true,
    acne_severity: 2,
    hair_loss: false,
    excess_hair: false,
    skin_darkening: false,
    mood_swings: false,
    difficulty_conceiving: false,
    family_history: false,
    physical_activity_level: "moderate",
  });

  useEffect(() => {
    (async () => {
      const latest = await fetchLatestPcosPrediction();
      setPcosLatest(latest);
    })();
  }, []);

  const latest = useMemo(() => history.slice(0, 5), [history]);

  async function handlePcosSubmit() {
    setPcosError(null);
    setPcosLoading(true);
    try {
      const res = await predictPcosRisk(pcosForm);
      setPcosLatest(res);
    } catch (e) {
      setPcosError(
        e instanceof Error ? e.message : "Unable to calculate PCOS risk right now.",
      );
    } finally {
      setPcosLoading(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            Dashboard
          </div>
          <div className="mt-3 text-base leading-relaxed text-slate-600">
            Your health history and modules. Anemia and PCOS/PCOD risk tools are
            available in this demo.
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-[92px] lg:self-start">
            <DashboardSidebar active={active} onChange={setActive} />
            <div className="mt-4 hidden lg:block">
              <Card className="rounded-[2rem]">
                <CardBody className="p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Quick action
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600">
                    Run an anemia check anytime and it will appear in your
                    history here.
                  </div>
                  <div className="mt-4">
                    <Link to="/predict">
                      <Button className="w-full" leftIcon={<ArrowRight size={18} />}>
                        Check anemia risk
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="grid gap-6">
            {active === "overview" ? (
              <>
                <Card className="rounded-[2rem]">
                  <CardHeader
                    title="Health history"
                    subtitle="Recent anemia screenings from this device."
                    right={
                      history.length ? (
                        <Button
                          variant="ghost"
                          onClick={clear}
                          leftIcon={<Trash2 size={18} />}
                        >
                          Clear
                        </Button>
                      ) : null
                    }
                  />
                  <CardBody className="pt-4">
                    {latest.length ? (
                      <div className="grid gap-3">
                        {latest.map((h) => (
                          <div
                            key={h.id}
                            className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-semibold text-slate-900">
                                {h.result.riskLevel}
                              </div>
                              <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                                <Clock size={14} />
                                {new Date(h.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                              <Mini k="Hemoglobin" v={`${h.input.hemoglobin} g/dL`} />
                              <Mini k="Fatigue" v={`${h.input.fatigueLevel}/5`} />
                            </div>
                            <div className="mt-3 text-xs leading-relaxed text-slate-600">
                              {h.result.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-3xl bg-white/55 p-6 text-sm text-slate-600 shadow-sm shadow-slate-900/5">
                        No history yet. Run your first anemia risk check.
                        <div className="mt-4">
                          <Link to="/predict">
                            <Button leftIcon={<ArrowRight size={18} />}>
                              Check anemia risk
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>

                <Card className="rounded-[2rem]">
                  <CardHeader
                    title="What’s coming next"
                    subtitle="These modules are placeholders for future expansion."
                  />
                  <CardBody className="pt-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Placeholder title="PCOS / PCOD detection" />
                      <Placeholder title="Cervical cancer screening" />
                      <Placeholder title="Breast cancer screening" />
                      <Placeholder title="Personalized insights" />
                    </div>
                  </CardBody>
                </Card>
              </>
            ) : active === "anemia" ? (
              <Card className="rounded-[2rem]">
                <CardHeader
                  title="Anemia module"
                  subtitle="Run checks and monitor your pattern over time."
                  right={
                    <Link to="/predict">
                      <Button leftIcon={<ArrowRight size={18} />}>New check</Button>
                    </Link>
                  }
                />
                <CardBody className="pt-4">
                  <div className="grid gap-3">
                    {history.length ? (
                      history.map((h) => (
                        <div
                          key={h.id}
                          className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-slate-900">
                              {h.result.riskLevel}
                            </div>
                            <div className="text-xs font-semibold text-slate-500">
                              {new Date(h.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
                            <Mini k="Hb" v={`${h.input.hemoglobin} g/dL`} />
                            <Mini k="Fatigue" v={`${h.input.fatigueLevel}/5`} />
                            <Mini
                              k="Diet"
                              v={h.input.dietType === "vegetarian" ? "Veg" : "Non-veg"}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-3xl bg-white/55 p-6 text-sm text-slate-600 shadow-sm shadow-slate-900/5">
                        No checks yet.
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ) : active === "pcos" ? (
              <Card className="rounded-[2rem]">
                <CardHeader
                  title="PCOS / PCOD module"
                  subtitle="Symptom-based PCOS risk estimation. Not a diagnosis."
                />
                <CardBody className="grid gap-6 pt-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="grid gap-4">
                    <div className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5">
                      <div className="text-sm font-semibold text-slate-900">
                        Your details
                      </div>
                      <div className="mt-3 grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label>Age</Label>
                          <Input
                            type="number"
                            min={12}
                            max={55}
                            value={pcosForm.age}
                            onChange={(e) =>
                              setPcosForm((f) => ({
                                ...f,
                                age: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label hint="cm">Height</Label>
                          <Input
                            type="number"
                            min={120}
                            max={210}
                            value={pcosForm.height}
                            onChange={(e) =>
                              setPcosForm((f) => ({
                                ...f,
                                height: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label hint="kg">Weight</Label>
                          <Input
                            type="number"
                            min={30}
                            max={200}
                            value={pcosForm.weight}
                            onChange={(e) =>
                              setPcosForm((f) => ({
                                ...f,
                                weight: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ToggleRow
                        label="Irregular periods"
                        description="Cycles that are very long, short, or unpredictable."
                        value={pcosForm.irregular_periods}
                        onChange={(v) =>
                          setPcosForm((f) => ({ ...f, irregular_periods: v }))
                        }
                      />
                      <div className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5">
                        <Label hint="days">Average cycle length</Label>
                        <Input
                          type="number"
                          min={15}
                          max={60}
                          value={pcosForm.average_cycle_length ?? ""}
                          onChange={(e) =>
                            setPcosForm((f) => ({
                              ...f,
                              average_cycle_length: e.target.value
                                ? Number(e.target.value)
                                : null,
                            }))
                          }
                          placeholder="e.g., 28"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ToggleRow
                        label="Recent weight gain"
                        description="Unintentional gain over the last few months."
                        value={pcosForm.recent_weight_gain}
                        onChange={(v) =>
                          setPcosForm((f) => ({ ...f, recent_weight_gain: v }))
                        }
                      />
                      <ToggleRow
                        label="Difficulty conceiving"
                        description="Trouble getting pregnant despite trying."
                        value={pcosForm.difficulty_conceiving}
                        onChange={(v) =>
                          setPcosForm((f) => ({ ...f, difficulty_conceiving: v }))
                        }
                      />
                    </div>

                    <div className="rounded-3xl bg-white/60 p-4 shadow-sm shadow-slate-900/5">
                      <Label hint="0 = none, 3 = severe">
                        Acne severity & related symptoms
                      </Label>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                            <span>Acne severity</span>
                            <span className="font-semibold">
                              {pcosForm.acne_severity}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={3}
                            value={pcosForm.acne_severity}
                            onChange={(e) =>
                              setPcosForm((f) => ({
                                ...f,
                                acne_severity: Number(e.target.value),
                                acne: Number(e.target.value) > 0,
                              }))
                            }
                            className="w-full accent-fuchsia-500"
                          />
                        </div>
                        <div className="grid gap-3">
                          <ToggleRow
                            label="Hair loss"
                            value={pcosForm.hair_loss}
                            onChange={(v) =>
                              setPcosForm((f) => ({ ...f, hair_loss: v }))
                            }
                          />
                          <ToggleRow
                            label="Excess facial/body hair"
                            value={pcosForm.excess_hair}
                            onChange={(v) =>
                              setPcosForm((f) => ({ ...f, excess_hair: v }))
                            }
                          />
                          <ToggleRow
                            label="Skin darkening (neck, underarms)"
                            value={pcosForm.skin_darkening}
                            onChange={(v) =>
                              setPcosForm((f) => ({ ...f, skin_darkening: v }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ToggleRow
                        label="Mood swings"
                        value={pcosForm.mood_swings}
                        onChange={(v) =>
                          setPcosForm((f) => ({ ...f, mood_swings: v }))
                        }
                      />
                      <ToggleRow
                        label="Family history of PCOS"
                        value={pcosForm.family_history}
                        onChange={(v) =>
                          setPcosForm((f) => ({ ...f, family_history: v }))
                        }
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[1.2fr_auto] sm:items-center">
                      <div>
                        <Label>Physical activity level</Label>
                        <Segmented<"low" | "moderate" | "high">
                          value={pcosForm.physical_activity_level}
                          onChange={(v) =>
                            setPcosForm((f) => ({
                              ...f,
                              physical_activity_level: v,
                            }))
                          }
                          options={[
                            { value: "low", label: "Low" },
                            { value: "moderate", label: "Moderate" },
                            { value: "high", label: "High" },
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        {pcosError ? (
                          <div className="rounded-2xl bg-rose-50/80 px-3 py-2 text-xs text-rose-700">
                            {pcosError}
                          </div>
                        ) : null}
                        <Button
                          onClick={handlePcosSubmit}
                          disabled={pcosLoading}
                          className="w-full sm:w-auto"
                        >
                          {pcosLoading ? "Calculating…" : "Calculate PCOS risk"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <Card className="glass rounded-3xl">
                      <CardBody className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              PCOS risk result
                            </div>
                            <div className="mt-1 text-xs text-slate-600">
                              Based on your current answers.
                            </div>
                          </div>
                        </div>

                        {pcosLatest ? (
                          <div className="mt-4 space-y-3 text-sm text-slate-700">
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="text-slate-600">Risk level</span>
                              <span className="text-right text-base font-semibold text-slate-900">
                                {pcosLatest.risk_level}
                              </span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="text-slate-600">Risk score</span>
                              <span className="text-right text-base font-semibold text-slate-900">
                                {pcosLatest.pcos_risk_score}
                              </span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="text-slate-600">BMI</span>
                              <span className="text-right text-base font-semibold text-slate-900">
                                {pcosLatest.bmi}
                              </span>
                            </div>
                            <div className="mt-2 rounded-2xl bg-white/70 p-3 text-xs leading-relaxed text-slate-700">
                              {pcosLatest.recommendation}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 text-sm text-slate-600">
                            No PCOS check stored yet. Fill the form and run your first
                            estimation.
                          </div>
                        )}
                      </CardBody>
                    </Card>

                    <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 p-4 text-xs leading-relaxed text-amber-900 shadow-sm shadow-amber-500/10">
                      <div className="mb-1 flex items-center gap-2 font-semibold">
                        <Info size={14} />
                        <span>Medical disclaimer</span>
                      </div>
                      <p>
                        This tool provides risk estimation only and is not a medical
                        diagnosis. Always discuss symptoms and concerns with a qualified
                        health professional.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="rounded-[2rem]">
                <CardHeader
                  title="Coming soon"
                  subtitle="This module is a placeholder in the initial demo."
                />
                <CardBody className="pt-4">
                  <div className="rounded-3xl bg-white/55 p-6 text-sm leading-relaxed text-slate-600 shadow-sm shadow-slate-900/5">
                    We’ll add model-backed prediction and evidence-based guidance
                    here in a future iteration.
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/55 px-3 py-2">
      <div className="text-xs font-semibold text-slate-500">{k}</div>
      <div className="text-xs font-semibold text-slate-900">{v}</div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/55 p-5 shadow-sm shadow-slate-900/5">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">
        Placeholder module for future expansion.
      </div>
    </div>
  );
}

