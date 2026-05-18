from pydantic import BaseModel
from datetime import datetime


class AgendamentoCreate(BaseModel):

    cliente: str

    data_hora: datetime


class AgendamentoCancel(BaseModel):
    """Cancelamento do agendamento.

    Regras do negócio (fixas):
    - status = "cancelado"
    - multa = 0.0
    """

    pass


class AgendamentoResponse(BaseModel):

    id: int

    cliente: str

    data_hora: datetime

    status: str

    multa: float

    class Config:
        from_attributes = True
