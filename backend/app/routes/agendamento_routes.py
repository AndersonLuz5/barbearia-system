from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.agendamento import (
    AgendamentoCreate,
    AgendamentoResponse,
    AgendamentoCancel,
)

from app.services.barbearia_service import BarbeariaService

router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/", response_model=list[AgendamentoResponse])
def listar(db: Session = Depends(get_db)):

    return BarbeariaService.listar_agendamentos(db)


@router.post("/", response_model=AgendamentoResponse)
def criar(dados: AgendamentoCreate, db: Session = Depends(get_db)):

    return BarbeariaService.criar_agendamento(db, dados)


@router.post("/{agendamento_id}/cancelar", response_model=AgendamentoResponse)
def cancelar(
    agendamento_id: int, dados: AgendamentoCancel, db: Session = Depends(get_db)
):
    return BarbeariaService.cancelar_agendamento(db, agendamento_id)
