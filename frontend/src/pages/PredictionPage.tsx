import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BatteryLow,
  Droplet,
  PersonStanding,
  Salad,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { FieldRow, Input, Label } from "../components/ui/Field";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Segmented from "../components/ui/Segmented";
import ToggleRow from "../components/ui/ToggleRow";
import { useHealthHistory } from "../hooks/useHealthHistory";
import { predictAnemiaRisk } from "../services/anemia";
import type { AnemiaPredictInput, DietType } from "../types/anemia";

function toFatigue(n: number): 1 | 2 | 3 | 4 | 5 {
  if (n <= 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 3;
  if (n === 4) return 4;
  return 5;
}

export default function PredictionPage() {
  const navigate = useNavigate();
  const { add } = useHealthHistory();

  const [age, setAge] = useState<number>(24);
  const [hemoglobin, setHemoglobin] = useState<number>(11.4);
  const [fatigueLevel, setFatigueLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [dizziness, setDizziness] = useState(false);
  const [paleSkin, setPaleSkin] = useState(false);
  const [dietType, setDietType] = useState<DietType>("vegetarian");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const input: AnemiaPredictInput = useMemo(
    () => ({
      age,
      hemoglobin,
      fatigueLevel,
      dizziness,
      paleSkin,
      dietType,
    }),
    [age, hemoglobin, fatigueLevel, dizziness, paleSkin, dietType],
  );

  async function onSubmit() {
    setError(null);
    setLoading(true);
    try {
      const result = await predictAnemiaRisk(input);
      const item = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
        createdAt: new Date().toISOString(),
        input,
        result,
      };
      add(item);
      navigate("/result", { state: item });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <TopNav />
      <LoadingOverlay show={loading} />

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5">
            <Sparkles size={16} className="text-fuchsia-600" />
            Symptom-aware anemia screening
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            Check your anemia risk
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Enter your hemoglobin and a few symptoms. You’ll get a clear risk
            level, an AI explanation, and suggested next steps.
          </p>
        </motion.div>

        <Card className="rounded-[2rem]">
          <CardHeader
            title="Your inputs"
            subtitle="Not medical advice—use this to decide next steps."
          />
          <CardBody className="pt-6">
            <div className="grid gap-5">
              <FieldRow icon={<PersonStanding size={18} />}>
                <Label hint="Years">Age</Label>
                <Input
                  inputMode="numeric"
                  type="number"
                  min={10}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="e.g., 24"
                />
              </FieldRow>

              <FieldRow icon={<Droplet size={18} />}>
                <Label hint="g/dL">Hemoglobin level</Label>
                <Input
                  inputMode="decimal"
                  type="number"
                  step="0.1"
                  min={4}
                  max={20}
                  value={hemoglobin}
                  onChange={(e) => setHemoglobin(Number(e.target.value))}
                  placeholder="e.g., 11.4"
                />
              </FieldRow>

              <FieldRow icon={<BatteryLow size={18} />}>
                <Label hint="1 = none, 5 = severe">Fatigue level</Label>
                <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-800">
                      {fatigueLevel}/5
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      How tired do you feel?
                    </div>
                  </div>
                  <input
                    className="mt-4 w-full accent-fuchsia-500"
                    type="range"
                    min={1}
                    max={5}
                    value={fatigueLevel}
                    onChange={(e) => setFatigueLevel(toFatigue(Number(e.target.value)))}
                  />
                </div>
              </FieldRow>

              <div className="grid gap-3 sm:grid-cols-2">
                <ToggleRow
                  icon={<Activity size={18} />}
                  label="Dizziness"
                  description="Lightheaded or unsteady lately?"
                  value={dizziness}
                  onChange={setDizziness}
                />
                <ToggleRow
                  icon={<AlertTriangle size={18} />}
                  label="Pale skin"
                  description="Noticing unusual paleness?"
                  value={paleSkin}
                  onChange={setPaleSkin}
                />
              </div>

              <FieldRow icon={<Salad size={18} />}>
                <Label>Diet type</Label>
                <Segmented<DietType>
                  value={dietType}
                  onChange={setDietType}
                  options={[
                    { value: "vegetarian", label: "Vegetarian" },
                    { value: "non-vegetarian", label: "Non-vegetarian" },
                  ]}
                />
              </FieldRow>

              {error ? (
                <div className="rounded-2xl border border-rose-200/70 bg-rose-50/70 p-4 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs leading-relaxed text-slate-500">
                  Tip: hemoglobin below ~12 g/dL may increase anemia risk.
                </div>
                <Button onClick={onSubmit} className="w-full sm:w-auto">
                  Check My Health Risk
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}

