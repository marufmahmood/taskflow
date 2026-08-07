import type { Task } from "@/types/task";
import KanbanTask from "./KanbanTask";

interface Props {
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({
  title,
  tasks,
}: Props) {
  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <h2 className="font-bold text-lg mb-4">
        {title} ({tasks.length})
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}