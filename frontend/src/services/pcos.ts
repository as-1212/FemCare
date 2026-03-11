import { apiPost } from "./api";
import type { PcosPredictInput, PcosPredictResult } from "../types/pcos";

export async function predictPcosRisk(
  input: PcosPredictInput,
): Promise<PcosPredictResult> {
  return apiPost<PcosPredictResult>("/api/predict-pcos", input);
}

export async function fetchLatestPcosPrediction(): Promise<PcosPredictResult | null> {
  const res = await fetch("/api/pcos/latest");
  if (!res.ok) {
    return null;
  }
  return (await res.json()) as PcosPredictResult | null;
}

