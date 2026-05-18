export default function ScheduleTable({ agendamentos }) {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">

      <h2 className="text-xl font-bold mb-4">
        Agenda
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Cliente
            </th>

            <th className="text-left py-3">
              Data
            </th>

            <th className="text-left py-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {agendamentos.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-zinc-50"
            >

              <td className="py-4">
                {item.cliente}
              </td>

              <td>
                {new Date(item.data_hora)
                  .toLocaleString()}
              </td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                  {item.status}

                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}