import type { Task } from "@/types/task";
import KanbanColumn from "./KanbanColumn";
import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";

interface Props {
  tasks: Task[];
}

export default function KanbanBoard({
  tasks,
}: Props) {

  const pending =
    tasks.filter(
      (t) => t.status === "Pending"
    );

  const progress =
    tasks.filter(
      (t) => t.status === "In Progress"
    );

  const completed =
    tasks.filter(
      (t) => t.status === "Completed"
    );

const handleDragEnd = (event: DragEndEvent) => {
  console.log(event);
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