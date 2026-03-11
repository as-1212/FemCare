from __future__ import annotations

import os
from dataclasses import dataclass

from backend.models.anemia import AnemiaPredictRequest, AnemiaPredictResponse
from backend.services.huggingface_client import load_hf_config, run_inference_text


@dataclass(frozen=True)
class RiskBand:
    level: str
    min_score: float
    color_hint: str


RISK_BANDS: list[RiskBand] = [
    RiskBand(level="Low Risk", min_score=0, color_hint="green"),
    RiskBand(level="Medium Risk", min_score=40, color_hint="amber"),
    RiskBand(level="High Risk", min_score=70, color_hint="rose"),
]


def _clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))


def _risk_level(score: float) -> str:
    if score >= 70:
        return "High Risk"
    if score >= 40:
        return "Medium Risk"
    return "Low Risk"


def simulate_anemia_prediction(req: AnemiaPredictRequest) -> AnemiaPredictResponse:
    """
    Rule-based simulation that mimics a model output.
    Later, swap this function with a trained model (local or Hugging Face).
    """
    score = 10.0

    # Hemoglobin is the strongest signal here (demo assumptions).
    # Typical adult female reference range varies; using broad heuristic thresholds.
    hb = float(req.hemoglobin)
    if hb < 8.0:
        score += 70
    elif hb < 10.0:
        score += 55
    elif hb < 11.5:
        score += 35
    elif hb < 12.5:
        score += 18
    else:
        score += 6

    # Symptoms
    score += (req.fatigueLevel - 1) * 6.0
    score += 12.0 if req.dizziness else 0.0
    score += 12.0 if req.paleSkin else 0.0

    # Contextual adjustments
    if req.dietType.value == "vegetarian":
        score += 6.0
    if req.age >= 40:
        score += 4.0

    score = _clamp(score, 0.0, 100.0)
    level = _risk_level(score)

    explanation_bits: list[str] = []
    if hb < 11.5:
        explanation_bits.append(
            "Your hemoglobin is on the lower side, which can increase anemia risk."
        )
    else:
        explanation_bits.append(
            "Your hemoglobin is within a reassuring range for many adults."
        )

    if req.fatigueLevel >= 4:
        explanation_bits.append("You reported high fatigue, which can align with anemia.")
    elif req.fatigueLevel >= 3:
        explanation_bits.append("Moderate fatigue adds a small amount of risk.")

    if req.dizziness:
        explanation_bits.append("Dizziness can be associated with low iron or anemia.")
    if req.paleSkin:
        explanation_bits.append("Pale skin can be a visible sign when hemoglobin is low.")
    if req.dietType.value == "vegetarian":
        explanation_bits.append(
            "Vegetarian diets can be healthy, but iron intake/absorption sometimes needs extra attention."
        )

    explanation = " ".join(explanation_bits)

    suggestions: list[str] = []
    if level == "High Risk":
        suggestions.extend(
            [
                "Book a clinician visit for a CBC and iron studies (ferritin, transferrin saturation).",
                "Prioritize iron-rich foods (lentils, beans, spinach, red meat if you eat it) plus vitamin C.",
                "Avoid tea/coffee with meals if you’re trying to improve iron absorption.",
            ]
        )
    elif level == "Medium Risk":
        suggestions.extend(
            [
                "Consider a lab test (CBC + ferritin) if symptoms persist or hemoglobin is trending down.",
                "Increase iron-rich foods and pair with vitamin C (citrus, bell peppers).",
                "Track fatigue/dizziness for 1–2 weeks and reassess.",
            ]
        )
    else:
        suggestions.extend(
            [
                "Maintain a balanced diet with iron sources and vitamin C for absorption.",
                "Stay hydrated and prioritize sleep to support energy levels.",
                "Re-check if symptoms change or if you have heavy periods or dietary changes.",
            ]
        )

    return AnemiaPredictResponse(
        riskLevel=level,  # type: ignore[arg-type]
        riskScore=round(score, 1),
        explanation=explanation,
        suggestions=suggestions[:5],
        modelSource="simulated",
    )


async def predict_anemia(req: AnemiaPredictRequest) -> AnemiaPredictResponse:
    """
    Default behavior: simulated prediction.
    If Hugging Face is configured (HF_API_TOKEN + HF_ANEMIA_MODEL) and USE_HF=1,
    we still compute a simulated risk score but ask HF to generate a friendlier
    explanation. This makes swapping to a real model straightforward later.
    """
    base = simulate_anemia_prediction(req)

    if os.getenv("USE_HF") != "1":
        return base

    cfg = load_hf_config()
    if not cfg:
        return base

    prompt = (
        "You are a helpful health assistant. Explain anemia risk level in a calm, "
        "non-alarming way. Provide 2-3 sentences max.\n\n"
        f"Inputs:\n- Age: {req.age}\n- Hemoglobin: {req.hemoglobin} g/dL\n"
        f"- Fatigue (1-5): {req.fatigueLevel}\n- Dizziness: {req.dizziness}\n"
        f"- Pale skin: {req.paleSkin}\n- Diet: {req.dietType.value}\n\n"
        f"Risk level: {base.riskLevel} (score {base.riskScore}/100)\n\n"
        "Return only the explanation text."
    )

    try:
        hf_explanation = await run_inference_text(cfg, prompt)
        hf_explanation = " ".join(hf_explanation.strip().split())
        if 12 <= len(hf_explanation) <= 600:
            return base.model_copy(
                update={"explanation": hf_explanation, "modelSource": "huggingface"}
            )
    except Exception:
        return base

    return base

