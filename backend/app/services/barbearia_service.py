from app.models.agendamento import AgendamentoModel
from app.repositories.agendamento_repository import AgendamentoRepository


class BarbeariaService:

    @staticmethod
    def listar_agendamentos(db):

        return AgendamentoRepository.listar(db)

    @staticmethod
    def criar_agendamento(db, dados):

        novo = AgendamentoModel(
            cliente=dados.cliente,
            data_hora=dados.data_hora,
            status="agendado",
            multa=0.0,
        )

        return AgendamentoRepository.criar(db, novo)
