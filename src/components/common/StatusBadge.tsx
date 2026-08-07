import { CheckCircle2, Clock3, LoaderCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "Pending" | "In Progress" | "Completed";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    Pending: {
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock3 size={14} />,
    },
    "In Progress": {
      className: "bg-blue-100 text-blue-800",
      icon: <LoaderCircle size={14} />,
    },
    Completed: {
      className: "bg-green-100 text-green-800",
      icon: <CheckCircle2 size={14} />,
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${item.className}`}
    >
      {item.icon}
      {status}
    </span>
  );
}