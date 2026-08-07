import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({
  tasks,
}: TaskStatsProps) {
  const total = tasks.length;

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const high = tasks.filter(
    (t) => t.priority === "High"
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-500">Total</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-500">Pending</p>
        <h2 className="text-2xl font-bold">{pending}</h2>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-500">In Progress</p>
        <h2 className="text-2xl font-bold">{inProgress}</h2>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-500">Completed</p>
        <h2 className="text-2xl font-bold">{completed}</h2>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-500">High Priority</p>
        <h2 className="text-2xl font-bold">{high}</h2>
      </Card>

    </div>
  );
}