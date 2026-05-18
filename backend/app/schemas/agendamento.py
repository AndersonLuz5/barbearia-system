from pydantic import BaseModel
from datetime import datetime


class AgendamentoCreate(BaseModel):

    cliente: str

    data_hora: datetime


class AgendamentoResponse(BaseModel):

    id: int

    cliente: str

    data_hora: datetime

    status: str

    multa: float

    class Config:
        from_attributes = True
