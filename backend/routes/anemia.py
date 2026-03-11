from fastapi import APIRouter

from backend.models.anemia import AnemiaPredictRequest, AnemiaPredictResponse
from backend.services.anemia_predictor import predict_anemia

router = APIRouter()


@router.post("/predict", response_model=AnemiaPredictResponse)
async def predict(req: AnemiaPredictRequest) -> AnemiaPredictResponse:
    return await predict_anemia(req)

