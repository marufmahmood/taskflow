import { useEffect, useState } from "react";

import { auth } from "@/firebase/firebase";

import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "@/services/task.service";

import { getUsers } from "@/services/user.service";
import { getNextTaskNumber } from "@/services/counter.service";

import type { Task } from "@/types/task";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/tasks/SearchBar";
import TaskStats from "@/components/tasks/TaskStats";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import TaskDetailModal from "@/components/tasks/TaskDetailModal";
import toast from "react-hot-toast";
import KanbanBoard from "@/components/kanban/KanbanBoard";

export default function TaskPage() {
  // ==========================
  // States
  // ==========================

  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [status, setStatus] = useState("Pending");

  const [dueDate, setDueDate] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const isAdmin = currentUser?.role === "Admin";

  const [editId, setEditId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [openModal, setOpenModal] =
    useState(false);

  const [view, setView] = useState<"list" | "kanban">("list");

  // ==========================
  // Load Tasks
  // ==========================

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  // ==========================
  // Load Users
  // ==========================

  const loadUsers = async () => {
    const data = await getUsers();

    setUsers(data);

    const me = data.find(
      (u) => u.id === auth.currentUser?.uid
    );

    if (me) {
      setCurrentUser(me);
    }
  };

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

    // ==========================
  // Add Task
  // ==========================

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Please enter task title.");
      return;
    }

    const taskNo = await getNextTaskNumber();

    const entryDate = new Date()
      .toISOString()
      .split("T")[0];

    const isAdmin = currentUser?.role === "Admin";

    let assignedUser = "";
    let assignedUserName = "";

    if (isAdmin) {
      assignedUser = assignedTo;

      assignedUserName =
        users.find((u) => u.id === assignedTo)?.name || "";
    } else {
      assignedUser = auth.currentUser?.uid || "";

      assignedUserName =
        currentUser?.name ||
        auth.currentUser?.email ||
        "";
    }

    await addTask({
      taskNo,
      title,
      progress: 0,
      description: "",

      priority: priority as Task["priority"],

      status: status as Task["status"],

      dueDate,

      entryDate,

      assignedTo: assignedUser,

      assignedToName: assignedUserName,

      createdBy: auth.currentUser?.uid || "",

      createdByName:
        currentUser?.name ||
        auth.currentUser?.email ||
        "",

      createdAt: Date.now(),
    });

    toast.success("Task Added Successfully");

    setTitle("");
    setPriority("Medium");
    setStatus("Pending");
    setDueDate("");

    if (isAdmin) {
      setAssignedTo("");
    }

    loadTasks();
  };

  // ==========================
  // Delete Task
  // ==========================

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this task?");

    if (!ok) return;

    await deleteTask(id);
    toast.success("Task Deleted Successfully");
    loadTasks();
    
     };
  const handleView = (task: Task) => {
  setSelectedTask(task);
  setOpenModal(true);
    };

  // ==========================
  // Edit Task
  // ==========================

  const handleEdit = (task: Task) => {
    setEditId(task.id!);

    setEditTitle(task.title);
  };

  // ==========================
  // Update Task
  // ==========================

  const handleUpdate = async () => {
    if (!editId) return;

    await updateTask(editId, {
      title: editTitle,
    });
    toast.success("Task Updated Successfully");
    setEditId(null);

    setEditTitle("");

    loadTasks();
  };
  const handleComplete = async (id: string) => {
  try {
    const completedAt = new Date()
      .toISOString()
      .split("T")[0];

    await updateTask(id, {
      status: "Completed",
      progress: 100,
      completedAt,
    });

    toast.success("Task Completed 🎉");

    await loadTasks();

  } catch (error) {
    console.error(error);

    toast.error("Something went wrong!");
  }
};

  // ==========================
  // Search
  // ==========================

        const filteredTasks = tasks.filter((task) => {
  const keyword = search.toLowerCase();

  const matchSearch =
    (task.title ?? "").toLowerCase().includes(keyword) ||
    (task.taskNo ?? "").toLowerCase().includes(keyword);

  let matchFilter = true;

  switch (filter) {
    case "Pending":
      matchFilter = task.status === "Pending";
      break;

    case "In Progress":
      matchFilter = task.status === "In Progress";
      break;

    case "Completed":
      matchFilter = task.status === "Completed";
      break;

    case "High":
      matchFilter = task.priority === "High";
      break;

    case "Medium":
      matchFilter = task.priority === "Medium";
      break;

    case "Low":
      matchFilter = task.priority === "Low";
      break;

    case "My Tasks":
      matchFilter = task.assignedTo === auth.currentUser?.uid;
      break;

    default:
      matchFilter = true;
  }

  return matchSearch && matchFilter;
});

    return (
    <div className="max-w-5xl mx-auto mt-8 p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Task Management
        </h1>

        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "All",
          "Pending",
          "In Progress",
          "Completed",
          "High",
          "Medium",
          "Low",
          "My Tasks",
        ].map((item) => (
          <Button
            key={item}
            className={
              filter === item
                ? "bg-blue-600 text-white"
                : "border border-gray-300 bg-white text-black"
            }
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

{/* View Toggle */}

<div className="flex gap-2 mb-6">

  <Button
    className={
      view === "list"
        ? "bg-blue-600 text-white"
        : "border border-gray-300 bg-white text-black"
    }
    onClick={() => setView("list")}
  >
    📋 List View
  </Button>

  <Button
    className={
      view === "kanban"
        ? "bg-blue-600 text-white"
        : "border border-gray-300 bg-white text-black"
    }
    onClick={() => setView("kanban")}
  >
    📌 Kanban
  </Button>

</div>

      {/* Dashboard Stats */}
      <TaskStats tasks={filteredTasks} />

      {/* Add Task */}
      <TaskForm
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
        dueDate={dueDate}
        setDueDate={setDueDate}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        users={users}
        isAdmin={isAdmin}
        onSubmit={handleAddTask}
      />

      {view === "list" ? (
  <div className="space-y-4">
    {filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        editId={editId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        onView={handleView}
        onComplete={handleComplete}
        onEdit={handleEdit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isAdmin={isAdmin}
        currentUserId={currentUser?.id || ""}
      />
    ))}
  </div>
) : (
  <KanbanBoard tasks={filteredTasks} />
)}

      {/* Task Details Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
);
}