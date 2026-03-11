from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.anemia import router as anemia_router
from backend.routes.pcos import router as pcos_router
from backend.services.db import init_db

init_db()

app = FastAPI(
    title="FemCare API",
    version="0.2.0",
    description="Women health monitoring API (anemia + PCOS/PCOD demo).",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(anemia_router, prefix="/api/anemia", tags=["anemia"])
app.include_router(pcos_router, prefix="/api", tags=["pcos"])


@app.get("/api/health")
def health():
    return {"status": "ok"}

