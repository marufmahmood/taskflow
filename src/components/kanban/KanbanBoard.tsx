import type { Task } from "@/types/task";
import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { updateTask } from "@/services/task.service";
import toast from "react-hot-toast";

interface Props {
  tasks: Task[];
}

export default function KanbanBoard({
  tasks,
}: Props) {

  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

useEffect(() => {
  setLocalTasks(tasks);
}, [tasks]);

  const pending = localTasks.filter(
  (t) => t.status === "Pending"
);

const progress = localTasks.filter(
  (t) => t.status === "In Progress"
);

const completed = localTasks.filter(
  (t) => t.status === "Completed"
);

  const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;

  // কোনো Column-এর উপর drop না হলে
  if (!over) return;

  const taskId = active.id.toString();
  const newStatus = over.id.toString();

  // শুধুমাত্র valid status গ্রহণ করব
  if (
    newStatus !== "Pending" &&
    newStatus !== "In Progress" &&
    newStatus !== "Completed"
  ) {
    return;
  }

  // যে Task-টি drag করা হয়েছে
  const task = tasks.find(
    (t) => t.id === taskId
  );

  if (!task) return;

  // একই Column-এ drop করলে কিছু করার দরকার নেই
  if (task.status === newStatus) return;

  try {
    await updateTask(taskId, {
      status: newStatus,
      progress:
        newStatus === "Completed"
          ? 100
          : task.progress ?? 0,
    });

    toast.success(
      `Task moved to ${newStatus} ✅`
    );
    setLocalTasks((currentTasks) =>
  currentTasks.map((t) =>
    t.id === taskId
      ? {
          ...t,
          status: newStatus,
          progress:
            newStatus === "Completed"
              ? 100
              : t.progress ?? 0,
        }
      : t
  )
);

  } catch (error) {
    console.error(
      "Failed to update task:",
      error
    );

    toast.error(
      "Failed to update task"
    );
  }
};

  return (
    <DndContext onDragEnd={handleDragEnd}>

      <div className="grid md:grid-cols-3 gap-6">

        <KanbanColumn
          title="Pending"
          tasks={pending}
        />

        <KanbanColumn
          title="In Progress"
          tasks={progress}
        />

        <KanbanColumn
          title="Completed"
          tasks={completed}
        />

      </div>

    </DndContext>
  );
}