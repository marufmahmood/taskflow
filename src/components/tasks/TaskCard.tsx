import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Task } from "@/types/task";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityBadge from "@/components/common/PriorityBadge";
import DueDateBadge from "@/components/common/DueDateBadge";
import DueDateWarning from "@/components/common/DueDateWarning";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";


interface TaskCardProps {
  task: Task;

  editId: string | null;
  editTitle: string;
  setEditTitle: (value: string) => void;
  isAdmin: boolean;
  currentUserId: string;

  onEdit: (task: Task) => void;
  onUpdate: () => void;
  onDelete: (id: string) => void;
  onView: (task: Task) => void;
  onComplete: (id: string) => void;
}

export default function TaskCard({
  task,
  editId,
  editTitle,
  isAdmin,
  setEditTitle,
  onEdit,
  onUpdate,
  onDelete,
  onView,
  onComplete,
  currentUserId,
}: TaskCardProps) {
  return (
  <Card className="p-5 rounded-2xl shadow-sm border hover:shadow-md transition">

      <p className="text-xs text-gray-500 font-mono">
        Task No: {task.taskNo}
      </p>

      {editId === task.id ? (
        <div className="mt-3">

          <Input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <Button
            className="mt-3"
            onClick={onUpdate}
          >
            Save
          </Button>

        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mt-2">
            {task.title}
          </h2>

          <p className="mt-2">
            👤 Assigned To: {task.assignedToName || "-"}
          </p>

          <p>
            🧑 Created By: {task.createdByName || "-"}
          </p>

          <div className="flex gap-2 mt-3">
            <PriorityBadge priority={task.priority} />

            <StatusBadge status={task.status} />
          </div>

          <p>
            📅 Entry: {task.entryDate}
          </p>

          <div className="flex items-center justify-between mt-3">

  <div>
    <p className="text-sm text-gray-600">
      📅 {task.dueDate || "No Due Date"}
    </p>

    <DueDateWarning
      dueDate={task.dueDate}
      status={task.status}
    />
  </div>

  <DueDateBadge
    dueDate={task.dueDate}
  />

</div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">

            <Button
              className="border border-gray-300 bg-white text-black"
              onClick={() => onView(task)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            {(isAdmin || task.createdBy === currentUserId) && (
                <Button onClick={() => onEdit(task)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                )}
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onComplete(task.id!)}
              disabled={task.status === "Completed"}
            >
              ✓ Complete
            </Button>

            {isAdmin && (
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => onDelete(task.id!)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            )}

          </div>

        </>
      )}

    </Card>
  );
}