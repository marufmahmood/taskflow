import { useEffect, useState } from "react";

import { getTasks } from "@/services/task.service";

import type { Task } from "@/types/task";

import { Card } from "@/components/ui/card";

import StatCard from "@/components/dashboard/StatCard";
import RecentTasks from "@/components/dashboard/RecentTasks";

import {
  ListTodo,
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";

import TaskDetailModal from "@/components/tasks/TaskDetailModal";

export default function Dashboard() {
  // ==========================
  // States
  // ==========================

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] =
  useState<Task | null>(null);

  const [openModal, setOpenModal] =
  useState(false);

  const [reminderType, setReminderType] = useState<
  "overdue" | "today" | "soon" | null
  >(null);
  const [dashboardSearch, setDashboardSearch] =
  useState("");

  // ==========================
  // Load Tasks
  // ==========================

  const loadTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================
  // Task Statistics
  // ==========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  // ==========================
  // Completion Progress
  // ==========================

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // ==========================
  // Today
  // ==========================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // ==========================
  // Overdue Tasks
  // ==========================

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      task.status !== "Completed"
  );
  const highPriorityTasks = tasks.filter(
  (task) =>
    task.priority === "High" &&
    task.status !== "Completed"
);
const recentActivityTasks = [...tasks]
  .sort((a, b) => b.createdAt - a.createdAt)
  .slice(0, 8);
const dashboardFilteredTasks = tasks.filter(
  (task) => {
    const keyword =
      dashboardSearch.toLowerCase().trim();

    if (!keyword) {
      return true;
    }

    return (
      (task.title ?? "")
        .toLowerCase()
        .includes(keyword) ||
      (task.taskNo ?? "")
        .toLowerCase()
        .includes(keyword)
    );
  }
);
const dueTodayTasks = tasks.filter(
  (task) =>
    task.dueDate === today &&
    task.status !== "Completed"
);

const dueSoonTasks = tasks.filter(
  (task) => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const todayDate = new Date();
    const dueDate = new Date(task.dueDate);

    todayDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const difference =
      Math.ceil(
        (dueDate.getTime() -
          todayDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

    return difference > 0 && difference <= 2;
  }
);

  // ==========================
  // Weekly Analytics
  // ==========================

  const todayDate = new Date();

  const weeklyData = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(todayDate);

      date.setDate(
        todayDate.getDate() - (6 - index)
      );

      const dateString =
        date.toISOString().split("T")[0];

      const created = tasks.filter(
        (task) =>
          task.entryDate === dateString
      ).length;

      const completed = tasks.filter(
        (task) =>
          task.status === "Completed" &&
          task.completedAt === dateString
      ).length;

      return {
        date: dateString,

        label: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

        created,
        completed,
      };
    }
  );

  // ==========================
  // UI
  // ==========================

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
  <div className="max-w-5xl mx-auto mt-10 p-4">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <h1 className="text-3xl font-bold">
    TaskFlow Dashboard
  </h1>

  <div className="relative w-full md:w-80">

    <input
      type="text"
      value={dashboardSearch}
      onChange={(e) =>
        setDashboardSearch(e.target.value)
      }
      placeholder="Search task..."
      className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Search Suggestions */}

    {dashboardSearch.trim() && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

        {dashboardFilteredTasks.length > 0 ? (

          dashboardFilteredTasks
            .slice(0, 5)
            .map((task) => (

              <div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setOpenModal(true);
                  setDashboardSearch("");
                }}
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 transition"
              >

                <p className="font-medium text-sm">
                  {task.title}
                </p>

                <div className="flex items-center justify-between mt-1">

                  <span className="text-xs text-gray-500">
                    Task #{task.taskNo}
                  </span>

                  <span className="text-xs text-gray-500">
                    {task.status}
                  </span>

                </div>

              </div>

            ))

        ) : (

          <div className="px-4 py-4 text-sm text-gray-500">
            No tasks found.
          </div>

        )}

      </div>
    )}

  </div>

