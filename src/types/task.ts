export type Priority = "High" | "Medium" | "Low";

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed";


export interface Task {
  id?: string;

  taskNo: string;      // NEW

  title: string;

  progress: number;

  description: string;

  priority: Priority;

  status: TaskStatus;

  dueDate: string;

  entryDate: string;   // NEW

  assignedTo: string;

  assignedToName: string;

  createdBy: string;

  createdByName?: string;

  createdAt: number;

  completedAt?: string;
}
