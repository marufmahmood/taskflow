import { useEffect, useState } from "react";
import { getTasks } from "@/services/task.service";
import type { Task } from "@/types/task";

import { Card } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";

import {
  ListTodo,
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";
import RecentTasks from "@/components/dashboard/RecentTasks";


export default function Dashboard() {

  const [tasks, setTasks] = useState<Task[]>([]);


  const loadTasks = async () => {

    const data = await getTasks();

    setTasks(data);

  };


  useEffect(() => {

    loadTasks();

  }, []);



  const totalTasks = tasks.length;


  const completedTasks =
    tasks.filter(
      (task) => task.status === "Completed"
    ).length;


  const pendingTasks =
    tasks.filter(
      (task) => task.status === "Pending"
    ).length;


  const progressTasks =
    tasks.filter(
      (task) => task.status === "In Progress"
    ).length;



  const progress =
    totalTasks === 0
      ? 0
      :
      Math.round(
        (completedTasks / totalTasks) * 100
      );



  return (

    <div className="max-w-5xl mx-auto mt-10 p-4">


      <h1 className="text-3xl font-bold mb-8">
        TaskFlow Dashboard
      </h1>

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

      <Card className="mt-8 p-6">


        <h2 className="font-bold text-xl mb-4">
          Completion Progress
        </h2>



        <div className="w-full bg-gray-200 rounded-full h-4">


          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{
              width: `${progress}%`
            }}
          />


        </div>



        <p className="mt-3 text-gray-600">
          {progress}% Completed
        </p>


      </Card>
      
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <RecentTasks tasks={tasks} />

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-4">
            Upcoming Features
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>📅 Upcoming Deadlines</li>
            <li>🔥 High Priority Tasks</li>
            <li>📊 Weekly Analytics</li>
            <li>👥 Team Activity</li>
          </ul>

        </div>

      </div>



    </div>

  );

}