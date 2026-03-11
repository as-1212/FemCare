export type DietType = "vegetarian" | "non-vegetarian";

export type AnemiaRiskLevel = "Low Risk" | "Medium Risk" | "High Risk";

export type AnemiaPredictInput = {
  age: number;
  hemoglobin: number;
  fatigueLevel: 1 | 2 | 3 | 4 | 5;
  dizziness: boolean;
  paleSkin: boolean;
  dietType: DietType;
};

export type AnemiaPredictResult = {
  riskLevel: AnemiaRiskLevel;
  riskScore: number; // 0..100
  explanation: string;
  suggestions: string[];
  modelSource: "simulated" | "huggingface";
};

export type AnemiaHistoryItem = {
  id: string;
  createdAt: string; // ISO
  input: AnemiaPredictInput;
  result: AnemiaPredictResult;
};

