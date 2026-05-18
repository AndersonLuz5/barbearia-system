from sqlalchemy import Column, Integer, String, DateTime, Float
from app.core.database import Base


class AgendamentoModel(Base):

    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)

    cliente = Column(String, nullable=False)

    data_hora = Column(DateTime, nullable=False)

    status = Column(String, nullable=False)

    multa = Column(Float, default=0.0)
