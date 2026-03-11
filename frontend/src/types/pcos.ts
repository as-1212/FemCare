export type PhysicalActivityLevel = "low" | "moderate" | "high";

export type PcosPredictInput = {
  age: number;
  height: number;
  weight: number;
  irregular_periods: boolean;
  average_cycle_length?: number | null;
  recent_weight_gain: boolean;
  acne: boolean;
  acne_severity: number;
  hair_loss: boolean;
  excess_hair: boolean;
  skin_darkening: boolean;
  mood_swings: boolean;
  difficulty_conceiving: boolean;
  family_history: boolean;
  physical_activity_level: PhysicalActivityLevel;
};

export type PcosPredictResult = {
  pcos_risk_score: number;
  risk_level: "Low Risk" | "Moderate Risk" | "High Risk";
  recommendation: string;
  bmi: number;
};

