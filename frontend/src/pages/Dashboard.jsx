import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import ScheduleTable from "../components/ScheduleTable";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [cliente, setCliente] = useState("");
  const [dataHora, setDataHora] = useState("");


  useEffect(() => {
    fetchAgendamentos();
     
  }, []);

  async function fetchAgendamentos() {
    try {
      const response = await api.get("/agendamentos");
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  }


  async function handleCancelar(agendamentoId) {
    try {
      await api.post(`/agendamentos/${agendamentoId}/cancelar`, {});
      // Recarrega após cancelar
      await fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  }

  async function handleAgendar() {
    if (!cliente.trim() || !dataHora) return;

    try {
      // datetime-local vem sem timezone. Vamos interpretar o valor como horário de Brasília/ São Paulo (America/Sao_Paulo)
      // e converter para ISO em UTC para o backend salvar corretamente.
      // (Evita o deslocamento que vinha ocorrendo no toISOString().)
      const [datePart, timePart] = dataHora.split("T");
      const [hh, mm] = timePart.split(":");
      const tz = "America/Sao_Paulo";

      const asUTCms = Date.UTC(parseInt(datePart.split("-")[0], 10), parseInt(datePart.split("-")[1], 10) - 1, parseInt(datePart.split("-")[2], 10), parseInt(hh, 10), parseInt(mm, 10), 0);

      // Calcula o offset real da timezone no timestamp montado (hora/minuto)
      const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const parts = dtf.formatToParts(new Date(asUTCms));
      const get = (type) => parts.find((p) => p.type === type)?.value;

      const tzYear = parseInt(get("year"), 10);
      const tzMonth = parseInt(get("month"), 10);
      const tzDay = parseInt(get("day"), 10);
      const tzHour = parseInt(get("hour"), 10);
      const tzMinute = parseInt(get("minute"), 10);
      const tzSecond = parseInt(get("second"), 10);

      const asTzAsUTCms = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond);
      const offsetMs = asTzAsUTCms - asUTCms;

      const finalUTC = new Date(asUTCms - offsetMs);

      await api.post("/agendamentos", {
        cliente: cliente.trim(),
        data_hora: finalUTC.toISOString(),
      });
      setCliente("");
      setDataHora("");
      await fetchAgendamentos();
    } catch (error) {
      if (error?.response?.status === 409) {
        alert(error.response.data?.detail || "Conflito de agendamento.");
        return;
      }
      console.error("Erro ao agendar:", error);
    }
  }



  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <StatsCards agendamentosCount={agendamentos.filter((a) => a.status === "agendado").length} />

          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Agendar</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAgendar();
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="md:col-span-1">
                <label className="text-sm opacity-70">Cliente</label>
                <input
                  className="w-full mt-1 p-2 border rounded-xl"
                  placeholder="Nome do cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-sm opacity-70">Data e hora</label>
                <input
                  type="datetime-local"
                  className="w-full mt-1 p-2 border rounded-xl"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                />
              </div>

              <div className="md:col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={handleAgendar}
                  className="bg-black hover:bg-zinc-900 text-white px-4 py-2 rounded-xl w-full"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>

          <ScheduleTable agendamentos={agendamentos} onCancelar={handleCancelar} />
        </main>
      </div>
    </div>
  );
}

