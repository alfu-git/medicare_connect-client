const AppointmentsRequestsPageEmptyState = ({ type }) => {
  const config = {
    All: {
      title: "No Appointments Yet",
      desc: "You don’t have any appointment requests at the moment.",
      icon: "📭",
    },
    Accepted: {
      title: "No Accepted Appointments",
      desc: "You haven’t accepted any appointments yet.",
      icon: "✅",
    },
    Rejected: {
      title: "No Rejected Appointments",
      desc: "No appointments have been rejected.",
      icon: "❌",
    },
  };

  const { title, desc, icon } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold color-tertiary mb-2">{title}</h3>

      <p className="text-sm color-muted max-w-sm">{desc}</p>
    </div>
  );
};
