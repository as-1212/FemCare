import { apiPost } from "./api";
import type { AnemiaPredictInput, AnemiaPredictResult } from "../types/anemia";

export async function predictAnemiaRisk(
  input: AnemiaPredictInput,
): Promise<AnemiaPredictResult> {
  return apiPost<AnemiaPredictResult>("/api/anemia/predict", input);
}

