interface Props {
  dueDate?: string;
}

export default function DueDateBadge({ dueDate }: Props) {
  if (!dueDate) {
    return (
      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
        No Due Date
      </span>
    );
  }

  const today = new Date();
  const due = new Date(dueDate);

  const diffDays = Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
        🔴 Overdue
      </span>
    );
  }

  if (diffDays <= 2) {
    return (
      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
        🟠 Due Soon
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
      🟢 On Schedule
    </span>
  );
}