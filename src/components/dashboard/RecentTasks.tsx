import type { Task } from "@/types/task";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  tasks: Task[];
  onView: (task: Task) => void;
}

export default function RecentTasks({
  tasks,
  onView,
}: Props) {
  const recent = tasks.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Recent Tasks
        </h2>

        <span className="text-blue-600 dark:text-blue-400 text-sm cursor-pointer hover:underline">
          View All
        </span>

      </div>


      {/* Tasks */}

      <div className="space-y-3">

        {recent.length === 0 ? (

          <p className="text-gray-500 dark:text-slate-400">
            No tasks found.
          </p>

        ) : (

          recent.map((task) => (

            <div
              key={task.id}
              onClick={() => onView(task)}
              className="flex justify-between items-center border border-slate-200 dark:border-slate-700 rounded-xl p-3 cursor-pointer bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >

              <div className="min-w-0">

                <p className="font-medium text-slate-900 dark:text-white truncate">
                  {task.title}
                </p>

                <div className="mt-1">
                  <StatusBadge status={task.status} />
                </div>

              </div>


              <span className="text-sm text-gray-400 dark:text-slate-500 ml-3">
                →
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}