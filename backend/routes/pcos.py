from fastapi import APIRouter, Depends
from sqlmodel import Session

from backend.models.pcos import PcosPredictRequest, PcosPredictResponse
from backend.services.db import get_session
from backend.services.pcos_predictor import create_pcos_prediction, get_latest_pcos_prediction

router = APIRouter()


@router.post("/predict-pcos", response_model=PcosPredictResponse)
def predict_pcos(
  req: PcosPredictRequest,
  session: Session = Depends(get_session),
) -> PcosPredictResponse:
  return create_pcos_prediction(req, session)


@router.get("/pcos/latest", response_model=PcosPredictResponse | None)
def latest_pcos(session: Session = Depends(get_session)) -> PcosPredictResponse | None:
  return get_latest_pcos_prediction(session)

