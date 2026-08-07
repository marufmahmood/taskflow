import type { Task } from "@/types/task";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  tasks: Task[];
}

export default function RecentTasks({ tasks }: Props) {
  const recent = tasks.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Recent Tasks
        </h2>

        <span className="text-blue-600 text-sm cursor-pointer">
          View All
        </span>
      </div>

      <div className="space-y-3">

        {recent.length === 0 ? (
          <p className="text-gray-500">
            No tasks found.
          </p>
        ) : (
          recent.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border rounded-xl p-3"
            >
              <div>
                <p className="font-medium">
                  {task.title}
                </p>

                <StatusBadge status={task.status} />
              </div>

              <span className="text-sm text-gray-400">
                →
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}