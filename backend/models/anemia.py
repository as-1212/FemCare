from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field


class DietType(str, Enum):
    VEGETARIAN = "vegetarian"
    NON_VEGETARIAN = "non-vegetarian"


class AnemiaPredictRequest(BaseModel):
    age: int = Field(ge=10, le=80)
    hemoglobin: float = Field(ge=4, le=20, description="g/dL")
    fatigueLevel: int = Field(ge=1, le=5)
    dizziness: bool
    paleSkin: bool
    dietType: DietType


class AnemiaPredictResponse(BaseModel):
    riskLevel: Literal["Low Risk", "Medium Risk", "High Risk"]
    riskScore: float = Field(ge=0, le=100)
    explanation: str
    suggestions: list[str]
    modelSource: Literal["simulated", "huggingface"]

