import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import ScheduleTable from "../components/ScheduleTable";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";


export default function Dashboard() {

  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {

    async function fetchAgendamentos() {

      try {

        const response = await api.get(
          "/agendamentos"
        );

        setAgendamentos(response.data);

      } catch (error) {

        console.error(
          "Erro ao carregar agendamentos:",
          error
        );

      }
    }

    fetchAgendamentos();

  }, []);

  return (
    <div className="bg-zinc-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">

          <StatsCards />

          <ScheduleTable
            agendamentos={agendamentos}
          />

        </main>

      </div>

    </div>
  );
}