import type { Task } from "@/types/task";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityBadge from "@/components/common/PriorityBadge";

import { useDraggable } from "@dnd-kit/core";

interface Props {
  task: Task;
}

export default function KanbanTask({
  task,
}: Props) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id!,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white
        rounded-xl
        border
        p-4
        cursor-grab
        active:cursor-grabbing
        transition-all
        duration-200
        select-none
        ${
          isDragging
            ? "opacity-50 scale-105 shadow-xl"
            : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
        }
      `}
    >

      {/* Task Number */}
      <div className="flex items-center justify-between">

        <p className="text-xs text-gray-400 font-mono">
          #{task.taskNo}
        </p>

        {task.dueDate && (
          <p className="text-xs text-gray-400">
            📅 {task.dueDate}
          </p>
        )}

      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-800 mt-2 leading-snug">
        {task.title}
      </h3>

      {/* Priority + Status */}
      <div className="flex flex-wrap gap-2 mt-3">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>

      {/* Assigned User */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm">
          👤
        </div>

        <p className="text-sm text-gray-600 truncate">
          {task.assignedToName || "Unassigned"}
        </p>
      </div>

    </div>
  );
}