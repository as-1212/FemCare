from __future__ import annotations

from typing import Tuple

from sqlmodel import Session, select

from backend.models.pcos import (
  PcosPredictRequest,
  PcosPredictResponse,
  PcosPrediction,
  PcosRiskLevel,
  PhysicalActivityLevel,
)


def _bmi(weight_kg: float, height_cm: float) -> float:
  h_m = height_cm / 100.0
  if h_m <= 0:
    return 0.0
  return round(weight_kg / (h_m * h_m), 1)


def _calculate_score(req: PcosPredictRequest) -> Tuple[int, PcosRiskLevel, str]:
  score = 0

  if req.irregular_periods:
    score += 3
  if req.recent_weight_gain:
    score += 2

  if req.acne:
    score += 2
    score += req.acne_severity
  if req.hair_loss:
    score += 2
  if req.excess_hair:
    score += 3
  if req.skin_darkening:
    score += 3

  if req.family_history:
    score += 2
  if req.difficulty_conceiving:
    score += 3

  if req.mood_swings:
    score += 1

  bmi = _bmi(req.weight, req.height)
  if bmi > 25:
    score += 2

  if req.physical_activity_level == PhysicalActivityLevel.LOW:
    score += 1

  if score >= 9:
    level = PcosRiskLevel.HIGH
    recommendation = (
      "Your responses suggest a higher likelihood of PCOS/PCOD. "
      "Please consult a gynecologist or endocrinologist for evaluation and testing."
    )
  elif score >= 5:
    level = PcosRiskLevel.MODERATE
    recommendation = (
      "Your pattern suggests a moderate PCOS/PCOD risk. "
      "Consider speaking with a gynecologist, especially if symptoms persist or worsen."
    )
  else:
    level = PcosRiskLevel.LOW
    recommendation = (
      "Your current answers align with a lower PCOS/PCOD risk profile. "
      "Monitor symptoms over time and seek medical advice if things change."
    )

  return score, level, recommendation


def create_pcos_prediction(
  req: PcosPredictRequest,
  session: Session,
) -> PcosPredictResponse:
  score, level, recommendation = _calculate_score(req)
  bmi = _bmi(req.weight, req.height)

  db_obj = PcosPrediction(
    age=req.age,
    height_cm=req.height,
    weight_kg=req.weight,
    bmi=bmi,
    risk_score=score,
    risk_level=level.value,
    recommendation=recommendation,
  )
  session.add(db_obj)
  session.commit()

  return PcosPredictResponse(
    pcos_risk_score=score,
    risk_level=level,
    recommendation=recommendation,
    bmi=bmi,
  )


def get_latest_pcos_prediction(session: Session) -> PcosPredictResponse | None:
  stmt = select(PcosPrediction).order_by(PcosPrediction.created_at.desc()).limit(1)
  result = session.exec(stmt).first()
  if not result:
    return None

  return PcosPredictResponse(
    pcos_risk_score=result.risk_score,
    risk_level=PcosRiskLevel(result.risk_level),
    recommendation=result.recommendation,
    bmi=result.bmi,
  )

