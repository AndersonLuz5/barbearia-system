from sqlalchemy.orm import Session
from app.models.agendamento import AgendamentoModel


class AgendamentoRepository:

    @staticmethod
    def listar(db: Session):

        return db.query(AgendamentoModel).all()

    @staticmethod
    def criar(db: Session, agendamento):

        db.add(agendamento)

        db.commit()

        db.refresh(agendamento)

        return agendamento
