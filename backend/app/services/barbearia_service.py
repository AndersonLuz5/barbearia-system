from fastapi import HTTPException, status

from app.models.agendamento import AgendamentoModel
from app.repositories.agendamento_repository import AgendamentoRepository


class BarbeariaService:

    @staticmethod
    def listar_agendamentos(db):
        return AgendamentoRepository.listar(db)

    @staticmethod
    def criar_agendamento(db, dados):
        # Regra de negócio: não pode haver outro agendamento com status "agendado"
        # a menos de 1 hora (distância absoluta < 1h)
        if AgendamentoRepository.existe_conflito_intervalo_1hora(
            db, dados.data_hora, "agendado"
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Já existe um agendamento próximo desse horário. Intervalo mínimo: 1 hora.",
            )

        novo = AgendamentoModel(
            cliente=dados.cliente,
            data_hora=dados.data_hora,
            status="agendado",
            multa=0.0,
        )

        return AgendamentoRepository.criar(db, novo)

    @staticmethod
    def cancelar_agendamento(db, agendamento_id: int):
        agendamento = AgendamentoRepository.cancelar(db, agendamento_id)

        if agendamento is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Agendamento não encontrado",
            )

        return agendamento
