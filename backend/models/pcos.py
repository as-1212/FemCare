from __future__ import annotations

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field
from sqlmodel import Field as ORMField, SQLModel


class PhysicalActivityLevel(str, Enum):
  LOW = "low"
  MODERATE = "moderate"
  HIGH = "high"


class PcosPredictRequest(BaseModel):
  age: int = Field(ge=12, le=55)
  height: float = Field(ge=120, le=210, description="Height in cm")
  weight: float = Field(ge=30, le=200, description="Weight in kg")

  irregular_periods: bool
  average_cycle_length: int | None = Field(
    default=None, ge=15, le=60, description="Average cycle length in days"
  )
  recent_weight_gain: bool = False

  acne: bool = False
  acne_severity: int = Field(default=0, ge=0, le=3)
  hair_loss: bool = False
  excess_hair: bool = False
  skin_darkening: bool = False

  mood_swings: bool = False
  difficulty_conceiving: bool = False
  family_history: bool = False

  physical_activity_level: PhysicalActivityLevel = PhysicalActivityLevel.MODERATE


class PcosRiskLevel(str, Enum):
  LOW = "Low Risk"
  MODERATE = "Moderate Risk"
  HIGH = "High Risk"


class PcosPredictResponse(BaseModel):
  pcos_risk_score: int
  risk_level: PcosRiskLevel
  recommendation: str
  bmi: float


class PcosPrediction(SQLModel, table=True):
  id: int | None = ORMField(default=None, primary_key=True)
  created_at: datetime = ORMField(default_factory=datetime.utcnow, index=True)

  age: int
  height_cm: float
  weight_kg: float
  bmi: float

  risk_score: int
  risk_level: str
  recommendation: str

