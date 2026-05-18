export default function StatsCards({ agendamentosCount = 0 }) {
  const cards = [
    {
      title: "Agendamentos",
      value: agendamentosCount,
      color: "bg-black"
    },
    {
      title: "Receita",
      value: "R$ 1200",
      color: "bg-green-600"
    },
    {
      title: "Multas",
      value: "R$ 100",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white p-5 rounded-2xl shadow-lg`}
        >
          <p className="opacity-70">{card.title}</p>
          <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

