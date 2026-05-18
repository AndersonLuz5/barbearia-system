export default function Sidebar() {

  return (
    <aside className="w-64 bg-zinc-900 text-white p-5 hidden md:block">

      <nav className="space-y-4">

        <button className="block hover:text-orange-400">
          Dashboard
        </button>

        <button className="block hover:text-orange-400">
          Agendamentos
        </button>

        <button className="block hover:text-orange-400">
          Financeiro
        </button>

      </nav>

    </aside>
  );
}