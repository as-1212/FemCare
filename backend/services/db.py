from __future__ import annotations

from contextlib import contextmanager
from typing import Iterator

from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = "sqlite:///./femcare.db"

engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})


def init_db() -> None:
  from backend.models.pcos import PcosPrediction  # noqa: F401

  SQLModel.metadata.create_all(engine)


def get_session() -> Iterator[Session]:
  with Session(engine) as session:
    yield session


@contextmanager
def session_scope() -> Iterator[Session]:
  with Session(engine) as session:
    yield session

