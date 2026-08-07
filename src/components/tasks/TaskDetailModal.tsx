import type { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/tasks/CommentSection";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export default function TaskDetailModal({
  task,
  open,
  onClose,
}: TaskDetailModalProps) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-white">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            📋 Task Details
          </h2>

          <Button
            className="border border-gray-300 bg-white text-black"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        <div className="space-y-3">

          <p>
            <strong>Task No:</strong> {task.taskNo}
          </p>

          <p>
            <strong>Title:</strong> {task.title}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {task.description || "-"}
          </p>

          <p>
            <strong>Priority:</strong> {task.priority}
          </p>

          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {task.assignedToName || "-"}
          </p>

          <p>
            <strong>Created By:</strong>{" "}
            {task.createdByName || "-"}
          </p>

          <p>
            <strong>Entry Date:</strong>{" "}
            {task.entryDate}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {task.dueDate || "-"}
          </p>

        </div>

        <hr className="my-6" />

        <div className="space-y-2">

          <CommentSection taskId={task.id!} />

          <p>✅ Checklist</p>

        </div>

      </Card>
    </div>
  );
}