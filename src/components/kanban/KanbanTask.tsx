import type { Task } from "@/types/task";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityBadge from "@/components/common/PriorityBadge";

interface Props {
  task: Task;
}

export default function KanbanTask({ task }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
      <p className="text-xs text-gray-500">{task.taskNo}</p>

      <h3 className="font-semibold mt-2">
        {task.title}
      </h3>

      <div className="flex gap-2 mt-3">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        👤 {task.assignedToName}
      </p>
    </div>
  );
}