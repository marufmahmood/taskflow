import type { Task } from "@/types/task";
import KanbanTask from "./KanbanTask";

import { useDroppable } from "@dnd-kit/core";

interface Props {
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({
  title,
  tasks,
}: Props) {

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: title,
  });

  const columnStyle = {
    Pending: {
      header: "bg-yellow-100 text-yellow-800",
      border: "border-yellow-200",
    },
    "In Progress": {
      header: "bg-blue-100 text-blue-800",
      border: "border-blue-200",
    },
    Completed: {
      header: "bg-green-100 text-green-800",
      border: "border-green-200",
    },
  };

  const style =
    columnStyle[
      title as keyof typeof columnStyle
    ];

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-2xl
        border
        ${style.border}
        bg-gray-50
        min-h-[420px]
        p-4
        transition-all
        duration-200
        ${
          isOver
            ? "ring-2 ring-blue-400 bg-blue-50 scale-[1.01]"
            : ""
        }
      `}
    >

      {/* Column Header */}
      <div className="flex items-center justify-between mb-5">

        <h2
          className={`
            px-3
            py-1.5
            rounded-lg
            font-semibold
            text-sm
            ${style.header}
          `}
        >
          {title}
        </h2>

        <span className="bg-white border px-3 py-1 rounded-full text-sm font-semibold text-gray-600">
          {tasks.length}
        </span>

      </div>

      {/* Tasks */}
      <div className="space-y-3">

        {tasks.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
            <p className="text-sm">
              No tasks
            </p>

            <p className="text-xs mt-1">
              Drop a task here
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanTask
              key={task.id}
              task={task}
            />
          ))
        )}

      </div>

    </div>
  );
}