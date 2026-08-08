interface Props {
  dueDate?: string;
  status: string;
}

export default function DueDateWarning({
  dueDate,
  status,
}: Props) {
  if (!dueDate || status === "Completed") {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const difference =
    Math.ceil(
      (due.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (difference < 0) {
    return (
      <span className="text-xs font-semibold text-red-600">
        🔴 Overdue
      </span>
    );
  }

  if (difference === 0) {
    return (
      <span className="text-xs font-semibold text-orange-600">
        🟠 Due Today
      </span>
    );
  }

  if (difference <= 2) {
    return (
      <span className="text-xs font-semibold text-yellow-600">
        🟡 Due Soon
      </span>
    );
  }

  return null;
}