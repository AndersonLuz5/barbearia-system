export default function ScheduleTable({ agendamentos, onCancelar }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Agenda</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Cliente</th>
            <th className="text-left py-3">Data</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {agendamentos.map((item) => {
            const isCancelado = item.status === "cancelado";

            return (
              <tr key={item.id} className="border-b hover:bg-zinc-50">
                <td className="py-4">{item.cliente}</td>

                <td>
                  {new Date(item.data_hora).toLocaleString()}
                </td>

                <td>
                  <span
                    className={
                      isCancelado
                        ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        : "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => onCancelar?.(item.id)}
                    disabled={isCancelado}
                    className={
                      isCancelado
                        ? "bg-zinc-200 text-zinc-500 px-3 py-1 rounded-full text-sm cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                    }
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