</div>


      {/* ==========================
          Statistics
      ========================== */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={ListTodo}
          color="bg-blue-600"
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          color="bg-green-600"
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <StatCard
          title="In Progress"
          value={progressTasks}
          icon={LoaderCircle}
          color="bg-purple-600"
        />

      </div>


      {/* ==========================
          Completion Progress
      ========================== */}

      <Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

        <h2 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">
          Completion Progress
        </h2>

        <div className="w-full bg-gray-700 rounded-full h-4">

          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-gray-600 dark:text-slate-300">
          {progress}% Completed
        </p>

      </Card>


      {/* ==========================
          Weekly Analytics
      ========================== */}

      <Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="font-bold text-xl text-slate-900 dark:text-white">
              Weekly Analytics
            </h2>

            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Tasks created and completed
              over the last 7 days
            </p>

          </div>

        </div>


        <div className="space-y-5">

          {weeklyData.map((day) => {

            const maxValue = Math.max(
              ...weeklyData.map((item) =>
                Math.max(
                  item.created,
                  item.completed
                )
              ),
              1
            );

            return (
              <div key={day.date}>

                <div className="flex items-center justify-between mb-2">

                  <span className="w-12 font-medium text-sm text-slate-700 dark:text-slate-200">
                    {day.label}
                  </span>

                  <div className="flex gap-4 text-xs text-gray-500 dark:text-slate-400">

                    <span>
                      Created: {day.created}
                    </span>

                    <span>
                      Completed: {day.completed}
                    </span>

                  </div>

                </div>


                <div className="flex gap-2 items-center">

                  {/* Created */}

                  <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">

                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (day.created /
                            maxValue) *
                          100
                        }%`,
                      }}
                    />

                  </div>


                  {/* Completed */}

                  <div className="w-20 bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">

                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (day.completed /
                            maxValue) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* Legend */}

        <div className="flex gap-5 mt-6 text-sm text-slate-700 dark:text-slate-300">

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-blue-500" />

            Created

          </div>


          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-green-500" />

            Completed

          </div>

        </div>

      </Card>


      {/* ==========================
          Recent + Upcoming
      ========================== */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Recent Tasks */}

        <RecentTasks
  tasks={tasks}
  onView={(task) => {
    setSelectedTask(task);
    setOpenModal(true);
  }}
/>

        {/* Upcoming Features */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">

  <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
    Upcoming Features
  </h2>

  <ul className="space-y-3 text-gray-600 dark:text-slate-300">

    <li className="hover:text-blue-500 transition cursor-pointer">
      📅 Upcoming Deadlines
    </li>

    <li className="hover:text-red-400 transition cursor-pointer">
      🔥 High Priority Tasks
    </li>

    <li className="hover:text-blue-400 transition cursor-pointer">
      📊 Weekly Analytics
    </li>

    <li className="hover:text-green-400 transition cursor-pointer">
      👥 Team Activity
    </li>

  </ul>

</div>

      </div>
<Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

  <div className="flex items-center justify-between mb-5">

    <div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        🔔 Due Date Reminders
      </h2>

      <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
        Tasks that need your attention
      </p>
    </div>

    <span className="text-sm text-gray-500 dark:text-slate-400">
      {overdueTasks.length +
        dueTodayTasks.length +
        dueSoonTasks.length} tasks
    </span>

  </div>

  <div className="grid gap-4 md:grid-cols-3">

    {/* Overdue */}

    <div
  onClick={() =>
    setReminderType(
      reminderType === "overdue"
        ? null
        : "overdue"
    )
  }
  className="border border-red-200 dark:border-red-900/60 rounded-xl p-4 bg-red-50 dark:bg-red-950/40 cursor-pointer hover:shadow-md transition"
>

      <p className="text-sm text-red-600 font-medium">
        🔴 Overdue
      </p>

      <p className="text-3xl font-bold text-red-700 mt-2">
        {overdueTasks.length}
      </p>

    </div>


    {/* Due Today */}

    <div
  onClick={() =>
    setReminderType(
      reminderType === "today"
        ? null
        : "today"
    )
  }
  className="border border-orange-200 dark:border-orange-900/60 rounded-xl p-4 bg-orange-50 dark:bg-orange-950/40 cursor-pointer hover:shadow-md transition"
>

      <p className="text-sm text-orange-600 font-medium">
        🟠 Due Today
      </p>

      <p className="text-3xl font-bold text-orange-700 mt-2">
        {dueTodayTasks.length}
      </p>

    </div>


    {/* Due Soon */}

    <div
  onClick={() =>
    setReminderType(
      reminderType === "soon"
        ? null
        : "soon"
    )
  }
  className="border border-yellow-200 dark:border-yellow-900/60 rounded-xl p-4 bg-yellow-50 dark:bg-yellow-950/40 cursor-pointer hover:shadow-md transition"
>

      <p className="text-sm text-yellow-700 font-medium">
        🟡 Due Soon
      </p>

      <p className="text-3xl font-bold text-yellow-700 mt-2">
        {dueSoonTasks.length}
      </p>

    </div>

  </div>
{reminderType && (
  <div className="mt-6 space-y-3">

    {(reminderType === "overdue"
      ? overdueTasks
      : reminderType === "today"
      ? dueTodayTasks
      : dueSoonTasks
    ).map((task) => (

      <div
        key={task.id}
        onClick={() => {
          setSelectedTask(task);
          setOpenModal(true);
        }}
        className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
      >

        <div>
          <p className="font-medium">
            {task.title}
          </p>

          <p className="text-sm text-gray-500">
            Task #{task.taskNo}
          </p>
        </div>

        <div className="text-right">

          <p className="text-sm font-semibold">
            {task.dueDate}
          </p>

          <p className="text-xs text-gray-500">
            {task.status}
          </p>

        </div>

      </div>

    ))}

  </div>
)}

</Card>

{/* ==========================
    Team Activity
========================== */}

<Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

  <div className="flex items-center justify-between mb-5">

    <div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        👥 Team Activity
      </h2>

      <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
        Recently created tasks
      </p>
    </div>

    <span className="text-sm text-gray-500 dark:text-slate-400">
      Latest {recentActivityTasks.length}
    </span>

  </div>


  <div className="space-y-4">

    {recentActivityTasks.map((task) => (

      <div
        key={task.id}
        onClick={() => {
          setSelectedTask(task);
          setOpenModal(true);
        }}
        className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg px-2 transition"
      >

        {/* Avatar */}

        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold shrink-0">

          {(task.createdByName || "U")
            .charAt(0)
            .toUpperCase()}

        </div>


        {/* Activity */}

        <div className="flex-1 min-w-0">

          <p className="text-sm text-slate-700 dark:text-slate-200">

            <span className="font-semibold">
              {task.createdByName || "Unknown User"}
            </span>

            {" created task "}

            <span className="font-semibold">
              {task.title}
            </span>

          </p>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Assigned to: {task.assignedToName || "-"}
          </p>

        </div>


        {/* Status */}

        <div className="text-right shrink-0">

          <p className="text-xs text-gray-500 dark:text-slate-500">
            {task.entryDate}
          </p>

          <p className="text-xs font-medium mt-1 text-slate-700 dark:text-slate-300">
            {task.status}
          </p>

        </div>

      </div>

    ))}


    {recentActivityTasks.length === 0 && (

      <p className="text-sm text-gray-500 dark:text-slate-400">
        No team activity yet.
      </p>

    )}

  </div>

</Card>

      {/* ==========================
          Overdue Tasks
      ========================== */}

      <Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-xl font-semibold">
              🔴 Overdue Tasks
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Tasks that passed their due date
            </p>

          </div>


          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">

            {overdueTasks.length}

          </span>

        </div>


        <div className="space-y-3">

          {overdueTasks
            .slice(0, 5)
            .map((task) => (

              <div
  key={task.id}
  onClick={() => {
    setSelectedTask(task);
    setOpenModal(true);
  }}
  className="flex items-center justify-between border-b last:border-b-0 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition"
>

                <div className="min-w-0">

                  <p className="font-medium truncate">
                    {task.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Task #{task.taskNo}
                  </p>

                </div>


                <div className="text-right ml-4">

                  <p className="text-sm font-medium text-red-600">
                    Due: {task.dueDate}
                  </p>

                  <p className="text-xs text-gray-500">
                    {task.priority} Priority
                  </p>

                </div>

              </div>

            ))}


          {overdueTasks.length === 0 && (

            <p className="text-gray-500 text-sm">
              🎉 No overdue tasks.
            </p>

          )}

        </div>

      </Card>
<TaskDetailModal
  task={selectedTask}
  open={openModal}
  onClose={() => setOpenModal(false)}
/>
    
    <Card className="mt-8 p-6 dark:bg-slate-900 dark:border-slate-700">

  <div className="flex items-center justify-between mb-5">

    <div>
      <h2 className="text-xl font-semibold">
        🔥 High Priority Tasks
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Important tasks that need attention
      </p>
    </div>

    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
      {highPriorityTasks.length}
    </span>

  </div>

  <div className="space-y-3">

    {highPriorityTasks
      .slice(0, 5)
      .map((task) => (

        <div
          key={task.id}
          onClick={() => {
            setSelectedTask(task);
            setOpenModal(true);
          }}
          className="flex items-center justify-between border rounded-xl p-3 cursor-pointer hover:bg-gray-50 transition"
        >

          <div className="min-w-0">

            <p className="font-medium truncate">
              {task.title}
            </p>

            <p className="text-sm text-gray-500">
              Task #{task.taskNo}
            </p>

          </div>

          <div className="text-right ml-4">

            <p className="text-sm font-semibold text-orange-600">
              High Priority
            </p>

            <p className="text-xs text-gray-500">
              {task.status}
            </p>

          </div>

        </div>

      ))}

    {highPriorityTasks.length === 0 && (

      <p className="text-gray-500 text-sm">
        🎉 No high priority tasks.
      </p>

    )}

  </div>

</Card>
    </div>
    </div>
  );
}