import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { User } from "@/types/user";

interface TaskFormProps {
  title: string;
  setTitle: (value: string) => void;

  priority: string;
  setPriority: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  dueDate: string;
  setDueDate: (value: string) => void;

  assignedTo: string;
  setAssignedTo: (value: string) => void;

  users: User[];

  isAdmin: boolean;

  onSubmit: () => void;
}

export default function TaskForm({
  title,
  setTitle,
  priority,
  setPriority,
  status,
  setStatus,
  dueDate,
  setDueDate,
  assignedTo,
  setAssignedTo,
  users,
  isAdmin,
  onSubmit,
}: TaskFormProps) {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">
        Add New Task
      </h2>

      <div className="space-y-4">
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border rounded-md p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          className="w-full border rounded-md p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {isAdmin && (
          <select
            className="w-full border rounded-md p-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select Member</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        )}

        <Button
          className="w-full"
          onClick={onSubmit}
        >
          Add Task
        </Button>
      </div>
    </Card>
  );
}