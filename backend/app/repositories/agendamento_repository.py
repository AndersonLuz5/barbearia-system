from datetime import timedelta

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

    @staticmethod
    def cancelar(db: Session, agendamento_id: int):
        agendamento = (
            db.query(AgendamentoModel)
            .filter(AgendamentoModel.id == agendamento_id)
            .first()
        )

        if agendamento is None:
            return None

        agendamento.status = "cancelado"
        agendamento.multa = 0.0

        db.commit()
        db.refresh(agendamento)

        return agendamento

    @staticmethod
    def existe_conflito_intervalo_1hora(
        db: Session, data_hora, novo_egresso_status: str = "agendado"
    ) -> bool:
        """
        Regra: não permitir outro agendamento com status agendado com distância absoluta < 1 hora.

        Implementação:
        - intervalo proibido: [data_hora - 1h, data_hora + 1h)
        """
        delta = timedelta(hours=1)
        inicio = data_hora - delta
        fim = data_hora + delta

        conflito = (
            db.query(AgendamentoModel)
            .filter(AgendamentoModel.status == novo_egresso_status)
            .filter(AgendamentoModel.data_hora >= inicio)
            .filter(AgendamentoModel.data_hora < fim)
            .first()
        )

        return conflito is not None
